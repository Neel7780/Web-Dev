import { useState, useEffect } from "react";

function App() {
  const [showclock, setshowclock] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setshowclock(prev => !prev)
      console.log("clock demounted")
    }, 5000);
  }, []);

  return (
    <div>
      {showclock && <Timer />}
    </div>
  );
}

function Timer(){
  const [timer, settimer] = useState(1)

  // Use the useEffect hook to update the timer state every second using setInterval
  useEffect(()=>{
    console.log("Clock is mounted")
    const clock = setInterval(()=>{
      settimer(prev=>prev+1)
    }, 1000)

    // Return a cleanup function that clears the interval when the component unmounts
    return function(){
      clearInterval(clock)
    }
  }, [])

  return(
    <div>
      {timer}
    </div>
  )
}

export default App;