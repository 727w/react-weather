export default function BtnContainer({ onClick }) {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Weather
      </button>
    </div>
  );
}