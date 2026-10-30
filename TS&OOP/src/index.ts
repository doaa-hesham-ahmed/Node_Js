//1-
// BaseClass–User(1Mark)
class User {
    public id:number;
    public name:string;
    public email:string;
    private password:string;
    protected phone:string;
    private age:number;
    constructor(id:number,name:string,email:string,password:string,phone:string,age:number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password=password;
        this.phone=phone;
        this.age=age ;
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }


    }
    displayInfo():void{
        console.log(`userId : ${this.id} userName: ${this.name} email: ${this.email} password:${this.password} userPhone: ${this.phone} userAge: ${this.age}`)
        console.log("------------------------------------------------------------------");
    }
}

const user1 = new User(1,"Doaa","doaa@gmail.com","123","01121511177",22);
user1.displayInfo();

//2-
//Inheritance– AdminUser(1Mark)
class Admin extends User {
    constructor(id:number,name:string,email:string,password:string,phone:string,age:number) {
        super(id,name,email,password,phone,age);
    }
    public mangeNote():void {
        console.log("Admin can manage notes")
        console.log("------------------------------------------------------------------");
    }
}
const admin1 = new Admin(2,"mera","mera@gmail.com","123","01233",24);
admin1.mangeNote();
admin1.displayInfo();
console.log("------------------------------------------------------------------");

//3-
//Class- Note(1 Mark)
//
class Note {
   public id:number;
    public title:string;
    public content:string;
    public userId:User;
    constructor(id:number , title:string , content:string ,userId:User) {
        this.id=id;
        this.title=title;
        this.content=content;
        this.userId = userId;
    }
    public preview():string {
        return `content: ${this.content}`;
    }
}
const note = new Note(1,"hello Ts","IM prictes on the oop in ts",user1)
console.log(note.preview());
console.log("----------------------------------------------------");

//4-
//Composition–NoteBookandNotes(1Mark)

class NoteBook {
    private notes:Note[] = [];
    public addNote(notes:Note):void{
        this.notes.push(notes)
        console.log("notes Adding successfully ........")
    }
    public removeNote(noteId:number):void{
        this.notes=this.notes.filter(note => note.id !== noteId)
        console.log("notes Removed successfully ........")
    }
    public displayNote():void{
        this.notes.forEach(note =>{
            console.log(note.title);
            console.log(note.preview());
        })
    }
}

const noteBook = new NoteBook();
noteBook.addNote(note);
noteBook.displayNote()
console.log("-------------------------------------------------");
noteBook.removeNote(1);

//5-
// Aggregation–UserandNotebook(1Mark)
class Userr {
    public id:number;
    public name:string;
    public email:string;
    private password:string;
    protected phone:string;
    private age:number;

    private notebook: NoteBook[]=[];
    constructor(id:number,name:string,email:string,password:string,phone:string,age:number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password=password;
        this.phone=phone;
        this.age=age ;
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }
    }

    public AddNoteBook(notebook:NoteBook):void{
          this.notebook.push(notebook);
        console.log("noteBook Adding successfully ......");
    }
    public displayNoteBook(notebook:NoteBook):void{
        this.notebook.forEach((notebook,index) => {
            console.log(`notebook: ${index +1}`)
        });
        console.log("noteBook Adding successfully ......");
    }
    public displayInfo():void{
        console.log(`userId : ${this.id} userName: ${this.name} email: ${this.email}`)
        console.log("------------------------------------------------------------------");
    }
}

console.log("---------------------------------------")

const userr1 = new Userr(1,
    "Doaa",
    "doaa@gmail.com",
    "123456",
    "01012345678",
    22);
const notebook1 = new NoteBook();
const notebook2 = new NoteBook();
userr1.AddNoteBook(notebook1);
userr1.AddNoteBook(notebook2);
userr1.displayInfo();

//6-
//Association– Note andUser(1Mark)
class Note1 {
    public id:number;
    public title:string;
    public content:string;
    public userId:User;
    private author : User;
    constructor(id:number , title:string , content:string ,userId:User,author:User) {
        this.id=id;
        this.title=title;
        this.content=content;
        this.userId = userId;
        this.author=author;
    }
    public preview():string {
        return `content: ${this.content}`;
    }
    public displayAuthor():void {
        console.log(`Author: ${this.author.name}`)
    }
}
const user11 =new User(1,"doaa","doaa@gmail.com","1234","122344",33);
const note1 = new Note1(1,"hello Ts","IM prictes on the oop in ts",user11,user11);

note1.displayAuthor();


//7-
//Generics– DataStorage(1Mark)
class Storage<T>{
    private item: T[]=[];

    public addItem(item:T):void{
        this.item.push(item);
    }

    public removeItem(item:T):void{
       this.item = this.item.filter(curentItem=> curentItem !== item);
    }
    public getAllInfo():T[]{
      return this.item;
}
}


const numberStorage = new Storage<number>();
numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.addItem(30);
console.log(numberStorage.getAllInfo());


const stringStorage = new Storage<string>();
stringStorage.addItem("Doaa");
stringStorage.addItem("Ahmed");


console.log(stringStorage.getAllInfo());


const userStorage = new Storage<User>();
userStorage.addItem(user1);
console.log(userStorage.getAllInfo());



