/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
const axios = require('axios');

var app = express();
var session = require('express-session')
var router = express.Router()
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(session({
	secret: "secret1",
	saveUninitialized: true,
	resave: true
}))

module.exports = app;

var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
const { response } = require('express');
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.
		We'll be using `db` as this is the name of the postgres container in our
		docker-compose.yml file. Docker will translate this into the actual ip of the
		container for us (i.e. can't be access via the Internet).
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab,
		we created the football_db database, and we decided to reuse the name because football is cool.
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database. We set this in the
		docker-compose.yml for now (and for the forseeable future).
**********************/
const dbConfig = {		// This needs to be redone
	host: 'db',
	port: 5432,
	database: 'football_db1',
	user: 'postgres1',
	password: 'pwd1'
};

const isProduction = process.env.NODE_ENV === 'production';
// const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// Heroku Postgres patch for v10
// fixes: https://github.com/vitaly-t/pg-promise/issues/711
if (isProduction) {
  pgp.pg.defaults.ssl = {rejectUnauthorized: false};
}


var db = pgp(dbConfig);
var addCount = 5;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory


app.get('/', function(req, res) {
	res.redirect('/homepage');
});

app.get('/homepage', function(req, res) {
	res.render('homepage', {
		title: "homepage",
		response: '',
		error: false,
		message: '',
		address: '/homepage'
	  })
});

app.post('/homepage_results', function(req, res) {
	var items = req.body.items;
	if(items) {
	  axios({
		url: `https://api.openbrewerydb.org/breweries/search?query=${items}&per_page=5`,
		  method: 'GET',
		  dataType:'json',
		})
		.then(response => {
			res.render('homepage', {
			  title: "homepage",
			  response: response.data,
			  error: false,
			  message: '',
			  address: '/homepage'
			})
		  })
		  .catch(function (error) {
			  console.log(error);
		  });
	}
	else {
		res.render('homepage', {
			title: "homepage",
			response: '',
			error: false,
			message: 'No text entry submitted',
			address: '/homepage'
		})
	}
  });

  app.post('/homepage_results/save', function(req, res) {
	var data1 = req.body.brewery1;
	var data2 = req.body.brewery2;
	var data3 = req.body.brewery3;
	var data4 = req.body.brewery4;
	var data5 = req.body.brewery5;
	if(data1) {
		var update1 = `INSERT INTO breweries(name, phone, location, type, website) VALUES('${data1[0]}', '${data1[1]}', '${data1[2]}', '${data1[3]}', '${data1[4]}');`
		var update2 = `INSERT INTO breweries(name, phone, location, type, website) VALUES('${data2[0]}', '${data2[1]}', '${data2[2]}', '${data2[3]}', '${data2[4]}');`
		var update3 = `INSERT INTO breweries(name, phone, location, type, website) VALUES('${data3[0]}', '${data3[1]}', '${data3[2]}', '${data3[3]}', '${data3[4]}');`
		var update4 = `INSERT INTO breweries(name, phone, location, type, website) VALUES('${data4[0]}', '${data4[1]}', '${data4[2]}', '${data4[3]}', '${data4[4]}');`
		var update5 = `INSERT INTO breweries(name, phone, location, type, website) VALUES('${data5[0]}', '${data5[1]}', '${data5[2]}', '${data5[3]}', '${data5[4]}');`
		db.any(update1)
		db.any(update2)
		db.any(update3)
		db.any(update4)
		db.any(update5)
		res.redirect('/homepage');
	}
	else {
		res.render('homepage', {
			title: "homepage",
			response: '',
			error: false,
			message: 'No text entry submitted',
			address: '/homepage'
		})
	}
  });

  app.get('/searches', function(req, res) {
	var query = `SELECT * FROM breweries;`;
	db.task('get-everything', task => {
		return task.batch([
			task.any(query)
		]);
	})
	.then(item => {
    res.render('searches', {
  		title: 'searches',
  		address: '/searches',
      		name: item[0],
			phone: item[1],
			location: item[2],
			type: item[3],
			website: item[4],
	  })
  	})
	.catch(err => {
		console.log('error', err);
		res.render('matches', {
			title: 'matches',
			address: '/matches',
			id: '',
			name: '',
			age: '',
			occupation: '',
			city: '',
			country: '',
			bio: '',
			interests: ''
		})
	}); 
});
app.use('/', router)

const server = app.listen(process.env.PORT || 3000, () => {
	console.log(`Express running → PORT ${server.address().port}`);
  });
