import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [ws, setws] = useState<WebSocket | undefined>(undefined)
  const inputref = useRef<HTMLInputElement>(null)

  function sendMsg () {
    if(!ws) { return; }
    const message = inputref.current?.value
    //@ts-ignore
    ws.send(message)
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
    setws(ws)
  }, []);
  

  return (
    <div>
      <input type="text" placeholder='message..' ref={inputref} />
      <button onClick={sendMsg}>Send</button>
    </div>
  )
}

export default App
