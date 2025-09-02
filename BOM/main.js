let btn = document.getElementById('btn');
window.onscroll = function(){
    if(window.scrollY >=400)
    {
        btn.style.display ='block';

    }else{
        btn.style.display ='none';
    }
}
btn.onclick =function(){
    window.scroll({
        left:0,
        top :0,
        behavior :"smooth"
    })
}