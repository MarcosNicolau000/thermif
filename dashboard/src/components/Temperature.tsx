import Image from "next/image";
import MeasurementCard from "./MeasurementCards";

export default function Temperature() {
  const temperature = 1 0;
  let bgImage =  "/normal-temperature-background.png";
  if (temperature < 20) {
    bgImage = "/cold-temperature-background.png";
  }

  return (
    <section className="relative w-full min-h-screen bg-repeat bg-cover bg-bottom flex-items items-center justify-center"
    style={{backgroundImage: `url(${bgImage})`}}>
      <div className="relative z-10">
       <MeasurementCard temperature={temperature} humidity={20}/>
      </div>
    </section>
  );
}
