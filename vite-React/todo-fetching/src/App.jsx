import { useState, useEffect } from "react";

function App() {
  const [tab, setcurrentTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState({});

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let res = await fetch("https://jsonplaceholder.typicode.com/todos/" + tab);
      let response = await res.json();
      setdata(response);
      setLoading(false);
    }
    fetchData();
  }, [tab]);

  return (
    <div>
      <button onClick={() => setcurrentTab(1)}>Todo-1</button>
      <button onClick={() => setcurrentTab(2)}>Todo-2</button>
      <button onClick={() => setcurrentTab(3)}>Todo-3</button>
      <button onClick={() => setcurrentTab(4)}>Todo-4</button>
      <div>
        {loading ? "loading..." : `Title: ${data.title}`}
      </div>
    </div>
  );
}

export default App;