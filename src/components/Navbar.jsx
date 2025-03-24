import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ input, onChange, onSearch, button }) {
  return (
    <div className="w-full h-auto px-4 bg-white/10 backdrop-blur-xs flex justify-between items-center flex-wrap max-sm:justify-center max-sm:pb-4">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCloud} size="xl" className="text-white p-2" />
        <h1 className="text-2xl sm:text-3xl text-white font-bold">Weather</h1>
      </div>

      <div className="flex gap-2">{button}</div>

      <div className="w-full sm:w-auto flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter Location"
          className="flex-grow sm:w-auto p-2 text-white rounded-md border border-solid border-white focus:border-white focus:outline-none bg-transparent"
        />
        <button
          className="w-10 h-10 rounded-md bg-white/20 backdrop-blur-xs cursor-pointer"
          onClick={onSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" />
        </button>
      </div>
    </div>
  );
}
