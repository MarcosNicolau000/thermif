"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebaseConfig";

export function useSensorData() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  let iconTemperature = "";
  let bgImageTemperature = "";
  let footerTemperature = "";

  useEffect(() => {
    const temperatureRef = ref(database, "currentSensorData/temperature");
    const humidityRef = ref(database, "currentSensorData/humidity");

    const unsubscribeTemperature = onValue(temperatureRef, (snapshot) => {
      if (snapshot.exists()) {
        const temp = snapshot.val();
        setTemperature(temp);

        if (temp < 20) {
          bgImageTemperature = "../";
          footerTemperature = ""
        } else if (temp < 30) {
          bgImageTemperature = "/normal-temperature-background.png";
        } else {
          iconTemperature = "/hot-temperature-icon.png";
        }
      } else {
        setTemperature(":(");
      }
    });

    const unsubscribeHumidity = onValue(humidityRef, (snapshot) => {
      setHumidity(snapshot.exists() ? snapshot.val() : "Algo deu errado.");
    });

    return () => {
      unsubscribeTemperature();
      unsubscribeHumidity();
    };
  }, []);

  return { temperature, humidity, bgImageTemperature, iconTemperature, footerTemperature };
}
