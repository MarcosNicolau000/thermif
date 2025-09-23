
import Image from "next/image";

export default function MeasurementCard(props) {
    const temperature = props.temperature;
    const humidity = props.humidity;
    return (
    
    <>     
    <div className="logo-container flex justify-center">
      <Image
        src="/thermif-logo.png"
        alt="ThermIF Logo"
        width={400}
        height={120}
        className="logo object-contain m-20 w-1/2 md:w-4/10 lg:w-3/10 xl:w-2/10"
        priority
      />
        </div>
        <div className="card mb-20 flex flex-col items-center justify-around sm:flex-row">
            <div className="measurement flex flex-col mt-20">
                <div className="main-info flex items-center">
                    <span className="text-6xl">{temperature} °C</span>
                    <Image
                      src="/hot-temperature-icon.png"
                      alt="Temperature Icon"
                      width={300}
                      height={300}
                      className="inline-block w-16 h-16 ml-5 top-200"
                      priority
                    />
                </div>
                <p className="w-full text-justify text-lg mt-2">Temperatura Instantânea</p>
            </div>
            <div className="measurement flex flex-col mt-20">
                <div className="main-info flex items-center">
                    <span className="text-6xl">{humidity} %</span>
                    <Image
                      src="/humidity-icon.png"
                      alt="Temperature Icon"
                      width={300}
                      height={300}
                      className="inline-block w-16 h-16 ml-5 top-200"
                      priority
                    />
                </div>
                <p className="w-full text-justify text-lg mt-2">Umidade Relativa do Ar</p>
            </div>
        </div>
            
    </>
  );
}
