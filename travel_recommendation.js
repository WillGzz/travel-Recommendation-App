const menu = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

const nav = document.getElementsByClassName('nav')[0];
const navChildren = nav.children;
const anchor = document.querySelectorAll('a');

const intro = document.getElementsByClassName('Introduction');
const backgroundImg = document.getElementById('background-img');

const searchDiv = document.getElementsByClassName('search-clear')[0]; //a collection of elements are returned so
// you need to access the first element in that collection before accessing its children.
const searchBtn =  searchDiv.children[0]; //acess the first button
const clearBtn =  searchDiv.children[1]; //acess the first button


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
   
});

const result = document.getElementById('search-result');
function search(){
result.innerHTML = ""; //when theres new input provide new results, getting rid of the old
let userInput = document.getElementById('input').value.toLowerCase();
fetch('travel_recommendation_api.json')  //perform get request
    .then(response => response.json()) //the first .then method handles the resolved promise and parses the data we were waiting for as javascript object
    .then(data => {   //the second .then method allow us to manipulate the data we recieved 
      // console.log(data);
      getCountries(data, userInput, result);
  })

  .catch(error =>{
   console.error('Error: ', error);
   result.innerHTML = 
   `<div id="error"> 
     <h2>Unable to retrieve information...</h2> 
     <h3>Please use one of the following keywords:</h3>
     <ul>
      <li>Countries</li>
      <li>Temples</li>
      <li>Beaches</li>
     </ul>
   </div>`
  });

 
}

function getCountries(data, userInput, result){

    const countries = data.countries;

    const foundCountry = countries.find((country) => country.name.toLowerCase() === userInput);
    if (foundCountry) {
      foundCountry.cities.forEach((city) => {
        result.innerHTML += `<div> 
     <!--  <img src=${city.imageUrl} alt ="${city.name}">  -->
        <h3>${city.name}</h3>
        <p>${city.description} </p>
        <button id="visit-button">Visit</button>
       </div>
         <br>`;
      });
    }
    // console.log(countries);
     else if (userInput === "countries") {
      countries.forEach((country) => {
        //we have an array of country objects
        country.cities.forEach((city) => {
          result.innerHTML += `<div> 
      <!--  <img src=${city.imageUrl} alt ="${city.name}">  -->
         <h3>${city.name}</h3>
         <p>${city.description} </p>
         <button id="visit-button">Visit</button>
        </div>
        <br>`;
        });
      });
    }
    else{
      result.innerHTML = 
   `<div id="error"> 
     <h2>Unable to retrieve information...</h2> 
     <h3>Please use one of the following keywords:</h3>
     <ul>
      <li>Japan</li>
      <li>Brazil</li>
      <li>Australia</li>
     </ul>
   </div>`

    }
     
    
}
// function getBeaches(data){

// }

// function getTemples(data){

// }

function clear(){
  // userInput = ''; to clear the input field you need to acess the element directly here you just re-assigning the variable
  document.getElementById('input').value = '';
  result.innerHTML = '';
}
searchBtn.addEventListener('click', search);
clearBtn.addEventListener('click', clear);
