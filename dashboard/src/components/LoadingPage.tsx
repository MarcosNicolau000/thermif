"use client";
import { Zoomies } from "ldrs/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import "ldrs/react/Zoomies.css";

export default function LoadingPage() {
  const [size, setSize] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // tamanho proporcional à tela
      const newSize = Math.min(Math.max(width * 0.3, 200), 450);
      setSize(newSize);
    };

    handleResize(); // inicializa
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className="flex flex-col items-center justify-center relative w-full min-h-screen bg-black">
        <div className="logo-container flex justify-center">
          <Image
            src="/thermif-logo-white.png"
            alt="ThermIF Logo"
            width={800}
            height={120}
            className="logo object-contain m-20 w-1/2 md:w-4/10 lg:w-3/10 xl:w-6/10"
            priority
          />
        </div>
        <Zoomies
          size={size}
          stroke="5"
          bgOpacity="0.1"
          speed="1.4"
          color="white"
        />
      </section>
    </>
  );
}
