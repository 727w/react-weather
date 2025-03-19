export default function Text({ title, data, unit }) {
  return (
    <>
      <span className="text-gray-300 m-2"> {title}
        <p className="text-white font-bold">{data} {unit}</p>
      </span>
    </>
  );
}
