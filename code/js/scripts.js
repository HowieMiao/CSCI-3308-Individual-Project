function otherToggle(id, toggle) {
    if (toggle) {
        document.getElementById(id).style.visibility = "visible";
        document.getElementById(id).style.height = "auto";
    }
    else {
        document.getElementById(id).style.visibility = "hidden";
        document.getElementById(id).style.height = "0px";
    }
  }

  function onClickFunction() {
    alert("Profile Created!");
  }  

  const loadmore = document.querySelector('#loadmore');
      let currentItems = 5;
      loadmore.addEventListener('click', (e) => {
          const elementList = [...document.querySelectorAll('.list .list-element')];
          for (let i = currentItems; i < currentItems + 2; i++) {
              if (elementList[i]) {
                  elementList[i].style.display = 'block';
              }
          }
          currentItems += 1;
  
          // Load more button will be hidden after list fully loaded
          if (currentItems >= elementList.length) {
              event.target.style.display = 'none';
          }
      })