import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ input, onChange, onSearch }) {
  return (
    <div className="w-full h-16 bg-white/10 backdrop-blur-xs flex justify-between items-center">
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faCloud}
          size="xl"
          style={{ color: "#ffffff" }}
          className="p-4"
        />
        <h1 className="text-3xl text-white font-bold">Weather</h1>
      </div>
      <div className="px-6">
        <input
          type="text"
          value={input}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter Location"
          className="p-2 text-white rounded-md border border-solid border-white focus:border-white focus:outline-none"
        />
        <button
          className="w-10 h-10 ml-2 rounded-md bg-white/20 backdrop-blur-xs cursor-pointer"
          onClick={onSearch}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#ffffff" }}
          />
        </button>
      </div>
    </div>
  );
}
