<<<<<<< HEAD
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
=======
// SELECT ELEMENTS
const notificaionElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weatherIcon");
const tempElement = document.querySelector(".temperatureValue p");
const descElement = document.querySelector(".temperatureDesc p");
const locaionElement = document.querySelector(".location p");

//add data
const weather ={};

// unit of temp
weather.temperature = {
    unit : "celsius"
}
// APP CONSTS AND VARS
const KELVIN = 273;
//API key
const key ="c3b2c02eb85817e6bb67c17a8e6ca873";

//Check if browser support geolocation or not
if('geolocation' in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition , showError);
}else{
    notificaionElement.style.display = "block" ;
    notificaionElemen.innerHTML = "<p>Browser doesn't Support Geolocation</p>"
}

//Set position of user
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);
}

//show error if is an issuse wite geolocation
function showError(error)
{
    notificaionElement.style.display = "block" ;
    notificationElement.innerHTML = `<p> ${error.message}</p>`;
}


//get weather from API
function getWeather(latitude,longitude)
{
    let api =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    fetch (api)
        .then(function(response){
            let data = response.json();
            return data ;
        })
        .then(function(data){
            console.log(data); 
            weather.temperature.value = Math.floor(data.main.temp -KELVIN);
            weather.description =data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city =data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
    
}

//display weather to ui
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/unknown.png"/>`
    tempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`;
    descElement.innerHTML = weather.description;
    locaionElement.innerHTML = `${weather.city} , ${weather.country}`;
}

//confert C to F 
function CelsiusToFahrenheit(temperature){
    return (temperature * 9/5) +32;
}

//when user clicks on the tempElement
tempElement.addEventListener("click" , function(){
    if(weather.temperature.vlue === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let Fahrenheit = CelsiusToFahrenheit(weather.temperature.value);
        Fahrenheit = Math.floor(Fahrenheit);
        
        tempElement.innerHTML = `${Fahrenheit} °<span>F</span>`
        weather.temperature.unit ="Fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`
        weather.temperature.unit ="celsius";
    }



})
>>>>>>> 2f401c2 (Add weatherApp project)
