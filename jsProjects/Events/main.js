 let inp =document.getElementById('inp');
// btn.addEventListener('click',function(){
//   document.body.style.background ='red';
// })
// btn.addEventListener('click',function(){
//   document.style.background ='blue';
// })
// btn.addEventListener('click',function(){
//   document.style.color ='white';
// })
let i=1;
inp.onfocus =function(){
    inp.style.border ='2px solid #f00';

}
inp.onblur =function(){
    inp.style.border ='none';
}