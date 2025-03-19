import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("jakarta");
  const API_KEY = "NXTAFBRP54Z4P5BSJNHRZ4DSJ";

  useEffect(() => {
    if (!location) return;

    async function fetchData(location) {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`,
          { mode: "cors" }
        );
        const result = await response.json();
        setData(result);
        setLoading(false);
        console.log(result);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchData(location);
  }, [location]);

  return (
    <div className="bg-blue-400 w-screen h-screen">
      <Navbar
        input={input}
        onChange={setInput}
        onSearch={() => setLocation(input)}
      />
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spinPulse size="2xl" />
      ) : (
        <div className="text-white">
          <h1 className="text-4xl font-bold">{data.resolvedAddress}</h1>
          <h2 className="text-2xl">{data.currentConditions.icon}</h2>
          <h3 className="text-xl">{data.currentConditions.temp}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
