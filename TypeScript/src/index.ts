interface User{
    age :  number,
    username : string,
    address : Address[]
}

interface Address{
    city? : string,
    state? : string,
    pincode : number
}

const user1: User = {
    age : 20,
    username : "Neel",
    address : [{
        pincode : 390006
    }]
}

const user2: User = {
    age : 20,
    username : "Anmol",
    address : [{
        pincode : 390006
    }]
}

function addSum(u1: User, u2:User){
    return u1.age + u2.age;
}

const ans = addSum(user1, user2);
console.log(ans)