import { useState } from "react";

export default function BtnContainer({ onClick }) {
  const [selectedUnit, setSelectedUnit] = useState("F");

  const handleClick = (unit) => {
    setSelectedUnit(unit);
    onClick(unit);
  };

  return (
    <div className="w-30 h-10 bg-white/20 backdrop-blur-xs rounded-md pt-1 m-4">
      <button
        onClick={() => handleClick("F")}
        className={`w-10 text-white text-2xl rounded-md font-bold mx-2 
          ${
            selectedUnit === "F" ? "bg-blue-400" : "bg-transparent"
          } active:bg-blue-500`}
      >
        °F
      </button>
      <button
        onClick={() => handleClick("C")}
        className={`w-10 text-white text-2xl rounded-md font-bold mx-2 
          ${
            selectedUnit === "C" ? "bg-blue-400" : "bg-transparent"
          } active:bg-blue-500`}
      >
        °C
      </button>
    </div>
  );
}
