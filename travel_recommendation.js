const searchDiv = document.getElementsByClassName('search-clear')[0]; //a collection of elements are returned so
// you need to access the first element in that collection before accessing its children.
const searchBtn =  searchDiv.children[0]; //acess the first button
const clearBtn =  searchDiv.children[1]; //acess the second button

const result = document.getElementById('search-result');

const timeZones = {
  "Sydney, Australia": "Australia/Sydney",
  "Melbourne, Australia": "Australia/Melbourne",
  "Tokyo, Japan": "Asia/Tokyo",
  "Kyoto, Japan": "Asia/Tokyo",
  "Rio de Janeiro, Brazil": "America/Sao_Paulo",
  "São Paulo, Brazil": "America/Sao_Paulo",
  "New York City, USA": "America/New_York",
  "Miami FL, USA": "America/New_York",
  "Angkor Wat, Cambodia": "Asia/Phnom_Penh",
  "Taj Mahal, India": "Asia/Kolkata",
  "Bora Bora, French Polynesia": "Pacific/Tahiti",
  "Copacabana Beach, Brazil": "America/Sao_Paulo"
};


function search() {
  result.innerHTML = ""; // Clear previous results
  let userInput = document.getElementById('input').value.toLowerCase();
  fetchResults(userInput);
}

function fetchResults(userInput) {
  fetch(`travel_recommendation_api.json`) 
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
    adjustScrollbar(); // Adjust scrollbar after updating results
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
        const dateDivId = `date-${city.name.replace(/\s+/g, '-')}`; // Create a unique ID for the date div
        result.innerHTML += 
        `
         <div id="${dateDivId}" class="date"></div>
        <div id="result"> 
      <img src=${city.imageUrl} alt ="${city.name}">
        <h3>${city.name}</h3>
        <p>${city.description} </p>
        <button id="visit-button">Visit</button>
       </div>
         <br>`;
         // Ensure the element is added to the DOM before calling getDate
         setTimeout(() => getDate(city.name, dateDivId), 0);
        //  Executes the function, after waiting the specified number of milliseconds.
        //executes as soon as the browser updates 
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
        <div id="result"> 
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
        const dateDivId = `date-${beach.name.replace(/\s+/g, '-')}`;
        result.innerHTML +=
         `
         <div id="${dateDivId}" class="date"></div>
        <div id="result"> 
       <img src=${beach.imageUrl} alt ="${beach.name}"> 
         <h3>${beach.name}</h3>
         <p>${beach.description} </p>
         <button id="visit-button">Visit</button>
        </div>
        <br>`;

        setTimeout(() => getDate(beach.name, dateDivId), 0);
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
        const dateDivId = `date-${temple.name.replace(/\s+/g, '-')}`;
        result.innerHTML += `
      <div id="${dateDivId}" class="date"></div>
      <div id= "result"> 
    <img src=${temple.imageUrl} alt ="${temple.name}"> 
       <h3>${temple.name}</h3>
       <p>${temple.description} </p>
       <button id="visit-button">Visit</button>
      </div>
      <br>`;

      setTimeout(() => getDate(temple.name, dateDivId), 0);
    });
  }
  return match;
}

function clear(){
  // userInput = ''; to clear the input field you need to acess the element directly here you just re-assigning the variable
  document.getElementById('input').value = '';
  result.innerHTML = '';
}

function adjustScrollbar() {
  const results = document.querySelectorAll('#result');  //if the number of results is greater than 2
  const maxResults = 2; 

  if (results.length > maxResults) {
      result.style.maxHeight = '50%'; 
      result.style.overflowY = 'auto'; 
  } else {
      result.style.maxHeight = 'none'; // No max-height for fewer results
      result.style.overflowY = 'hidden'; // No scrollbar for fewer results
  }
}


function getDate(location, dateDivId) {
  const time = timeZones[location] || moment.tz.guess(); // Use predefined time zone or guess if not available
  setInterval(() => {
      const options = { timeZone: time, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
      const currentTime = new Date().toLocaleTimeString('en-US', options);
      const dateElement = document.getElementById(dateDivId);
      if (dateElement) {
          dateElement.innerHTML = `Current Local Time (${location}): ${currentTime}`;
      }
  }, 1000); // Update every second
}


document.getElementById('input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {  //for mobile search
       search();
  }
});

searchBtn.addEventListener('click', search); //desktop search
clearBtn.addEventListener('click', clear);


