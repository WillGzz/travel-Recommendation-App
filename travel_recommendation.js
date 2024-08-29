const menu = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const navBackground = document.getElementById('nav-background');
const nav = document.getElementsByTagName('nav');
const anchor = document.querySelectorAll('nav a');
const imgBackground = document.getElementById('background-img');




menu.addEventListener('click', function() {
    menu.style.display = 'none';
    // nav.style.display = 'inline-block';
    // anchor.forEach(anchor => {
        //     anchor.style.display = 'block'; // Example: Make all anchor tags visible
        // });
    // nav.style.display = 'none';
    closeIcon.style.display = 'block';
    navBackground.classList.add('active');

});

closeIcon.addEventListener('click', function() {
    closeIcon.style.display = 'none';
    menu.style.display = 'block';
    navBackground.classList.remove('active');
});



