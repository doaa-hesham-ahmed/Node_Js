// Assignment3


// Part1: Node Internals (3 Grades):

// 1. What is the Node.js Event Loop? (0.5 Grade)
//The Event Loop is responsible for managing asynchronous tasks and allowing Node.js
//  to perform non-blocking operations efficiently.


// 2. What is Libuv and What Role Does It Play in Node.js? (0.5 Grade)
// Libuv is a C library used by Node.js that provides support for asynchronous operations
//  and handles low-level system tasks.

// Role of Libuv in Node.js:

// Manages the Event Loop.
// Handles asynchronous I/O operations such as:
// File system operations (reading and writing files).
// Network requests.
// DNS operations.
// Provides a Thread Pool for tasks that cannot be handled by the main thread, such as file operations and cryptography.


// 3. How Does Node.js Handle Asynchronous Operations Under the Hood? (0.5 Grade)
// Node.js handles asynchronous operations using the combination of the Event Loop, Libuv, and callback queues.

// The process works as follows:

//1- When Node.js encounters an asynchronous operation (such as reading a file or making a network request), it does not block the main thread.
//2-It sends the operation to Libuv, which manages the background execution using the operating system or the Thread Pool.
//3- After the operation is completed, the callback function is placed into a callback queue.
//4- The Event Loop checks the queue and executes the callback when the Call Stack is empty.


// 4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js? (0.5 Grade)
// Call Stack :	A place where JavaScript code is executed. It stores function calls and executes them in a Last In First Out (LIFO) order.
// Event Queue : (Callback Queue)	A queue that stores callback functions of completed asynchronous operations, waiting to be executed.
// Event Loop  :A mechanism that continuously checks if the Call Stack is empty and moves callbacks from the Event Queue to the Call Stack for execution.
//======================================
// Call Stack → Executes JavaScript code.
// Event Queue → Stores completed asynchronous callbacks.
// Event Loop → Moves callbacks from the queue to the stack when they can be executed.


// 5. What is the Node.js Thread Pool and How to Set the Thread Pool Size? (0.5 Grade)
//The Node.js Thread Pool allows multiple background tasks to run concurrently, improving 
// performance for heavy asynchronous operations. The size can be configured using UV_THREADPOOL_SIZE


// 6. How Does Node.js Handle Blocking and Non-Blocking Code Execution? (0.5 Grade)
// Node.js avoids blocking the main thread by using asynchronous, non-blocking operations managed by Libuv 
// and the Event Loop, allowing it to handle many requests efficiently.
//Blocking Code:
// Blocking code stops the execution of the program until the current operation is completed.
// The main thread cannot execute other tasks while waiting.
// It reduces performance when handling multiple requests.
// Non-Blocking Code:
// Non-blocking code allows Node.js to continue executing other tasks while waiting for an operation to finish.
// Asynchronous operations are handled by Libuv and the Event Loop.
// Once the operation completes, the callback is executed.



// Part2: Simple CRUD Operations Using Express.js:


// ı.For all the following tasks, you must use the fs module to read and write data from a JSON file (e.g.,
// users.json). Do not store or manage data using arrays. (1 Grades)
// 1. Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before)(1
// Grades)
// o URL: POST /user

// const express = require("express");
// const fs = require("node:fs");

// const app = express();

// app.use(express.json());

// app.post("/user", (req, res) => {

//     const newUser = {
//     id: Date.now(),
//     ...req.body
// };
//     fs.readFile("D:\\node_js\\Assignment-3\\users.json", "utf8", (err, data) => {
//         if (err) {
//             return res.status(500).json({ message: "Error reading file" });
//         }
//         const usersData = JSON.parse(data);
//         const emailExists = usersData.users.find(user => user.email === newUser.email);

//         if (emailExists) {
//             return res.status(400).json({message: "Email already exists"});
//         }
//         newUser.id = usersData.users.length + 1;
//         // newUser.id = Date.now();

//         usersData.users.push(newUser);
//         fs.writeFile("users.json",JSON.stringify(usersData, null, 2),(err) => {

//                 if (err) {
//                     return res.status(500).json({ message: "Error writing file"});
//                 }
//                 res.status(201).json({message: "User added successfully",user: newUser});
//             }
//         );
//     });
// });
// app.listen(3000, () => {console.log("Server running on port 3000");});



// 2. Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved from the params. (1 Grade)
// Note: Remember to update the corresponding values in the JSON file
// o URL: PATCH /user/:id

// const express= require("express");
// const fs = require("node:fs");
// const app = express();
// app.use(express.json());

// app.patch("/user/:id", (req,res)=>{
//     const userId = req.params.id;
//     const userUpdate = req.body;
//     fs.readFile("D:\\node_js\\Assignment-3\\users.json","utf-8",(err,data)=>{

//         if(err){
//             return res.status(500).json({message:"Error reading file"});
//         }

//         const userData = JSON.parse(data);
//         const user = userData.users.find(user => user.id == userId);

//         if(!user){
//             return res.status(404).json({message:"User ID not found"});
//         }
//         if(userUpdate.name){
//             user.name = userUpdate.name;
//         }
//         if(userUpdate.age){
//             user.age = userUpdate.age;
//         }
//         if(userUpdate.email){

//             const emailExist = userData.users.find(u => u.email === userUpdate.email && u.id != userId);
//             if(emailExist){
//                 return res.status(400).json({ message:"Email already exists"});
//             }
//             user.email = userUpdate.email;
//         }
//         fs.writeFile("D:\\node_js\\Assignment-3\\users.json",JSON.stringify(userData,null,2),(err)=>{
//                 if(err){
//                     return res.status(500).json({ message:"Error writing file"});
//                 }
//                 res.status(200).json({message:"User updated successfully",user});
//             }
//         );
//     });
// });
// app.listen(3000,()=>{ console.log("Server running on port 3000");});


// 3. Create an API that deletes a User by ID. The user id should be retrieved from either the request body or optional params. (1 Grade)
// Note: Remember to delete the user from the file
// o URL: DELETE /user{/:id}


// const express= require("express");
// const fs= require("node:fs");
// const { json } = require("node:stream/consumers");
// const app= express();
// app.use(express.json())
// app.delete("/user{/:id}",(req,res)=>{
//     const id = Number(req.params.id || req.body.id)
//    fs.readFile("D:\\node_js\\Assignment-3\\users.json","utf-8",(err,data)=>{
//     if(err){
//         return res.status(500).json({message: "Error to reading file"})
//     }
//     const userData = JSON.parse(data)
   
//     const userIndex= userData.users.findIndex(user => user.id===id);
//     if(userIndex===-1){
//         return res.status(500).json({message: "Error to reading file"})
//     }
//     const deleteUser = userData.users.splice(userIndex,1);
//     fs.writeFile("D:\\node_js\\Assignment-3\\users.json",JSON.stringify(userData,null,2),(err)=>{
//       if(err){
//         return res.status(500).json({message: "Error to writing file"})
//     }
//     return res.status(200).json({message: "user id  is Delet sucessfully",user:deleteUser[0]})
//     })
//    })
// });
// app.listen(3000,()=>{message: console.log("Server running on port 3000");
// });



// 4. Create an API that gets a user by their name. The name will be provided as a query parameter. (1 Grade)
// o URL: GET /user/getByName

// const express =require("express");
// const fs =require("node:fs");
// const { json } = require("node:stream/consumers");
// const app =express();
// app.get("/user/getByName",(req,res)=>{
    
//     fs.readFile("D:\\node_js\\Assignment-3\\users.json","utf-8",(err,data)=>{
//         if(err){
//             return res.status(500).json({message: "Error to reading file"})
//         }
//         const userData = JSON.parse(data);
//         const name = req.query.name;
//         const user = userData.users.find(user => user.name ===name);
//         if(!user){
//               return res.status(404).json({message: "userNn ame not found"})
//         }
//          return res.status(200).json({message: "get user successfully",user: {
//         id: user.id,
//         name: user.name,
//         age: user.age,
//         email: user.email
//     }})
//     }
// )

// });
// app.listen(3000,()=>{console.log("Server running on port 3000");})



// 5. Create an API that gets all users from the JSON file. (0.5 Grade)
// o URL: GET /user

// const express =require("express");
// const fs =require("node:fs");
// const { json } = require("node:stream/consumers");
// const app =express();
// app.get("/user",(req,res)=>{
    
//     fs.readFile("D:\\node_js\\Assignment-3\\users.json","utf-8",(err,data)=>{
//         if(err){
//             return res.status(500).json({message: "Error to reading file"})
//         }
//         const userData = JSON.parse(data);
//          return res.status(200).json({message: "get All user successfully",users: userData.users})
//     }
// )

// });
// app.listen(3000,()=>{console.log("Server running on port 3000");})



// 6. Create an API that filters users by minimum age. (1 Grade)
// o URL: GET /user/filter
//Filter ::minAge


// const express =require("express");
// const fs =require("node:fs");
// const { json } = require("node:stream/consumers");
// const app =express();
// app.get("/user/filter",(req,res)=>{
//     const minage = Number(req.query.minage);
//     fs.readFile("D:\\node_js\\Assignment-3\\users.json","utf-8",(err,data)=>{
//         if(err){
//             return res.status(500).json({message: "Error to reading file"})
//         }
//         const userData = JSON.parse(data);
//         const users = userData.users.filter(user => user.age > minage);
//         if(users.length===0){
//               return res.status(404).json({message: "user name not found"})
//         }
//          return res.status(200).json({message: "Users filtered successfully",users:users
       
//     })
//     }
// )

// });
// app.listen(3000,()=>{console.log("Server running on port 3000");})


// //Filter ::maxAge
// const express =require("express");
// const fs =require("node:fs");
// const { json } = require("node:stream/consumers");
// const app =express();
// app.get("/user/filter",(req,res)=>{
//     const maxage = Number(req.query.maxage);
//     fs.readFile("D:\\node_js\\Assignment-3\\users.json","utf-8",(err,data)=>{
//         if(err){
//             return res.status(500).json({message: "Error to reading file"})
//         }
//         const userData = JSON.parse(data);
//         const users = userData.users.filter(user => user.age < maxage);
//         if(users.length===0){
//               return res.status(404).json({message: "user name not found"})
//         }
//          return res.status(200).json({message: "Users filtered successfully",users:users
       
//     })
//     }
// )

// });
// app.listen(3000,()=>{console.log("Server running on port 3000");})





// 7. Create an API that gets User by ID. (0.5 Grade)
// o URL: GET /user/:id

// const express =require("express");
// const fs =require("node:fs");
// const { json } = require("node:stream/consumers");
// const app =express();
// app.get("/user/:id",(req,res)=>{
//     const id = Number(req.params.id || req.body.id);
//     fs.readFile("D:\\node_js\\Assignment-3\\users.json","utf-8",(err,data)=>{
//         if(err){
//             return res.status(500).json({message: "Error to reading file"})
//         }
//         const userData = JSON.parse(data);
//         const user = userData.users.find(user => user.id ===id);
//         if(!user){
//               return res.status(404).json({message: "user name not found"})
//         }
//          return res.status(200).json({message: "get user successfully",user: {
//         id: user.id,
//         name: user.name,
//         age: user.age,
//         email: user.email
//     }})
//     }
// )

// });
// app.listen(3000,()=>{console.log("Server running on port 3000");})


// Important Notes about postman
// 1. Name the endpoint with a meaningful name like 'Add User', not dummy names.

// 2. Save your changes on each request( ctrl+s ).

// 3. Include the Postman collection link (export your Postman collection ) in the email with your assignment link

// https://documenter.getpostman.com/view/49918132/2sBY4VLJGK


// Bonus (2 Grades)
// How to deliver the bonus?
// 1- Solve the problem Longest Common Prefix on LeetCode
// 2- Inside your assignment folder, create a SEPARATE FILE and name it “bonus.js”
// 3- Copy the code that you have submitted on the website inside ”bonus.js” file