//sum two number by using function
/*function calc(num1 , num2)
{
    return num1+num2;
}
let result =calc(30 , 25);
console.log(result);
*/
//compare between labtops 
/*let laptops =['Dell' , 'Lenovo' , 'hp' ,'Asus'];
function printArray(laptops)
{
   for (i=0; i<laptops.length;i++)
   { 
    console.log(laptops[i]);
   }
   if (laptops.includes("Lenovo"))
   {
    console.log("Lenovo");
   }
}
printArray(laptops);
*/
let laptops =['Dell' , 'Lenovo' , 'hp' ,'Asus'];
console.log(laptops);
function printArray(laptops)
{
    
   for (let i=0; i<laptops.length;i++)
   { 
     
     if (laptops[i] === "Lenovo")
    {
     console.log(laptops[i]);
    }
}
}
printArray(laptops);