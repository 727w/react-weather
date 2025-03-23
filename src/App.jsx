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
    <div className="bg-linear-to-b from-sky-900 to-sky-700 w-screen min-h-screen">
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ color: "#ffffff" }}
        />
      ) : (
        <div className="flex w-[90%] xl:w-[60%] h-[90%] justify-center items-start m-auto bg-white/20 backdrop-blur-md rounded-md mt-4 p-4 gap-4">
          {/* Kiri: MainInfo + Map */}
          <div className="w-1/2 flex flex-col gap-4 text-white">
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

            <WeatherMap
              lat={data.latitude}
              lon={data.longitude}
              location={data.resolvedAddress}
            />
          </div>

          {/* Kanan: Grid Cards */}
          <div className="pt-6 pr-6 w-1/2 grid grid-cols-2 gap-4">
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
        </div>
      )}
    </div>
  );
}

export default App;
