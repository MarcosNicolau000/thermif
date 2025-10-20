'use client'

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";


export default function MeasurementCard(props: { temperature: number; humidity: number }) {
  let iconTemperature = "/hot-temperature-icon.png";
  if (props.temperature < 20) {
    iconTemperature = "/low-temperature-icon.svg";
  } else if (props.temperature < 30) {
    iconTemperature = "/medium-temperature-icon.svg";
  } else {
    iconTemperature = "/high-temperature-icon.svg";
  }
  return (
    <>
    <div className="flex flex-col mb-50">
      <div className="logo-container flex justify-center">
        <Image
          src="/thermif-logo.png"
          alt="ThermIF Logo"
          width={400}
          height={120}
          className="logo object-contain m-20 w-1/2 md:w-4/10 lg:w-3/10 xl:w-6/10"
          priority
        />
      </div>
      <div className="card mb-20 flex flex-col items-center justify-center sm:flex-row">
         {/* Temperatura */}
        <div className="measurement flex flex-col m-10 text-center sm:text-left">
          <div className="main-info flex items-center justify-center sm:justify-start">
            <AnimatePresence mode="wait">
              <motion.span
                key={props.temperature} // Anima quando muda
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-6xl font-semibold"
              >
                {props.temperature} °C
              </motion.span>
            </AnimatePresence>

            <Image
              src={iconTemperature}
              alt="Temperature Icon"
              width={300}
              height={300}
              className="inline-block w-16 h-16 ml-5 top-200"
              priority
            />
          </div>
          <p className="w-full text-justify text-lg mt-2 opacity-80">
            Temperatura Instantânea
          </p>
        </div>

        {/* Umidade */}
        <div className="measurement flex flex-col m-10 text-center sm:text-left">
          <div className="main-info flex items-center justify-center sm:justify-start">
            <AnimatePresence mode="wait">
              <motion.span
                key={props.humidity} // Anima quando muda
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-6xl font-semibold"
              >
                {props.humidity} %
              </motion.span>
            </AnimatePresence>

            <Image
              src="/humidity-icon.png"
              alt="Humidity Icon"
              width={300}
              height={300}
              className="inline-block w-16 h-16 ml-5 top-200"
              priority
            />
          </div>
          <p className="w-full text-justify text-lg mt-2 opacity-80">
            Umidade Relativa do Ar
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
