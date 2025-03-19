import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import MainInfo from "./components/MainInfo";
import WeatherMap from "./components/Map";

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
    setLoading(true);
  }, [location]);

  return (
    <div className="bg-blue-400 w-screen h-screen">
      <Navbar
        input={input}
        onChange={setInput}
        onSearch={() => setLocation(input)}
      />
      {loading ? (
        <FontAwesomeIcon
          icon={faSpinner}
          spinPulse
          size="2xl"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ color: "#ffffff" }}
        />
      ) : (
        <div className="flex w-full justify-center items-center">
          <div className="w-1/2 text-white">
            <MainInfo
              location={data.resolvedAddress}
              icon={data.currentConditions.icon}
              temp={data.currentConditions.temp}
              cond={data.currentConditions.conditions}
              wind={data.currentConditions.windspeed}
              feel={data.currentConditions.feelslike}
              uv={data.currentConditions.uvindex}
              visibility={data.currentConditions.visibility}
              press={data.currentConditions.pressure}
            />
          </div>
          <div className="flex-1 w-1/2">
            <WeatherMap
              lat={data.latitude}
              lon={data.longitude}
              location={data.resolvedAddress}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
