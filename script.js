
let monkeyData;
function fetchMonkeyData() {
  fetch('monkey.json')
  .then(res => res.json())
  .then(data => {
    console.log('Checkout this JSON! ', data);
    monkeyData = data;
    fillFrontPage(data);
    fillPage(data);
  })
  .catch(err => { throw err });
}


fetchMonkeyData();

/*document.addEventListener("DOMContentLoaded", () => {
  fetch('monkey.json')
  .then(res => res.json())
  .then(data => {
    console.log('Checkout this JSON! ', data);
    monkeyData = data;
  })
  .catch(err => { throw err });
})*/

updateEventListener();

function updateEventListener() {
  currentSearchResults = document.querySelectorAll(".search-result");
  cards = document.querySelectorAll(".card-container")
  console.log(currentSearchResults, cards)
  
  currentSearchResults.forEach(div => {
    var divName = div.querySelector(".name").innerHTML
    console.log(divName)
    div.addEventListener("click", () => {
      localStorage.setItem("monkey", divName)
    })
  })
  cards.forEach(div => {
    var divName = div.querySelector(".card-title").innerHTML
    console.log(divName)
    div.addEventListener("click", () => {
        localStorage.setItem("monkey", divName)
    })
  })
}


function fillFrontPage(data) {
  console.log(data);
  var cardContainer = document.querySelectorAll("#category-card-container")
  cardContainer.forEach(container => {
    cardContainer = container
  })
  console.log(cardContainer)
    data.monkey.forEach(element => {
      cardContainer.innerHTML += `
      
      <a href="facts.html" class = "card-container">
      <img class = "card-image" src="${element.image}" alt = "monkey ">
      
          <h3 class = "card-title">${element.name}</h3>
          <h5 class = "card-scientific-name">${element.scientific}</h5>
      
      </a>
      `

    });
    updateEventListener() 
    console.log("Function finished")
}

var apesFound = []

var searchbar = document.querySelector("#searchbar")
searchbar.addEventListener("input", () => {
  searchFunction()
})

function searchFunction() {
  var searchResultContainer = document.querySelector("#searchbar-result-container");
  var searchbarText = searchbar.value;

  searchResultContainer.innerHTML = "";
  console.log(searchbarText);
  console.log(searchResultContainer);
  console.log(apesFound);

  monkeyData.monkey.forEach((element) => {
    if ((element.name.toLowerCase()).includes(searchbarText.toLowerCase()) && searchbarText.length > 0) {
      console.log("Found");

      if (!apesFound.includes(element.name)) {
        console.log("Bertil");

        var searchResult = `
          <a href="facts.html" class="search-result">
            <img class="search-result-image" src="${element.image}">
            <div class="search-result-text-container">
              <h3 class="name">${element.name}</h3>
              <h5>${element.scientific}</h5>
            </div>
          </a>
        `;

        searchResultContainer.innerHTML += searchResult;
        apesFound.push(element.name);
      }
    }
  }
  
  
  );

  

  var searchResults = searchResultContainer.childNodes
  var searchResultName = document.querySelectorAll(".name")

  for (let i = 0; i < (searchResultContainer.childElementCount); i++) {
    var item = apesFound.indexOf(searchResultName)
    apesFound.splice(item, 1)

    var currentName = searchResultName[i].textContent.toLowerCase()
    if (currentName.includes(searchbarText.toLowerCase()) == false) {
      searchResultContainer.removeChild(searchResults[i])
    }
  }

  currentSearchResultChildElements = document.querySelectorAll(".search-result");

  for (let i = 0; i < searchResultContainer.childElementCount; i++) {
    if (i == 0) {
      if (searchResultContainer.childElementCount == 1) {
        currentSearchResultChildElements[i].style.borderRadius = "10px"
      }
      else {
        currentSearchResultChildElements[i].style.borderRadius = "10px 10px 0px 0px"
      }
      
    }
    else if (i < searchResultContainer.childElementCount-1) {
      currentSearchResultChildElements[i].style.borderRadius = "0px"
    }
    else {
      currentSearchResultChildElements[i].style.borderRadius = "0px 0px 10px 10px"
    }
  }

  updateEventListener();
}



function fillPage(data) {
  var informationContainer = document.querySelector("#information-text-container")
  var imageColumn = document.querySelector("#image-column")
  console.log(data)

  if (informationContainer) {
    var chosenMonkey = localStorage.getItem("monkey");
    console.log(chosenMonkey);

    var subspecies = "Hej hej"

    data.monkey.forEach(monkey => {
      if(chosenMonkey == monkey.name) {

        imageColumn.innerHTML = `
          <h1 id = "monkey-title">${monkey.name}</h1>
          <h3 id = "monkey-title-scientific">${monkey.scientific}</h3>
          <!--Bildens source fylls på när sidan laddas-->
          <!--Placerad inom en button-tagg så att användaren kan trycka på den för att förstora bilden-->
          <img id="monkey-image" src = "${monkey.image}" alt = "The ape" >
        `

        informationContainer.innerHTML = `
        <div class = "text-category">
        <h4 class = "text-category-title">Summary</h4>
        <p class = "text-category-text">${monkey.summary}</p>
        </div>
        <div class = "text-category">
          <h4 class = "text-category-title">Characteristics</h4>
          <p class = "text-category-text">${monkey.characteristics}</p>
        </div>
        <div class = "text-category">
          <h4 class = "text-category-title">Diet</h4>
          <p class = "text-category-text">${monkey.diet}</p>
        </div>
        <div class = "text-category">
          <h4 class = "text-category-title">Behaviour</h4>
          <p class = "text-category-text">${monkey.behaviour}</p>
        </div>
        <div id = "subspecies-container">
        <h3 class = "subspecies-title">Subspecies</h3>
        </div>
        <div class = "text-category">
          <h4 class = "text-category-title">Conclusion</h4>
          <p class = "text-category-text">${monkey.conclusion}</p>
        </div>
        `

       
        var subspeciesData = monkey.subspecies

        var subspeciesKey = Object.keys(subspeciesData[0])
        var subspeciesValues = Object.values(subspeciesData[0])

        console.log(subspeciesKey, subspeciesValues)
        

        

        subspeciesContainer = document.getElementById("subspecies-container")
        for (let i = 0; i < subspeciesKey.length; i++) {
          subspeciesContainer.innerHTML += `
          <h4>${subspeciesKey[i]}</h4>
          <p>${subspeciesValues[i]}</p>
          
          `


        }

            
          
        }})
      }
    }


    /*Byter ut bilden mot en lite större för mobiler, då den annars blev så pass liten att den i stort sett inte gick att se*/ 
function setImageSize() {
  console.log("hej")
  var frontImage = document.querySelector("#front-image")
  if (frontImage) {
    if (window.innerWidth > 600) {
      frontImage.src = "./Images/robin-canfield-1JvZeqNd5vI-unsplash-copy.webp"
    }
    else {
      frontImage.src = "./Images/robin-canfield-1JvZeqNd5vI-unsplash.jpg"
    }
  }
  
}
  
window.addEventListener("resize", setImageSize)   



fillPage()
setImageSize()