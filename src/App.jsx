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
        console.log(result);
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
    <div className="bg-linear-to-b from-sky-900 via-sky-700 to-sky-500 min-w-screen min-h-screen">
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
        <div className="grid grid-cols-2 w-full xl:w-[60%] h-[90%] justify-center items-start m-auto bg-white/20 backdrop-blur-md rounded-md mt-4 p-4 gap-4 max-xl:w-[90%] max-xs:w-[90%] max-sm:grid-cols-1">
          {/* Kiri: MainInfo + Map */}
          <div className="flex flex-col text-white grid-cols-2 grid-rows-2">
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

            <div className="max-sm:flex max-sm:justify-center">
              <WeatherMap
                lat={data.latitude}
                lon={data.longitude}
                location={data.resolvedAddress}
              />
            </div>
          </div>

          {/* Kanan: Grid Cards */}
          <div className="pt-6 pr-6 w-full grid grid-cols-2 gap-4 max-sm:px-[10%]">
            <div className="grid-cols-1">
              <Card
                img={"visibility"}
                title={"Visibility"}
                data={data.currentConditions.visibility}
                unit={"km"}
              />
            </div>
            <div className="grid-cols-1">
              <Card
                img={"pressure"}
                title={"Pressure"}
                data={data.currentConditions.pressure}
                unit={"mb"}
              />
            </div>
            <div className="grid-cols-1">
              <Card
                img={"feels-like"}
                title={"Feels like"}
                data={convertTemp(
                  data.currentConditions.feelslike,
                  unit
                ).toFixed(1)}
                unit={"°"}
              />
            </div>
            <div className="grid-cols-1">
              <Card
                img={"humidity"}
                title={"Humidity"}
                data={data.currentConditions.humidity}
                unit={"%"}
              />
            </div>
            <div className="grid-cols-1">
              <Card
                img={"wind-icon"}
                title={"Wind"}
                data={data.currentConditions.windspeed}
                unit={"km/h"}
              />
            </div>
            <div className="grid-cols-1">
              <Card
                img={"uvindex"}
                title={"UV index"}
                data={data.currentConditions.uvindex}
                unit={""}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
