import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port : 8080})

interface User {
    // type : "chat" | "join",  USER NEEDS TO COMPULSORILY SHARE THIS       
    // payload : {
    //     roomId? : any,
    //     message? : String
    socket : WebSocket, 
    room : string    
}


const allSockets: User[] = []

wss.on("connection", function(socket) {
    console.log("user connected")
    socket.on("message", (e) => {
        //@ts-ignore
        const response = JSON.parse(e)
        if(response.type === "join") {
            console.log("User wants to join room: ", response.payload.roomId)
            allSockets.push({
                socket,
                room : response.payload.roomId 
            })
        } 
        if(response.type === "chat"){
            console.log("User wants to send message: ", response.payload.message)
            const currentUserRoom = allSockets.find(x => x.socket == socket)?.room;
            console.log(typeof currentUserRoom)
            // let currentUserRoom = null;
            // for (let i = 0; i < allSockets.length; i++) {
            //     if (allSockets[i].socket == socket) {
            //         currentUserRoom = allSockets[i].room
            //     }
            // }
            for(let i = 0; i<allSockets.length; i++){
                if(allSockets[i].room == currentUserRoom){
                    allSockets[i].socket.send(response.payload.message);
                }
            }
        }
    })
})