"use client";

import MeasurementCard from "./MeasurementCards";
import { useState, useEffect, useMemo } from "react";
import { database } from "@/lib/firebaseConfig";
import { onValue, ref } from "firebase/database";
import LoadingPage from "./LoadingPage";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";



export default function Temperature() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tempRef = ref(database, "currentSensorData/temperature");
    const humRef = ref(database, "currentSensorData/humidity");
    const unsubTemp = onValue(tempRef, (snapshot) => {
      setTemperature(snapshot.exists() ? snapshot.val() : "N/A");
    });

    const unsubHum = onValue(humRef, (snapshot) => {
      setHumidity(snapshot.exists() ? snapshot.val() : "N/A");
      setLoading(false);
    });

    return () => {
      unsubTemp();
      unsubHum();
    };
  }, []);

  
   const bgImageTemperature = useMemo(() => {
    if (temperature == null) return "normal-temperature-background.png";
    if (temperature < 20) return "cold-temperature-background.png";
    if (temperature < 30) return "normal-temperature-background.png";
    return "hot-temperature-background.png";
  }, [temperature]);

  if (loading) return <LoadingPage />;

  return (
    <>
      {/* --- Transição suave de fundo --- */}
      <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgImageTemperature} // muda a key => anima a transição
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${bgImageTemperature})`,
            }}
          />
        </AnimatePresence>

        {/* Conteúdo sobreposto */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <MeasurementCard
            temperature={temperature ?? 0}
            humidity={humidity ?? 0}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
