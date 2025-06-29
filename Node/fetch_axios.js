const axios = require('axios');

// async function fetchPosts() {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
//     const json = await res.json();
//     document.getElementById("posts").innerHTML = json.title;
// }

async function axiosPosts() {
    const response = await axios({
        url  : "https://httpdump.app/dumps/065f4637-290c-49c4-8eaa-67acfe617e2c",
        method : "GET",
        data : {
            "username" : "Neel"
        },
        headers : {
            Authorization : "Header 123"
        }
    })
    console.log(response.data)
}

axiosPosts();