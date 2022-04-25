CREATE TABLE IF NOT EXISTS breweries (
   name VARCHAR(100),
   phone VARCHAR(40),
   location VARCHAR(200),
   type VARCHAR(50), 
   website VARCHAR(200)
);


INSERT INTO breweries (name, phone, location, type, website)
VALUES('test name', 'test phone', 'test street', 'test type','test website');
