//cache variables
const form =document.querySelector('form');
const ul =document.querySelector('ul');
const input =document.querySelector('#item');
const clearbutton =document.querySelector('button[type="button"]');


//create li and append to ul

const createLi = (text) =>{
    const li =document.createElement('li');
    li.textContent = text;
    ul.appendChild(li)
};
//submit from Event
form.addEventListener('submit' ,function(e){
    e.prevrntDefault();
//add to ul
createLi(input.value);

});