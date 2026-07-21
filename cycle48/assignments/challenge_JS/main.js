// Ask user for their name and age, then display a personalized message using console.log()

// var name = prompt("Name?");
// var age = prompt("Age?");
// var birthDay = 2026 - age;
// console.log("Hello " + name + "! You are " + age + " years old and you were born around " + birthDay);

// Currency converter: get amount in EGP, convert to USD, EUR, GBP. USD=47.22, EUR=54.35, GBP=61.95
// var currency = +prompt("num");
// var usd = currency / 47.22;
// var eur = currency / 54.35;
// var gbp = currency / 61.95;

// console.log(+currency + " EGP = $" + usd.toFixed(2) + " USD, €" + eur.toFixed(2) + " EUR, £" + gbp.toFixed(2) + " GBP");

// Get a number from user, check if it's even or odd, display result
// var num = +prompt("number?");
// if (num % 2 === 0) {
//   console.log(+num + " is an even number");
// } else {
//   console.log(+num + " is an odd number");
// }

// Declare a variable `hour` and assign it a number between 0 and 23. Use an `if-else if-else` statement to log "Good morning!" (0-11), "Good afternoon!" (12-17), or "Good evening!" (18-23)
// var hour = +prompt("Hour?");
// if (hour >= 0 && hour <= 11) {
//   console.log("Good morning!");
// } else if (hour > 11 && hour <= 17) {
//   console.log("Good afternoon!");
// } else {
//   console.log("Good evening!");
// }

// Ask for three subject scores, calculate average and display pass/fail status (pass >= 50)
// var score1 = +prompt("score1?");
// var score2 = +prompt("score2?");
// var score3 = +prompt("score3?");
// var average = (score1 + score2 + score3) / 3;
// if (average >= 50) {
//   console.log("Average: " + average.toFixed(2) + ", Status: Pass");
// } else {
//   console.log("Average: " + average.toFixed(2) + ", Status: Fail");

// Get two numbers and an operator (+,-,*,/), perform calculation and display result
// var num1 = prompt("Enter first number:");
// var num2 = prompt("Enter second number:");
// var operator = prompt("Enter operator (+, -, *, /):");

// switch (operator) {
//   case "+":
//     console.log(`${num1} + ${num2} = ${+num1 + +num2}`);
//     break;
//   case "-":
//     console.log(`${num1} - ${num2} = ${+num1 - +num2}`);
//     break;
//   case "*":
//     console.log(`${num1} * ${num2} = ${+num1 * +num2}`);
//     break;
//   case "/":
//     console.log(`${num1} / ${num2} = ${+num1 / +num2}`);
//     break;
//   default:
//     console.log("Invalid operator!");
// }

// Get a number, print its multiplication table from 1 to 10 with formatting
// var num = +prompt("Enter the number:");
// for (var i = 1; i <= 10; i++) {
//   console.log(`${num} x ${i} = ${num * i} \n`);
// }

// Use a `for` loop to print even numbers from 2 to 10
// var result = ""; //to solve NAN problem
// for (var i = 2; i <= 10; i += 2) {
//   result += i;
// }
// console.log(result);

// Use a `for` loop to calculate the factorial of 5 (5*4*3*2*1). Log the final result, not the intermediate steps
// var result = 1;
// for (var i = 1; i <= 5; i++) {
//   result *= i;
// }
// console.log(result);

// Use a `while` loop to find the smallest integer `n` such that `n * n` is greater than 50. Log `n`
// var n = 1;
// while (n * n <= 50) {
//   n++;
// }
// console.log(n);

// Get two numbers from user, swap their values without using a third variable, display them after swapping
// var num1 = +prompt("Enter first number:");
// var num2 = +prompt("Enter second number:");
// num1 = num1 + num2;
// num2 = num1 - num2;
// num1 = num1 - num2;
// console.log(` After Swapping: num1=${num1}, num2=${num2}`);

// Get user age and ticket status, determine if can enter movie (age >= 18 OR hasTicket)
// var age = +prompt("Enter your age:");
// var hasTicket = prompt("hasTicket?");
// if (age >= 18 || hasTicket == "yes") {
//   console.log("Access granted: true");
// } else {
//   console.log("Access granted: false");
// }

// Get three numbers, find and display the largest using nested if statements
// var num1 = +prompt("Num1?");
// var num2 = +prompt("Num2?");
// var num3 = +prompt("Num3?");
// if (num1 > num2) {
//   if (num1 > num3) {
//     console.log(`Largest number is: ${num1}`);
//   } else {
//     console.log(`Largest number is: ${num3}`);
//   }
// } else {
//   if (num2 > num3) {
//     console.log(`Largest number is: ${num2}`);
//   } else {
//     console.log(`Largest number is: ${num3}`);
//   }
// }

// Ask for hours worked and hourly rate, calculate salary with overtime (>40 hrs = 1.5x rate)

// var hours = +prompt("Hours?");//45
// var rate = +prompt("Rate?");//20
// var regular = Math.min(hours, 40) * rate;//(45,40) ---> 40 *20 = 800
// var overtime = 0;
// if (hours > 40) {
//   overtime = (hours - 40) * rate * 1.5; //(45-40)*20 * 1.5 ---> 150
// }
// var total = regular + overtime; //150 + 800 =950
// console.log(`Regular: $${regular}, Overtime: $${overtime}, Total: $${total}`);

// BMI Calculator: get weight(kg) and height(m), calculate BMI, categorize. Categories: Underweight(<18.5), Normal(18.5-24.9), Overweight(25-29.9), Obese(30+)
// var weight = +prompt("Enter weight (kg):");
// var height = +prompt("Enter height(m):");
// var bmi = weight / (height * height);
// var category = "";
// if (bmi < 18.5) {
//   category = "Underweight";
// } else if (bmi < 25) {
//   category = "Normal weight";
// } else if (bmi < 30) {
//   category = "Overweight";
// } else {
//   category = "Obese";
// }
// console.log(`BMI: ${bmi.toFixed(2)} - ${category}`);

// Get purchase amount, calculate tax (10%), discount if > $100 (5% off), final price
// var amount = +prompt("Enter purchase amount:");
// var tax = amount * 0.1;
// var discount = 0;
// if (amount > 100) {
//   discount = amount * 0.05;
// }
// var finalPrice = amount + tax - discount;

// console.log(`Subtotal: $${amount}, Tax: $${tax}, Discount: $${discount}, Final: $${finalPrice}`);

// Create a simple ATM: get operation (1:Balance, 2:Withdraw, 3:Deposit) and amount, process it
// ATM Simulator

// var operation = prompt("Enter operation (1:Balance, 2:Withdraw, 3:Deposit):");
// var amount = 0;
// var currentBalance;

// switch (operation) {
//   case "1":
//     currentBalance = Number(prompt("Enter current balance:"));
//     console.log(`Your balance is: $${currentBalance}`);
//     break;

//   case "2":
//     amount = Number(prompt("Enter amount:"));
//     currentBalance = Number(prompt("Enter current balance:"));

//     if (amount > currentBalance) {
//       console.log("Insufficient funds");
//     } else {
//       currentBalance -= amount;
//       console.log(`Withdrew $${amount}. New balance: $${currentBalance}`);
//     }
//     break;

//   case "3":
//     amount = Number(prompt("Enter amount:"));
//     currentBalance = Number(prompt("Enter current balance:"));

//     currentBalance += amount;
//     console.log(`Deposited $${amount}. New balance: $${currentBalance}`);
//     break;

//   default:
//     console.log("Invalid operation");
// }

// Print numbers 1-100, but for multiples of 3 print 'Fizz', for 5 print 'Buzz', for both print 'FizzBuzz'
// var result = "";

// for (var i = 1; i <= 100; i++) {
//   if (i % 3 === 0 && i % 5 === 0) {
//     result += "FizzBuzz ";
//   } else if (i % 3 === 0) {
//     result += "Fizz ";
//   } else if (i % 5 === 0) {
//     result += "Buzz ";
//   }else {
//   result += `${i} `;
// }
// }
// console.log(result.trim());

// The Left Triangular Star Pattern involves printing a series of stars in a left-aligned triangular shape. As you progress through the pattern, the number of stars per line increases incrementally, forming a triangular structure.
// var userInput = prompt("Enter the number of rows for the triangle:");
// 2. Convert the input into a numeric format using Number()
// var rows = +userInput;
// var fullPattern = "";
// Outer loop handles the vertical rows
// for (var i = 1; i <= rows; i++) {
//     var rowString = ""; // Stores the content of the current line

// Inner loop handles the horizontal columns (stars per row)
// for (var j = 1; j <= i; j++) {
// 4. String concatenation to append stars and spaces
//     rowString += "*";
// }

// Concatenate the completed row and move to a new line
//     fullPattern += rowString + "\n";
// }
// console.log(fullPattern.trim());

// The Right Triangular Star Pattern involves printing a series of stars in a triangular shape, with each line having an incrementally increasing number of stars from left to right. This pattern is an excellent opportunity to practice loops and string concatenation in JavaScript.
// var userInput = prompt("Enter the number of rows for the triangle:");
// var rows = +userInput;

// var fullPattern = "";

// for (var i = 1; i <= rows; i++) {
//     var rowString = "";

// Print spaces
// for (var j = 1; j <= rows - i; j++) {
//     rowString += " ";
// }

// Print stars
// for (var k = 1; k <= i; k++) {
//     rowString += "*";
// }

//     fullPattern += rowString + "\n";
// }

// console.log(fullPattern);