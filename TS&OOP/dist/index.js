"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//1-
// BaseClass–User(1Mark)
class User {
    id;
    name;
    email;
    password;
    phone;
    age;
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }
    }
    displayInfo() {
        console.log(`userId : ${this.id} userName: ${this.name} email: ${this.email} password:${this.password} userPhone: ${this.phone} userAge: ${this.age}`);
        console.log("------------------------------------------------------------------");
    }
}
const user1 = new User(1, "Doaa", "doaa@gmail.com", "123", "01121511177", 22);
user1.displayInfo();
//2-
//Inheritance– AdminUser(1Mark)
class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    mangeNote() {
        console.log("Admin can manage notes");
        console.log("------------------------------------------------------------------");
    }
}
const admin1 = new Admin(2, "mera", "mera@gmail.com", "123", "01233", 24);
admin1.mangeNote();
admin1.displayInfo();
console.log("------------------------------------------------------------------");
//3-
//Class- Note(1 Mark)
//
class Note {
    id;
    title;
    content;
    userId;
    constructor(id, title, content, userId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
    preview() {
        return `content: ${this.content}`;
    }
}
const note = new Note(1, "hello Ts", "IM prictes on the oop in ts", user1);
console.log(note.preview());
console.log("----------------------------------------------------");
//4-
//Composition–NoteBookandNotes(1Mark)
class NoteBook {
    notes = [];
    addNote(notes) {
        this.notes.push(notes);
        console.log("notes Adding successfully ........");
    }
    removeNote(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId);
        console.log("notes Removed successfully ........");
    }
    displayNote() {
        this.notes.forEach(note => {
            console.log(note.title);
            console.log(note.preview());
        });
    }
}
const noteBook = new NoteBook();
noteBook.addNote(note);
noteBook.displayNote();
console.log("-------------------------------------------------");
noteBook.removeNote(1);
//5-
// Aggregation–UserandNotebook(1Mark)
class Userr {
    id;
    name;
    email;
    password;
    phone;
    age;
    notebook = [];
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }
    }
    AddNoteBook(notebook) {
        this.notebook.push(notebook);
        console.log("noteBook Adding successfully ......");
    }
    displayNoteBook(notebook) {
        this.notebook.forEach((notebook, index) => {
            console.log(`notebook: ${index + 1}`);
        });
        console.log("noteBook Adding successfully ......");
    }
    displayInfo() {
        console.log(`userId : ${this.id} userName: ${this.name} email: ${this.email}`);
        console.log("------------------------------------------------------------------");
    }
}
console.log("---------------------------------------");
const userr1 = new Userr(1, "Doaa", "doaa@gmail.com", "123456", "01012345678", 22);
const notebook1 = new NoteBook();
const notebook2 = new NoteBook();
userr1.AddNoteBook(notebook1);
userr1.AddNoteBook(notebook2);
userr1.displayInfo();
//6-
//Association– Note andUser(1Mark)
class Note1 {
    id;
    title;
    content;
    userId;
    author;
    constructor(id, title, content, userId, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.author = author;
    }
    preview() {
        return `content: ${this.content}`;
    }
    displayAuthor() {
        console.log(`Author: ${this.author.name}`);
    }
}
const user11 = new User(1, "doaa", "doaa@gmail.com", "1234", "122344", 33);
const note1 = new Note1(1, "hello Ts", "IM prictes on the oop in ts", user11, user11);
note1.displayAuthor();
//7-
//Generics– DataStorage(1Mark)
class Storage {
    item = [];
    addItem(item) {
        this.item.push(item);
    }
    removeItem(item) {
        this.item = this.item.filter(curentItem => curentItem !== item);
    }
    getAllInfo() {
        return this.item;
    }
}
const numberStorage = new Storage();
numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.addItem(30);
console.log(numberStorage.getAllInfo());
const stringStorage = new Storage();
stringStorage.addItem("Doaa");
stringStorage.addItem("Ahmed");
console.log(stringStorage.getAllInfo());
const userStorage = new Storage();
userStorage.addItem(user1);
console.log(userStorage.getAllInfo());
//# sourceMappingURL=index.js.map