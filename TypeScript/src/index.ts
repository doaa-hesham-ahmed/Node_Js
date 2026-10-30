//type for array
let arr:(number|string|(boolean|number)[])[] = ["1",2,3,[1,2,false]]
console.log(arr)
//tuple
let arr2 : [number,boolean] = [1,true]
console.log(arr2)

//type for primitive
type TArr = (number|string|(boolean|number)[])[];
let arr3:TArr = ["1",2,3,[1,2,false]];
console.log(arr3)
//type for object
//interface
enum SysRole{
    user,
    Admin,
        superAdmin,
}
interface IUser {
    username:{
        firstname:string,
        lastname:string,
    },
    email:string,
    age?:number,
    role:SysRole,

    getName?:()=>void|undefined,
}
let user1 :IUser = {
    username:{
        firstname:"Doaa",
        lastname:"Hesham",
    },
    email:"doaa@gmail.com",
    age:22,
    role:SysRole.user
}
console.log(user1)
let user2 :IUser = {
    username:{
        firstname:"Doaa",
        lastname:"Hesham",
    },
    email:"doaa@gmail.com",
    age:22,
    role:SysRole.Admin,
    getName: function () {
        if (user2.age !>= 20) {
            console.log("okay");
        }
    },
};
console.log(user2);
user2.getName();
//