import { useState } from "react";
import { PostComponent } from "./Post_Component";

function App() {
    const [posts, setposts] = useState([])

    function addPost(){
        setposts([...posts, {
            name : document.getElementById("title").value,
            subtitle : document.getElementById("subtitle").value,
            time : document.getElementById("time").value,
            image: document.getElementById("image").value,
            description: document.getElementById("description").value
        }])
    }

    const postComponents = posts.map((post) => (  // postComponents is array of components, map is converting array of objects to array of components
        <PostComponent
            name = {post.name}
            subtitle = {post.subtitle}
            time = {post.time}
            image = {post.image}
            description = {post.description} 
        />
    ))

    return (
        <div style={{ backgroundColor: "#dfe6e9", height: "100vh" }}>
            <div>
                <input id = "title" type="text" placeholder="Add your title"/>
                <input id = "subtitle" type="text" placeholder="Add your subtitle"/>
                <input id = "time" type="text" placeholder="Add your time"/>
                <input id = "image" type="text" placeholder="Add your image link"/>
                <input id = "description" type="text" placeholder="Add your description"/>

                <button onClick={addPost}>Add Post</button>
            </div>
            <div style={{display : "flex", justifyContent : "center"}}>
                <div>{postComponents}</div>
            </div>
        </div>
    );
}

export default App;