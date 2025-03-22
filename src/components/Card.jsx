export default function Card({ img, title, data }) {
  const dataImg = `/public/icon/${img}.png`;
  return (
    <div className="bg-white/10 backdrop-blur-xs rounded-md p-4">
      <p>{title}</p>
      <img src={dataImg} alt="icon" />
      <p>{data}</p>
    </div>
  );
}
