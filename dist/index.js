"use strict";
const user1 = {
    age: 20,
    username: "Neel",
    address: [{
            pincode: 390006
        }]
};
const user2 = {
    age: 20,
    username: "Anmol",
    address: [{
            pincode: 390006
        }]
};
function addSum(u1, u2) {
    return u1.age + u2.age;
}
const ans = addSum(user1, user2);
console.log(ans);
