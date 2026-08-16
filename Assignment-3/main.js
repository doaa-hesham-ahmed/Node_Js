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

import express from "express";
import { Router } from "express";
import fs, { readFile } from "fs/promises";
import { json } from "stream/consumers";

const PORT = 3000;
const app = express();
app.use(express.json());
const userRouter = Router();
app.use("/users", userRouter);

async function readUser() {
  try {
    const data = await fs.readFile("users.json", { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (error) {
    return [];

  }
}

async function writerUser(users) {
  try {
    const data = await fs.writeFile("users.json", JSON.stringify(users, null, 2), "utf8");
  } catch (error) {
    console.log(error);

  }
}

//get Add user 
userRouter.post("/add-user", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const users = await readUser();
    const existemail = users.find(user => user.email === email)
    if (existemail) {
      return res.status(400).json({ message: "email already exist" });

    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      age
    };
    users.push(newUser);
    await writerUser(users);
    res.status(201).json({ message: "user is Added Successfully", user: newUser })
  } catch (error) {
    return res.status(500).json({ message: "user not Added" });
  }
});

//update user
userRouter.patch("/update-user/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, age } = req.body;
    const users = await readUser();
    const findIndexUser = users.findIndex(user => user.id == id);

    if (findIndexUser == -1) {
      return res.status(404).json({ message: "user not exist" });
    }
    if (name) users[findIndexUser].name = name;
    if (age) users[findIndexUser].age = age;
    if (email) {
      const existEmail = users.find(user => user.email == email && user.id != id);
      if (existEmail) {
        return res.status(400).json({ message: "user email already exist" });
      }
      users[findIndexUser].email = email;
    }
    await writerUser(users);
    return res.status(200).json({ message: "user is updated successfully", user: users[findIndexUser] });

  } catch (error) {
    console.log({ stack: error.stack, message: error.message });

    res.status(500).json({ message: "server error" });
  }
});

//delete user by id
userRouter.delete("/delete-user/:id",async(req,res)=>{
  try {
    const {id} = req.params;
  const users = await readUser();
  const finduser= users.findIndex(user => user.id === Number(id));
  if(finduser===-1){
    return res.status(404).json({message:"user not exist"});
  }
  users.splice(finduser,1);
  await writerUser(users);
  return res.status(201).json({message:"user delete successfully"});

 } catch (error) {
     console.log({stack: stack.error , message:message.error});
     
  }});
//delete all users
userRouter.delete("/delete-user",async(req,res)=>{
  try {
  await writerUser([]);
  return res.status(201).json({message:"All users delete successfully"});

 } catch (error) {
     console.log({stack: stack.error , message:message.error});
     
  }});

  //get all user
  userRouter.get("/user",async(req,res)=>{
    try {
      const users = await readUser();
      if(users.length === 0){
        return res.status(404).json({message:" users not found"});

      }
      return res.status(201).json({message:"All users get successfully",users});

    } catch (error) {
       console.log({stack: stack.error , message:message.error});
      
    }
  });

  //get user by name
 userRouter.get("/user/:name",async(req,res)=>{
    try {
      const {name}=req.params;
      const users = await readUser();
      const userNameFound = users.find(user => user.name ===name);
      if(!userNameFound){
        return res.status(404).json({message:"user not found"});
      }
      return res.status(201).json({message:"All users get successfully",users:userNameFound});

    } catch (error) {
       console.log({stack: stack.error , message:message.error});
      
    }
  });

 // get user by id
userRouter.get("/user/:id", async(req,res)=>{
  try {
    const {id} = req.params;
    const users = await readUser();
    const userIDFound = users.find( user => user.id === Number(id));

    if(!userIDFound){
      return res.status(404).json({ message:"user not found"});
    }
    return res.status(200).json({ message:"User found successfully", user:userIDFound});
  } catch (error) {
    console.log(error);

 return res.status(500).json({message:"server error"});
  }
});

//get minage
userRouter.get("/user/filter", async (req, res) => {
  try {
    const minage = Number(req.query.minage);
    if (isNaN(minage)) {
      return res.status(400).json({message: "maxage is required"});
    }
    const users = await readUser();
    const findMinAge = users.filter(user => user.age >= minage );
    if (findMinAge.length === 0) {
      return res.status(404).json({ message: "users not found"});
    }
    return res.status(200).json({ message: "users with maximum age found successfully", users: findMinAge });

  } catch (error) {
    console.log(error);
  }
});
 //get maxage
userRouter.get("/user/filter", async (req, res) => {
  try {
    const maxage = Number(req.query.maxage);
    if (isNaN(maxage)) {
      return res.status(400).json({message: "maxage is required"});
    }
    const users = await readUser();
    const findMaxAge = users.filter(user => user.age <= maxage );
    if (findMaxAge.length === 0) {
      return res.status(404).json({ message: "users not found"});
    }
    return res.status(200).json({ message: "users with maximum age found successfully", users: findMaxAge });

  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`server is Running on port :${PORT}`);
});




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

