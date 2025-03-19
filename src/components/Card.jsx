export default function Card({ data }) {
  return (
    <div className="bg-white/10 backdrop-blur-xs rounded-md p-4">
      {data}
    </div>
  );
}