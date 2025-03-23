import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/Navbar";
import MainInfo from "./components/MainInfo";
import WeatherMap from "./components/Map";
import BtnContainer from "./components/BtnContainer";
import Card from "./components/Card";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("jakarta");
  const [unit, setUnit] = useState("F");
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
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchData(location);
    setLoading(true);
  }, [location]);

  const convertTemp = (tempF, unit) => {
    return unit === "C" ? ((tempF - 32) * 5) / 9 : tempF;
  };

  return (
    <div className="bg-gradient-to-b from-sky-900 to-sky-700 w-screen min-h-screen">
      <Navbar
        input={input}
        onChange={setInput}
        onSearch={() => setLocation(input)}
        button={<BtnContainer onClick={setUnit} />}
      />

      {loading ? (
        <FontAwesomeIcon
          icon={faSpinner}
          spinPulse
          size="2xl"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white"
        />
      ) : (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 w-[90%] xl:w-[60%] mx-auto bg-white/20 backdrop-blur-md rounded-md mt-4 p-4">
          {/* MainInfo di atas pada Mobile, kiri pada Desktop */}
          <div className="flex flex-col gap-y-2 w-full h-auto min-h-0">
            <MainInfo
              location={data.resolvedAddress}
              icon={data.currentConditions.icon}
              temp={convertTemp(data.currentConditions.temp, unit).toFixed(1)}
              cond={data.currentConditions.conditions}
              wind={data.currentConditions.windspeed}
              feel={convertTemp(data.currentConditions.feelslike, unit).toFixed(
                1
              )}
              uv={data.currentConditions.uvindex}
              visibility={data.currentConditions.visibility}
              press={data.currentConditions.pressure}
              unit={unit}
            />
          </div>

          {/* Grid Cards (Bawah MainInfo pada Mobile, Kanan di Desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
            <Card
              img={"visibility"}
              title={"Visibility"}
              data={data.currentConditions.visibility}
              unit={"km"}
            />
            <Card
              img={"pressure"}
              title={"Pressure"}
              data={data.currentConditions.pressure}
              unit={"mb"}
            />
            <Card
              img={"feels-like"}
              title={"Feels like"}
              data={convertTemp(data.currentConditions.feelslike, unit).toFixed(
                1
              )}
              unit={"°"}
            />
            <Card
              img={"humidity"}
              title={"Humidity"}
              data={data.currentConditions.humidity}
              unit={"%"}
            />
            <Card
              img={"wind-icon"}
              title={"Wind"}
              data={data.currentConditions.windspeed}
              unit={"km/h"}
            />
            <Card
              img={"uvindex"}
              title={"UV index"}
              data={data.currentConditions.uvindex}
              unit={""}
            />
          </div>

          {/* Peta selalu di bawah */}
          <div className="w-full">
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
