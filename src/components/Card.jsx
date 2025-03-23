export default function Card({ img, title, data, unit }) {
  const dataImg = `${import.meta.env.BASE_URL}/icon/${img}.png`;
  return (
    <div className="bg-white/10 backdrop-blur-xs rounded-md p-4">
      <p className="text-white">{title}</p>
      <img src={dataImg} alt="icon" />
      <p className="text-white text-center font-bold">{data} {unit}</p>
    </div>
  );
}
