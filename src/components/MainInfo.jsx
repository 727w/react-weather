import Text from "./TextContainer";

export default function MainInfo({
  location,
  icon,
  temp,
  cond,
  wind,
  feel,
  uv,
  visibility,
  press,
  unit
}) {
  const iconPath = `/icon/${icon}.png`;

  return (
    <div className="w-[80%] bg-white/10 backdrop-blur-xs rounded-md p-4 m-6 flex flex-col flex-wrap">
      <p>{location}</p>
      <div className="flex flex-wrap gap-4 items-center">
        <img src={iconPath} alt="icon" className="w-25 h-25" />
        <div className="w-50">
          <h1 className="text-4xl font-bold">
            {temp}°{unit}
          </h1>
          <h2 className="text-xl">{cond}</h2>
        </div>
      </div>
      <div className="flex flex-wrap">
        <Text title={"Wind"} data={wind} unit={"km/h"} />
        <Text title={"Feels like"} data={feel} unit={"°"} />
        <Text title={"UV index"} data={uv} />
        <Text title={"Visibility"} data={visibility} unit={"km"} />
        <Text title={"Pressure"} data={press} unit={"mb"} />
      </div>
    </div>
  );
}
