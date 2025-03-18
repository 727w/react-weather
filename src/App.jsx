import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const API_KEY = "NXTAFBRP54Z4P5BSJNHRZ4DSJ";

  useEffect(() => {
    if (!location) return;

    async function fetchData() {
      try {
        const data = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`,
          { mode: "cors" }
        );
        const result = await data.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [location]);

  return (
    <div className="bg-blue-400 w-screen h-screen">
      <Navbar
        input={input}
        onChange={setInput}
        onSearch={() => setLocation(input)}
      />
    </div>
  );
}

export default App;
