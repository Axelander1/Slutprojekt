
let url = 'monkey.json';

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log('Checkout this JSON! ', data);
    fillFrontPage(data);
  })
  .catch(err => { throw err });

function fillFrontPage(data) {
  console.log(data);
  var cardContainer = document.getElementById("category-card-container")
  console.log(cardContainer)
    data.monkey.forEach(element => {
      cardContainer.innerHTML += `
      
      <a href="facts.html" class = "card-container">
      <img class = "card-image" src="Images/Gombe_Stream_NP_Beute.jpg" alt = "monkey ">
      <div class = "card-text">
          <h3 class = "card-title">${element.name}</h3>
          <h5 class = "card-scientific-name">${element.scientific}</h5>
      </div>
      </a>
      `
      
    });
}


const infoContainer = document.getElementById("info-bottom-row")


function fillInformationContainer() {

}


let searchbarToggleButton = document.querySelector("#search-toggle-button");

searchbarToggleButton.addEventListener("click", () => {
    console.log("Button pressed") 
    var searchbar = document.querySelector("#searchbar-container");
    var computedStyle = window.getComputedStyle(searchbar, null);
    var widthValue = computedStyle.getPropertyValue("width");

    if (widthValue == "0px") {
        
    }
    else {
        closeSearchBar()
    }
})

