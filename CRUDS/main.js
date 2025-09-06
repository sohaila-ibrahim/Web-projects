let title =document.getElementById('title');
let price=document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');

let mood ='create';
let tmp;
//console.log(title,price,taxes,ads,discount,total,count,category,submit);

// get total
function getTotal(){
    //console.log("done");
    if(price.value !=''){
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }else{
        total.innerHTML = '';
        total.style.background = 'red';
    }
}
// create product 
let datapro ;
if(localStorage.product !=null){
    datapro = JSON.parse(localStorage.product);


}else{
    datapro =[];
}

submit.onclick = function(){
    //collect data in opject
    let newpro ={
        title :title.value.toLowerCase(),
        price :price.value,
        taxes :taxes.value,
        ads :ads.value,
        discount  :discount.value,
        total :total.innerHTML,
        count :count.value,
        category :category.value.toLowerCase(),
    }

    //count and add many new products
    if(mood ==='create'){
        if(newpro.count > 1){
            for( let i=0;i < newpro.count;i++){
            //add new product
            datapro.push(newpro);
            }
        }else{
            datapro.push(newpro);
            }
    }else{
        datapro[ tmp ] = newpro;
        mood ='create';
        submit.innerHTML ='Create';
        count.style.display ='block';
    }
    
    //save in localstorage
    localStorage.setItem('product',JSON.stringify(datapro));
   // console.log(datapro);
    clearData()
    readData()
}

//clear inputs
function clearData(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value ='';

}
//read data 
function readData(){
    getTotal()
    let table = '';
    for(let i =0 ; i <datapro.length;i++){
        table += `
        <tr>
            <td>${i +1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button  onclick ="updateData(${i})" id="Update" > Update</button></td>
            <td><button onclick ="deleteData(${i})" id="Delete" > Delete</button></td>
        </tr>  
        `;          
    }
    document.getElementById('tbody').innerHTML = table;

    //Delete All
    let btnDelete = document.getElementById('deleteAll');
    if(datapro.length > 0){
        btnDelete.innerHTML =`
        <button onclick="deleteAll()"> Delete All </button>
        `
    }else{
        btnDelete.innerHTML ='';
    }

}
//To became function always works
readData()


 //Delete one product
function deleteData(i)
{
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    readData()
}
function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    readData()
}
//Update
function updateData(i){
    //check if function was work
    //console.log(i);

    title.value =datapro[i].title;
    price.value =datapro[i].price;
    taxes.value =datapro[i].taxes;
    title.value =datapro[i].title;
    ads.value =datapro[i].ads;
    discount.value =datapro[i].discount;
    getTotal()
    count.style.display ='none';
    category.value =datapro[i].category;
    submit.innerHTML ='Update';
    mood ='update';
    tmp =i;
    scroll({
        top :0,
        behavior: 'smooth',

    })
}

//search by mood title or category
let searchMood ='title';

function getSearchMood(id)
{
    let search= document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood ='title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood ='category';
        search.placeholder = 'Search By Category';
    }
search.focus()
    
}



function searchData(value)
{
    let table = '';
    if(searchMood === 'title'){
        for(let i=0; i< datapro.length;i++){
           if(datapro[i].title.includes(value.toLowerCase())){
            table += `
        <tr>
            <td>${i +1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button  onclick ="updateData(${i})" id="Update" > Update</button></td>
            <td><button onclick ="deleteData(${i})" id="Delete" > Delete</button></td>
        </tr>  
        ` ;
           } 
        }

    }
        
    else 
    {
        for(let i=0; i< datapro.length;i++){
           if(datapro[i].category.includes(value.toLowerCase())){
            table += `
        <tr>
            <td>${i +1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button  onclick ="updateData(${i})" id="Update" > Update</button></td>
            <td><button onclick ="deleteData(${i})" id="Delete" > Delete</button></td>
        </tr>  
        ` ;
           } 
        }
          
    
    }
    document.getElementById('tbody').innerHTML = table;
}