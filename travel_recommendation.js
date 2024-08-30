const menu = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

const nav = document.getElementsByTagName('nav')[0];
const navChildren = nav.children;
const anchor = document.querySelectorAll('a');

const intro = document.getElementsByClassName('Introduction');
const backgroundImg = document.getElementById('background-img');



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
    nav.classList.add('active');
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
    nav.classList.remove('active');
    closeIcon.classList.remove('active');
    anchor.forEach(a => a.classList.remove('active')); // Remove 'active' class from all anchor tags
   
});



