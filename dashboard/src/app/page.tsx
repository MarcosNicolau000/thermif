import Footer from "../components/Footer";
import MeasurementCard from "@/components/MeasurementCards";
import Temperature from "@/components/Temperature";

export default function Home() {
  return (
    <>
      <div>
        <Temperature />
      </div>
      <Footer />
    </>
  );
}
