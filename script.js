// JavaScript code for interactivity
 // Gets the theme toggle button
const themeToggle = document.getElementById('themeToggle');
// Gets the body element
const body = document.body; 

// Checks for saved theme preference in localStorage
if (localStorage.getItem('theme') === 'dark') {
    // Applies dark mode if saved
    body.classList.add('dark-mode'); 
    // Updates button text and icon to show Light Mode
    themeToggle.innerHTML = '<i class="fa fa-sun"></i> Light Mode'; 
}

// Event listener for theme toggle button
themeToggle.addEventListener('click', () => {
    // Toggles dark mode class on body
    body.classList.toggle('dark-mode'); 
    // Checks if dark mode is active
    const isDark = body.classList.contains('dark-mode'); 
    // Updates button text and icon
    themeToggle.innerHTML = isDark ? '<i class="fa fa-sun"></i> Light Mode' : '<i class="fa fa-moon"></i> Dark Mode'; 
    // Saves theme preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light'); 
});

// Projects toggle functionality
// Gets the projects toggle button
const toggleProjects = document.getElementById('toggleProjects'); 
// Gets the projects list element
const projectsList = document.getElementById('projectsList'); 

// Event listener for projects toggle button
toggleProjects.addEventListener('click', () => {
    // Toggles the hidden class to show/hide projects
    projectsList.classList.toggle('hidden'); 
    // Checks if projects are hidden
    const isHidden = projectsList.classList.contains('hidden'); 
    // Updates button text and icon
    toggleProjects.innerHTML = isHidden ? '<i class="fa fa-eye"></i> Show Projects' : '<i class="fa fa-eye-slash"></i> Hide Projects'; 
});