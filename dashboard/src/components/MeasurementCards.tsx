let temperatura = 35;
let umidade = 20;

export default function MeasurementCard() {
  return (
    <>     
        <div className="logo-container flex justify-center">
            <img className="logo" src="/thermif-logo.png" alt="ThermIF Logo" />
        </div>
        <div className="card flex flex-row justify-around mt-10 p-10 max-w-full">
            <div className="measurement">
                <span className="text-6xl">{temperatura}°C</span>
                <img src="/hot-temperature-icon.png" alt="Temperature Icon" className="inline-block w-16 h-16 ml-5"/>
                <p>Temperatura Instantânea</p>
            </div>
            <div className="measurement">
                <span className="text-6xl">{umidade}%</span>
                <img src="/humidity-icon.png" alt="Humidity Icon" className="inline-block w-16 h-16 ml-5"/>
                <p>Umidade Relativa do Ar</p>
            </div>
        </div>
            
        
    </>
  );
}
