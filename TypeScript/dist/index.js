"use strict";
//type for array
let arr = ["1", 2, 3, [1, 2, false]];
console.log(arr);
//tuple
let arr2 = [1, true];
console.log(arr2);
let arr3 = ["1", 2, 3, [1, 2, false]];
console.log(arr3);
//type for object
//interface
var SysRole;
(function (SysRole) {
    SysRole[SysRole["user"] = 0] = "user";
    SysRole[SysRole["Admin"] = 1] = "Admin";
    SysRole[SysRole["superAdmin"] = 2] = "superAdmin";
})(SysRole || (SysRole = {}));
let user1 = {
    username: {
        firstname: "Doaa",
        lastname: "Hesham",
    },
    email: "doaa@gmail.com",
    age: 22,
    role: SysRole.user
};
console.log(user1);
let user2 = {
    username: {
        firstname: "Doaa",
        lastname: "Hesham",
    },
    email: "doaa@gmail.com",
    age: 22,
    role: SysRole.Admin,
    getName: function () {
        if (user2.age >= 20) {
            console.log("okay");
        }
    },
};
console.log(user2);
user2.getName();
//
