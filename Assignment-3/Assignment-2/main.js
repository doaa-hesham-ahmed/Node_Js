// Part 1: Node.js Core Modules (10 Grades)
// 1.
// Write a function that logs the current file path and directory. (0.5 Grade)
// •
// Output Example: {File: “/home/user/project/index.js”, Dir: “/home/user/project”}
// const path = require("node:path");
// function currentfile(){

//     console.log(
//         {
//         File: __filename,
//         dir:__dirname
//         }
//     );
// } currentfile();


// 2.
// Write a function that takes a file path and returns its file name. (0.5 Grade)
// •
// Input Example: /user/files/report.pdf
// •
// Output Example: "report.pdf "

// const path = require("node:path");
// // console.log(path.basename("/user/files/report.pdf"))
// function basename(filepath){
//    const Result = filepath.split("/");
//    return Result[Result.length-1];
// } console.log(basename(" /user/files/report.pdf"));


// 3.
// Write a function that builds a path from an object (0.5 Grade)
// •
// Input Example: { dir: "/folder", name: "app", ext: ".js"}
// •
// Output Example: “/folder/app.js”
// const path = require("node:path");
// function buildpath({dir, name, ext}){
//     const Result = path.join(dir,name+ext);
//     return Result;
// } console.log(buildpath({ dir: "/folder", name: "app", ext: ".js"}));


// 4.
// Write a function that returns the file extension from a given file path. (0.5 Grade)
// •
// Input Example: /docs/readme.md"
// •
// Output Example: “.md”
// const path =require("node:path");
// // console.log(path.extname("/docs/readme.md"));
// function Extentinationname(filepath){
//     const result=filepath.split(".");
//     return "." + result[result.length-1];
// }console.log(Extentinationname("/docs/readme.md"));
//Anowser way 
// function Extentinationname(filepath){
//     const result=filepath.split(".");
//     result.shift();
//     return "." + result;
// }console.log(Extentinationname("/docs/readme.md"));


// 5.
// Write a function that parses a given path and returns its name and ext. (0.5 Grade)
// •
// Input Example: /home/app/main.js
// •
// Output Example: { Name: “main”, Ext: “.js” }
// const path =require("node:path");
// function parsepath(filepath){
//    return{
//     Name: path.basename(filepath,path.extname(filepath)),
//     Ext: path.extname(filepath),
//    }
// }console.log(parsepath("/home/app/main.js"));
//Anowser way
// function parsepath(filepath){
//     const result=filepath.split("/");
//     const finalResult = result[result.length-1].split(".")
//     return `{Name: "${finalResult[0]}" , Ext: "${"."+finalResult[finalResult.length-1]}"}` ;
// }console.log(parsepath("/home/app/main.js"));


// 6.
// Write a function that checks whether a given path is absolute. (0.5 Grade)
// •
// Input Example: /home/user/file.txt
// •
// Output Example: true
// const path =require("node:path");
// function absolutefun(filepath){
//    return path.isAbsolute(filepath);
// }console.log(absolutefun("/home/user/file.txt"));


// 7.
// Write a function that joins multiple segments (0.5 Grade)
// •
// Input: "src", "components", "App.js"
// •
// Output Example: src/components/App.js
// const path =require("node:path");
// function joinsmultiplesegments(src,comonents,app){
//    return path.join(src,comonents,app);
// }console.log(joinsmultiplesegments("src", "components", "App.js"));


// 8.
// Write a function that resolves a relative path to an absolute one. (0.5 Grade)
// •
// Input Example: ./index.js
// •
// Output Example: /home/user/project/src/index.js
// const path =require("node:path");
// function relativepath(filepath){
//    return path.resolve(filepath);
// }console.log(relativepath("./index.js"));


// 9.
// Write a function that joins two paths. (0.5 Grade)
// •
// Input Example: /folder1, folder2/file.txt
// •
// Output Example: /folder1/folder2/file.txt
//  const path =require("node:path");
// function joinstwopaths(filepath1,filepath2){
//    return path.join(filepath1,filepath2);
// }console.log(joinstwopaths( "/folder1", "folder2/file.txt"));



// 10.
// Write a function that deletes a file asynchronously. (0.5 Grade)
// •
// Input Example: /path/to/file.txt
// •
// Output Example: The file.txt is deleted.
//  const path =require("node:path");
// function eletesafile(filepath){
//     return console.log(`The ${path.basename(filepath)} is deleted.`);
// }eletesafile( "/path/to/file.txt");



// 11.
// Write a function that creates a folder synchronously. (0.5 Grade)
// •
// Output Example: “Success”
// const fs = require("node:fs");
// function createfolder(folderName){
//     try{
//      fs.mkdirSync(folderName) ;
//     return "Success";
//     }
//     catch{
//         return "not createfoder";
//     }
// } console.log(createfolder("NewFolder"));



// 12.
// Create an event emitter that listens for a "start" event and logs a welcome message. (0.5 Grade)
// •
// Output Example: Welcome event triggered!
// const {EventEmitter} = require("node:events");
// const event = new EventEmitter();
// event.on("start",function(){
// console.log("Welcome event triggered!");
// });
// event.emit("start");


// 13.
// Emit a custom "login" event with a username parameter. (0.5 Grade)
// •
// Input Example: "Ahmed"
// •
// Output Example: “User logged in: Ahmed”
// const {EventEmitter} = require("node:events");
// const event = new EventEmitter();
// event.on("login",function(username){
//     console.log(`User logged in: ${username}`)
// });
//  event.emit("login","Ahmed");


// 14.
// Read a file synchronously and log its contents. (0.5 Grade)
// •
// Input Example: "./notes.txt"
// •
// Output Example: the file content => “This is a note.”
// const fs = require("node:fs");
// try{
//  const data = fs.readFileSync("D:\\node_js\\Assignment-2\\nodes.txt")
//  console.log(data.toString());
// } catch (err) {
//     console.log(err.message);
// }


// 15.
// Write asynchronously to a file. (0.5 Grade)
// •
// Input: path: "./async.txt", content: "Async save"
// const fs = require("node:fs");
// fs.writeFile("./async.txt", "Async save", (err) => {
//     if (err) {
//       return  console.log(err.message);   
//     }
//     console.log("File written successfully");
// });



// 16.
// Check if a directory exists. (0.5 Grade)
// •
// Input Example: "./notes.txt"
// const fs = require("node:fs");
// const { stream } = require("undici-types");
// function checkDirectory(filpath){
//     if(fs.existsSync(filpath)){
//       return "the  directory exists.";
//     }
//     else{
//          return "the  directory not exists.";
//     }
//  }
//  console.log(checkDirectory("D:\\node_js\\Assignment-2\\nodes.txt"));
// // console.log(checkDirectory("./notes.txt"))


// •
// Output Example: true
// 17.
// Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
// •
// Output Example: {Platform: “win32”, Arch: “x64”}
// const os = require("node:os");
//  function getDirectory(){
//     return {
//       Platform: os.platform(),
//        Arch: os.arch(),
//     }
//  }console.log(getDirectory());



// 18. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
// •
// Input Example: "./big.txt"
// •
// Output Example: log each chunk
// const fs = require("node:fs");
// function readFileChunks(filePath) {
//   const readStream = fs.createReadStream(filePath, {
//     encoding: "utf8"
//   });
//   readStream.on("open",()=>{
//     console.log("opening file");
//   })
//   readStream.on("ready",()=>{
//     console.log("readin file");
//   })
//   readStream.on("data", (chunk) => {
//     console.log(chunk);
//   });
//   readStream.on("end", () => {
//     console.log("Finished reading file.");
//   });
//     readStream.on("close", () => {
//     console.log("closed reading file.");
//   });
//   readStream.on("error", (err) => {
//     console.log(err.message);
//   });
// }
// readFileChunks("D:\\node_js\\Assignment-2\\async.txt");


// 19. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
// •
// Input Example: "./source.txt", "./dest.txt"
// •
// Output Example: File copied using streams
// const fs = require("node:fs");
// function copyFiles(filePath1, filePath2) {

//     const readStream = fs.createReadStream(filePath1);
//     const writeStream = fs.createWriteStream(filePath2);

//     readStream.pipe(writeStream);

//     readStream.on("error", (err) => {
//         console.log("Read Error:", err.message);
//     });

//     writeStream.on("finish", () => {
//         console.log("File copied successfully");
//     });

//     writeStream.on("error", (err) => {
//         console.log("Write Error:", err.message);
//     });
// }
// copyFiles(
//     "D:\\node_js\\Assignment-2\\async.txt",
//     "D:\\node_js\\Assignment-2\\nodes.txt"
// );

// 20. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
// •
// Input Example: "./data.txt", "./data.txt.gz"
// const fs = require("node:fs");
// const { pipeline } = require("node:stream");

// function copyFile(inputFile, outputFile) {

//     const readStream = fs.createReadStream(inputFile);
//     const writeStream = fs.createWriteStream(outputFile);

//     pipeline( readStream, writeStream,(err) => {
//             if (err) {
//                 console.log("Error:", err.message);
//             } else {
//                 console.log("File copied successfully");
//             }
//         }
//     );
// }copyFile("D:\\node_js\\Assignment-2\\async.txt","D:\\node_js\\Assignment-2\\nodes.txt");


//======================================================================================

// 1.Create an API that adds a new user to your users stored in a JSON file (1 Grade)
// (ensure that the email of the new user doesn’t exist before)
// URL: POST /user

// const http = require("node:http");
// const fs = require("node:fs");
// const server = http.createServer((req, res) => {

//     if (req.method === "POST" && req.url === "/user") {
//         let body = "";

//         req.on("data", chunk => {
//             body += chunk;
//         });

//         req.on("end", () => {
//             const newUser = JSON.parse(body);
//             fs.readFile("Assignment-2/users.json", "utf8", (err, data) => {

//                 if (err) {
//                     res.writeHead(500, {"Content-Type": "application/json"});

//                     return res.end(JSON.stringify({ message: "Error reading file"}));
//                 }
//                 const usersData = JSON.parse(data);

//                 const emailExist = usersData.users.find(user => user.email === newUser.email);
//                 if (emailExist) {

//                     res.writeHead(400, {"Content-Type": "application/json"});

//                     return res.end(JSON.stringify({ message: "Email already exists."}));
//                 }
//                 newUser.id = usersData.users.length + 1;
//                 usersData.users.push(newUser);

//                 fs.writeFile("Assignment-2/users.json",JSON.stringify(usersData, null, 2),err => {
//                         if (err) {

//                             res.writeHead(500, { "Content-Type": "application/json"});
//                             return res.end(JSON.stringify({ message: "Error writing file"}));
//                         }


//                         res.writeHead(201, { "Content-Type": "application/json"});
//                         res.end(JSON.stringify({ message: "User added successfully."}));

//                     }
//                 );
//             });
//         });
//     } else {

//         res.writeHead(404, {"Content-Type": "application/json"});

//         res.end(JSON.stringify({message: "Route not found"}));
//     }
// });

// server.listen(3000, () => {console.log("Server running on port 3000");});


// 2)Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved from the URL (1 Grade)
// Note: Remember to update the corresponding values in the JSON file
// o
// URL: PATCH /user/id

const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {

    if (req.method === "PATCH" && req.url.startsWith("/user/")) {
        const id = Number(req.url.split("/")[2]);
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", () => {

            const updateData = JSON.parse(body);
            fs.readFile("Assignment-2/users.json", "utf8", (err, data) => {

                if (err) {
                    res.writeHead(500, {"Content-Type": "application/json"});
                    return res.end(JSON.stringify({ message: "Error reading file"}));
                }
                const usersData = JSON.parse(data);
                const user = usersData.users.find(
                    user => user.id === id
                );

                if (!user) {

                    res.writeHead(404, {"Content-Type": "application/json"});
                    return res.end(JSON.stringify({message: "User not found"}));
                }

                if (updateData.name) {
                    user.name = updateData.name;
                }
                if (updateData.age) {
                    user.age = updateData.age;
                }
                if (updateData.email) {
                    user.email = updateData.email;
                }

                fs.writeFile("Assignment-2/users.json",JSON.stringify(usersData, null, 2),err => {

                        if (err) {
                            res.writeHead(500, {"Content-Type": "application/json"});
                            return res.end(JSON.stringify({message: "Error writing file"}));
                        }

                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({message: "User updated successfully",user: user}));

                    }
                );
            });
        });

    } else {

        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({ message: "Route not found"}));
    }

});
server.listen(3000, () => {console.log("Server running on port 3000");});


// 3)Create an API that deletes a User by ID. The user id should be retrieved from the URL (1 Grade)
// Note: Remember to delete the user from the file
// o
// URL: DELETE /user/id

// const http = require("node:http");
// const fs = require("node:fs");

// const server = http.createServer((req, res) => {

//     if (req.method === "DELETE" && req.url.startsWith("/user/")) {
//         const id = Number(req.url.split("/")[2]);
//         fs.readFile("Assignment-2/users.json", "utf8", (err, data) => {

//             if (err) {

//                 res.writeHead(500, {"Content-Type": "application/json"});

//                 return res.end(JSON.stringify({message: "Error reading file"}));
//             }
//             const usersData = JSON.parse(data);
//             const userIndex = usersData.users.findIndex(user => user.id === id);

//             if (userIndex === -1) {

//                 res.writeHead(404, { "Content-Type": "application/json" });
//                 return res.end(JSON.stringify({message: "User not found"}));
//             }
//             usersData.users.splice(userIndex, 1);
//             fs.writeFile("Assignment-2/users.json",JSON.stringify(usersData, null, 2),err => {

//                     if (err) {

//                         res.writeHead(500, { "Content-Type": "application/json"});
//                         return res.end(JSON.stringify({message: "Error writing file"}));
//                     }

//                     res.writeHead(200, { "Content-Type": "application/json"});
//                     res.end(JSON.stringify({message: "User deleted successfully"}));
//                 }
//             );
//         });
//     } else {

//         res.writeHead(404, { "Content-Type": "application/json"});
//         res.end(JSON.stringify({ message: "Route not found"}));

//     }
// });
// server.listen(3000, () => {console.log("Server running on port 3000");});


// 4)Create an API that gets all users from the JSON file. (1 Grade)
// o
// URL: GET /user

// const http = require("node:http");
// const fs = require("node:fs");

// const server = http.createServer((req, res) => {

//     if (req.method === "GET" && req.url === "/user") {
//         fs.readFile("Assignment-2/users.json", "utf8", (err, data) => {

//             if (err) {
//                 res.writeHead(500, {"Content-Type": "application/json"});
//                 return res.end(JSON.stringify({message: "Error reading file"}));
//             }

//             const usersData = JSON.parse(data);
//             res.writeHead(200, {"Content-Type": "application/json"});
//             res.end(JSON.stringify(usersData));

//         });

//     } else {

//         res.writeHead(404, {"Content-Type": "application/json"});
//         res.end(JSON.stringify({ message: "Route not found"}));
//     }

// });
// server.listen(3000, () => {console.log("Server running on port 3000");});

// 5)Create an API that gets User by ID. (1 Grade)
// o
// URL: GET /user/:id

// const http = require("node:http");
// const fs = require("node:fs");

// const server = http.createServer((req, res) => {

//     if (req.method === "GET" && req.url.startsWith("/user/")) {
//         const id = req.url.split("/")[2];
//         fs.readFile("Assignment-2/users.json", "utf8", (err, data) => {

//             if (err) {
//                 res.writeHead(500, {"Content-Type": "application/json"});

//                 return res.end(JSON.stringify({ message: "Error reading file"}));
//             }

//             const usersData = JSON.parse(data);

//             const user = usersData.users.find( user => user.id === Number(id) );

//             if (!user) {
//                 res.writeHead(404, {"Content-Type": "application/json"});
//                 return res.end(JSON.stringify({ message: "User not found"}));
//             }

//             res.writeHead(200, { "Content-Type": "application/json" });
//             res.end(JSON.stringify(user));
//         });

//     } else {

//         res.writeHead(404, {"Content-Type": "application/json"});
//         res.end(JSON.stringify({message: "Route not found"}));
//     }
// });
// server.listen(3000, () => {console.log("Server running on port 3000");});