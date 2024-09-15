const menu = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

const nav = document.getElementsByClassName('nav')[0];
const navChildren = nav.children;
const anchor = document.querySelectorAll('a');

const intro = document.getElementsByClassName('Introduction');
const backgroundImg = document.getElementById('background-img');

const searchResult = document.getElementById('search-result');

const searchDiv = document.getElementsByClassName('search-clear')[0]; //a collection of elements are returned so
// you need to access the first element in that collection before accessing its children.
const searchBtn =  searchDiv.children[0]; //acess the first button
const clearBtn =  searchDiv.children[1]; //acess the second button


menu.addEventListener('click', function() {
    menu.style.display = 'none';
    closeIcon.style.display = 'block';
    for(let i = 0; i < intro.length; i++){
        intro[i].style.display = 'none'
    }
    for(let i = 0; i < navChildren.length; i++){
        if(i <= 1 || i == 5){
            navChildren[i].style.display = 'none'
      }
    }
    backgroundImg.style.setProperty('--before-background', 'none');
    //Toggle switches between adding and removing a class
    nav.classList.toggle('nav');  //nav is already defined on the css so we remove it and add nav2
    nav.classList.toggle('nav2');
    closeIcon.classList.add('active');
    anchor.forEach(a => a.classList.add('active')); // Add 'active' class to all anchor tags
    //classlist only works on individual elements
    searchResult.style.display = 'none';
    
    
});

closeIcon.addEventListener('click', function() {
    closeIcon.style.display = 'none';
    menu.style.display = 'block';
    for(let i = 0; i < intro.length; i++){
        intro[i].style.display = 'block'
    }
    for(let i = 0; i < navChildren.length; i++){
        if(i <= 1 || i == 5){
            navChildren[i].style.display = 'block'
        }    
      }

    backgroundImg.style.setProperty('--before-background', 'linear-gradient(to right, rgba(2, 112, 129, 0.7), rgba(2, 112, 129, 0))');
    nav.classList.toggle('nav2');  //we removed nav2 and go back to our original styles
    nav.classList.toggle('nav');
    closeIcon.classList.remove('active');
    anchor.forEach(a => a.classList.remove('active')); // Remove 'active' class from all anchor tags
    searchResult.style.display = "block";
    
});
const result = document.getElementById('search-result');
let page = 1; // Initialize page number

function search() {
  result.innerHTML = ""; // Clear previous results
  let userInput = document.getElementById('input').value.toLowerCase();
  fetchResults(userInput, page);
}

function fetchResults(userInput, page) {
  fetch(`travel_recommendation_api.json?page=${page}`) // Perform GET request with pagination
    .then(response => response.json()) //the first .then method handles the resolved promise and parses the data we were waiting for as javascript object
    .then(data => {   //the second .then method allow us to manipulate the data we recieved 
      // console.log(data);
    let countries =  getCountries(data, userInput, result);
    let beaches =   getBeaches(data, userInput, result);
    let temples =   getTemples(data, userInput, result);

    if (!countries && !beaches && !temples) { //evaluates to true if no match was found for all of the inputs
      result.innerHTML = `<div id="error"> 
                          <h2>Unable to retrieve information...</h2> 
                          <h3>Please use one of the following keywords:</h3>
                          <ul>
                          <li>USA</li>
                          <li>Japan</li>
                          <li>Brazil</li>
                          <li>Australia</li>
                          <li>Countries</li>
                          <li>Temples</li>
                          <li>Beaches</li>
                          </ul>
                        </div>`;
    }
  })

  .catch(error =>{
   console.error('Error: ', error);
   result.innerHTML = 
   `<div id="error"> 
     <h2>Unable to retrieve information...</h2> 
   </div>`
  });

 
}

function getCountries(data, userInput, result){

    const countries = data.countries;
    let match = false;
    const foundCountry = countries.find((country) => country.name.toLowerCase() === userInput);
    if (foundCountry) {
      match = true;
      foundCountry.cities.forEach((city) => {
        result.innerHTML += 
        `
         <div id="date"></div>
        <div id="result"> 
      <img src=${city.imageUrl} alt ="${city.name}">
        <h3>${city.name}</h3>
        <p>${city.description} </p>
        <button id="visit-button">Visit</button>
       </div>
         <br>`;
      });
    }
    // console.log(countries);
     else if (userInput === "countries") {
      match = true;
      countries.forEach((country) => {
        //we have an array of country objects
        country.cities.forEach((city, index) => {
          result.innerHTML += 
          `   
        <div id="date"></div>
        <div id= "result"> 
        <img src=${city.imageUrl} alt ="${city.name}">  
         <h3>${city.name}</h3>
         <p>${city.description} </p>
         <button id="visit-button">Visit</button>
        </div>
        <br>`;
        });
      });
    }
      return match;
}
function getBeaches(data, userInput, result){
    const beaches = data.beaches;
    let match = false;
    if (userInput === "beaches" || userInput === "beach") {
      match = true;
      beaches.forEach((beach) => {
       
        result.innerHTML +=
         `
         <div id="date"></div>
        <div id= "result"> 
       <img src=${beach.imageUrl} alt ="${beach.name}"> 
         <h3>${beach.name}</h3>
         <p>${beach.description} </p>
         <button id="visit-button">Visit</button>
        </div>
        <br>`;
      });
    }
    return match;
 }

function getTemples(data, userInput, result){
   const temples = data.temples;
   let match = false;
   if (userInput === "temples" || userInput === "temple") {
       match = true;
       temples.forEach((temple) => {
        result.innerHTML += `
          <div id="date"></div>
        <div id= "result"> 
    <img src=${temple.imageUrl} alt ="${temple.name}"> 
       <h3>${temple.name}</h3>
       <p>${temple.description} </p>
       <button id="visit-button">Visit</button>
      </div>
      <br>`;
    });
  }
  return match;
}

function clear(){
  // userInput = ''; to clear the input field you need to acess the element directly here you just re-assigning the variable
  document.getElementById('input').value = '';
  result.innerHTML = '';
}

document.getElementById('input').focus(); // Focus the input field when the page loads

document.getElementById('input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {  //for mobile search
       search();
  }
});

searchBtn.addEventListener('click', search); //desktop search
clearBtn.addEventListener('click', clear);

const loadMoreBtn = document.getElementById('load-more-btn');
// loadMoreBtn.addEventListener('click', () => {
//     let userInput = document.getElementById('input').value.toLowerCase();
//     page++;
//     fetchResults(userInput, page);
// });
