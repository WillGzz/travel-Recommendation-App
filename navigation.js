const menu = document.getElementById('menu-icon');

const closeIcon = document.getElementById('close-icon');

const nav = document.getElementsByClassName('nav')[0];
const navChildren = nav.children;

const anchor = document.querySelectorAll('a');

const pageBody = document.getElementById('all');

const pageBodyChildren = pageBody.children;


const backgroundImg = document.getElementById('background-img');
const aboutImg = document.getElementById('about-background-img');

const searchResult = document.getElementById('search-result');

// Store original styles
const originalStyles = [];
for (let i = 0; i < pageBodyChildren.length; i++) {
    originalStyles.push({
        display: pageBodyChildren[i].style.display
    });
}


menu.addEventListener('click', function() {
    menu.style.display = 'none';
    closeIcon.style.display = 'block';

    for (let i = 0; i < pageBodyChildren.length; i++) {
        pageBodyChildren[i].style.display = 'none';
    }
       
    for(let i = 0; i < navChildren.length; i++){  // The loop will only consider the direct children of <nav>, h1 is a child of i so  
        if(i <= 1 || i == 3){                           //it wquld be hidden becasuse the i is hidden, i is index 1
            navChildren[i].style.display = 'none';
      }
    }
    if (backgroundImg){
        backgroundImg.style.setProperty('--before-background', 'none');
    }
    if (aboutImg){
         aboutImg.style.setProperty('--before-background', 'none');
    }
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
    for (let i = 0; i < pageBodyChildren.length; i++) {
        pageBodyChildren[i].style.display = originalStyles[i].display;
    }
    for(let i = 0; i < navChildren.length; i++){
        if(i <= 1 || i == 3){
            navChildren[i].style.display = 'block'
        }    
      }

      if (backgroundImg){

          backgroundImg.style.setProperty('--before-background', 'linear-gradient(to right, rgba(2, 112, 129, 0.7), rgba(2, 112, 129, 0))');
      }
      if(aboutImg){

          aboutImg.style.setProperty('--before-background', 'linear-gradient(to right, rgba(2, 112, 129, 0.7), rgba(2, 112, 129, 0))');
      }
    nav.classList.toggle('nav2');  //we removed nav2 and go back to our original styles
    nav.classList.toggle('nav');
    closeIcon.classList.remove('active');
    anchor.forEach(a => a.classList.remove('active')); // Remove 'active' class from all anchor tags
    searchResult.style.display = "block";
    
});