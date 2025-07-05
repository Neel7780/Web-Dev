import { useEffect, useRef, useState } from 'react'
// import { WebSocket } from 'ws'
import './App.css'

function App() {
  const [messages, setMessages] = useState(["hi there"])
  const inputRef = useRef<HTMLInputElement>(null)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080")
    ws.onmessage = (event) => {
      const message = typeof event.data === "string" ? event.data : JSON.stringify(event.data);
      setMessages(m => [...m, message])
    }
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type : "join",
        payload : {
          roomId : "red"
        } 
      }))
    }
  }, [])

  function sendMsg () {
    const msg = inputRef.current?.value;
    wsRef.current?.send(JSON.stringify({
      type : "chat",
      payload : {
        message : msg
      }
    }))
  }

  return (
    <div>
      <div className='bg-black h-screen flex justify-center items-center'>
        <div className='flex flex-col w-2/8 h-3/5 rounded-2xl border border-white justify-between'>
          <div className='flex-1 flex flex-col overflow-y-auto'>
              {messages.map((m, i) => (
                <div className='bg-white rounded-2xl p-4 m-4 self-start inline-block w-auto max-w-full' key={i}>{m}</div>
              ))}
          </div>
          <div className='bg-white rounded-2xl p-4 m-4'>
            <input type="text" placeholder='Message' className='text-black outline-0' ref={inputRef} />
            <button className='bg-black text-white w-16 rounded-2xl h-8 text-sm ml-4' onClick={sendMsg} >Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

