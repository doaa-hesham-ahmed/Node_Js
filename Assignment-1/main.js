// A. Part 1: Coding Questions (7.5 Grade): 

// 1. Convert the string "123" to a number and add 7. (0.5 Grade) 
// • Output Example: 130 
let x="123";
x=Number(x);
x=x+7;
console.log(x);
console.log(typeof x);

// 2. Check if the given variable is falsy and return "Invalid" if it is. (0.5 Grade) 
// • Input Example: 0 
// •  Output Example: "Invalid" 
let y = 0;

if (!y) {
    console.log("Invalid");
}

// 3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue (0.5 Grade) 
// • Output Example:1, 3, 5, 7, 9 
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        continue;
    }
    console.log(i);
}

// 4. Create an array of numbers and return only the even numbers using filter method. (0.5 Grade) 
// • Input Example: [1, 2, 3, 4, 5] 
// • Output Example: [2,4]
let nums = [1, 2, 3, 4, 5];
let evenumber=nums.filter(n => n%2===0); 
console.log(evenumber);

// 5. Use the spread operator to merge two arrays, then return the merged array. (0.5 Grade) 
// • Input Example: [1, 2, 3], [4, 5, 6] 
// • Output Example: [1, 2, 3, 4, 5, 6] 
let A = [1, 2, 3];
let B = [4, 5, 6];

let result = [...A,...B];
console.log(result);

// 6. Use a switch statement to return the day of the week given a number (1 = Sunday …., 7 = Saturday). (0.5 Grade) 
// • Input Example: 2 
// • Output Example: “Monday” 
function getDay(dayNumber){
    switch(dayNumber){
        case 1:
       return "Sunday"
       case 2:
       return "Monday"
       case 3:
       return "Tuesday"
       case 4:
       return "Wednesday"
       case 5:
       return "Thursday"
       case 6:
       return "Friday"
       case 7:
       return "Saturday"
       default:
        return "Invalid day"
    }
}
console.log(getDay(2));

// 7. Create an array of strings and return their lengths using map method (0.5 Grade) 
// • Input: ["a", "ab", "abc"] 
// • Output Example: [1, 2, 3] 
let arr=["a", "ab", "abc"];
let lenNum=arr.map(num=>num.length)
console.log(lenNum);

// 8. Write a function that checks if a number is divisible by 3 and 5. (0.5 Grade) 
// • Input Example: 15 
// • Output Example: “Divisible by both” 
function checkDivisible(num){
    if(num%3===0 && num%5===0)
    {
      return "Divisible by both";
    }
    else{
        return "Not Divisible by both";
    }
}
console.log(checkDivisible(15));

// 9. Write a function using arrow syntax to return the square of a number (0.5 Grade) 
// • Input Example: 5 
// • Output Example: 25 
const Sguarenum = (num)=> {
  return num*num;
}
console.log(Sguarenum(5));

// 10. Write a function that destructures an object to extract values and returns a formatted string. (0.5 Grade) 
// • Input Example: const person = {name: 'John', age: 25} 
// • Output Example: 'John is 25 years old' 
function getPresonInfo(person){
    const {name,age}=person;
    return `${name} is ${age} years old`
}
console.log(getPresonInfo({name: 'John', age: 25}));

// 11. Write a function that accepts multiple parameters (two or more) and returns their sum. (0.5 Grade) 
// • Input Example: 1, 2, 3, 4, 5 
// • Output Example: 15 
function sum(...num){
    let total=0;
    for(let n of num){
        total+=n;
    }
    return total;
}
console.log(sum(1,2,3,4,5));


// 12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message. (0.5 Grade) 
// • Output Example: “Success” 
function getMessage() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Success");
        }, 3000);
    });
}
getMessage().then((result) => {
    console.log(result);
});


// 13. Write a function to find the largest number in an array. (0.5 Grade) 
// •  Input Example: [1, 3, 7, 2, 4] 
// • Output Example: 7 
function findLargest(arr) {
    let max = arr[0];

    for (let num of arr) {
        if (num > max) {
            max = num;
        }
    }
    return max;
}
console.log(findLargest([1, 3, 7, 2, 4]));

// 14. Write a function that takes an object and returns an array containing only its keys. (0.5 Grade) 
// •  Input Example: name: "John", age: 30} 
// •  Output Example: ["name", "age"] 
function getKeys(obj) {
    return Object.keys(obj);
}

const person = {
    name: "John",
    age: 30
};
console.log(getKeys(person)); 



// 15. Write a function that splits a string into an array of words based on spaces. (0.5 Grade) 
// • Input: "The quick brown fox" 
// • Output: ["The", "quick", "brown", "fox"] 
function getsplit(str){
return str.split(" ");
}
console.log(getsplit("The quick brown fox"));


// B. Part 2: Essay Questions (2.5 Grade): 
// 1. What is the difference between forEach and for...of? When would you use each? (0.5 Grade) 
/*
forEach()
It is an Array method used to iterate over array elements.
It cannot use break or continue.
It does not return a new array (returns undefined).
It is used when you want to perform an action on every element.

for...of
It is a loop used to iterate over iterable objects like arrays and strings.
It supports break and continue.
It gives more control over the loop.

*/ 

// 2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples. (0.5 Grade) 

/*
Hoisting:

Hoisting is a JavaScript behavior where variable and function declarations are moved to the top of their
 scope before code execution.

 TDZ is the period where variables declared with let and const exist but cannot be accessed before their
  declaration.
*/

// 3. What are the main differences between == and ===? (0.5 Grade) 

/*
== (Loose Equality)
Compares only values.
Performs type conversion before comparison.

=== (Strict Equality)
Compares both value and data type.
Does not perform type conversion.
*/

// 4. Explain how try-catch works and why it is important in async operations. (0.5 Grade) 

/*
try-catch is used to handle errors and prevent the program from crashing.
In asynchronous operations like:
API requests
Promises
async/await
*/

// 5. What’s the difference between type conversion and coercion? Provide examples of each. (0.5 Grade) 

/*
Type Conversion:
Type conversion is when the programmer manually converts one data type into another.
Type Coercion:
Type coercion is when JavaScript automatically converts one type into another during an operation.
*/


 

