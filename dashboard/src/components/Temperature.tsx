"use client";

import { useSensorData } from "@/hooks/useSensorData";
import MeasurementCard from "./MeasurementCards";

export default function Temperature() {
  const { temperature, humidity, bgImageTemperature } = useSensorData();

  return (
    <section
      className="relative w-full min-h-screen bg-repeat bg-cover bg-bottom flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImageTemperature})` }}
    >
      <div className="relative z-10">
        <MeasurementCard temperature={temperature} humidity={humidity} />
      </div>
    </section>
  );
}
