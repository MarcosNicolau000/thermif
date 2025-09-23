import Image from "next/image";
import MeasurementCard from "./MeasurementCards";

export default function Temperature() {
  return (
    <section className="relative w-full min-h-screen bg-[url(/normal-temperature-background.png)] bg-repeat bg-cover bg-bottom flex-items items-center justify-center">
      <div className="relative z-10">
       <MeasurementCard/>
      </div>
    </section>
  );
}
