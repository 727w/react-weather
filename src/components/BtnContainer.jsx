import { useState } from "react";

export default function BtnContainer({ onClick }) {
  const [selectedUnit, setSelectedUnit] = useState("F");

  const handleClick = (unit) => {
    setSelectedUnit(unit);
    onClick(unit);
  };

  return (
    <div className="w-30 h-10 bg-white/20 backdrop-blur-xs rounded-md p-0.5 m-4">
      <button
        onClick={() => handleClick("F")}
        className={`w-10 h-9 text-white text-xl rounded-md font-bold mx-2 
          ${
            selectedUnit === "F" ? "bg-sky-800" : "bg-transparent"
          } active:bg-sky-900`}
      >
        °F
      </button>
      <button
        onClick={() => handleClick("C")}
        className={`w-10 h-9 text-white text-xl rounded-md font-bold mx-2 
          ${
            selectedUnit === "C" ? "bg-sky-800" : "bg-transparent"
          } active:bg-sky-900`}
      >
        °C
      </button>
    </div>
  );
}
