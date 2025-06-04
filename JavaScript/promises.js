// Promise ke andar wale function ka pehla argument will be same as .then(callback) ke andar wale function ka, in my codes it is callback (callback = resolve, just for example)


// Promise class implementation
class Promise{
    constructor(fn){
        // this.fn = fn
        // this.fn(() => {
        //     this.resolve();
        // })

        function afterdone(){
            this.resolve();
        }
        fn(afterdone)
    }
    then(cb){ // part where callback becomes same as resolve
        this.resolve = cb;
    }
}



// Promisified version of SetTimeout

// function settimePromisified(ms){
//     return new Promise(resolve => {setTimeout(resolve, ms);})
// }
// function callback(){
//     console.log("Promise succeded")
// }

// settimePromisified(5000).then(callback)





// create a promisified version of fs.readfile
// const fs = require("fs");

// function readfilePromisified(file){
//     return new Promise((resolve, reject)=>{
//         fs.readFile(file, "utf-8", (err, data) => {
//             if(err){
//                 reject(data)
//             }
//             else{
//                 resolve(data)
//             }
//         })
//     })
// }
// function callback(data){
//     console.log("Promise Succeded")
//     console.log(data)
// }

// readfilePromisified("a.txt").then(callback)

// In this, we dont use resolve but neither we can pass any file while calling the function for logging, we need to supply the file in the function where promise takes us.
// const fs = require("fs");

// function readThefile(callback_is_same_as_this){
//     fs.readFile("a.txt", "utf-8", function(err,data){
//         callback_is_same_as_this(data);
//     })
// }
// function readfilePromisified(){
//     return new Promise(readThefile)
// }

// const p = readfilePromisified()

// function callback(contents){

//     console.log("Promise Succeded")
//     console.log(contents)
// }

// p.then(callback)