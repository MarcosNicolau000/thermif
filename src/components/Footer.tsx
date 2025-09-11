import { table } from "console";

export default function Footer() {
  return (
    <footer className="bg-blue-100 pt-8 pb-8 pr-5 pl-5">
      <a className="">O ThermIF é um sistema de monitoramento ambiental que coleta dados de temperatura e umidade por meio de microcontroladores e sensores IoT, exibindo-os em tempo real em um LCD físico junto ao sensor e enviando-os simultaneamente para o Firebase Cloud. Esses dados também podem ser acompanhados remotamente em um dashboard web responsivo desenvolvido em React.</a>
    </footer>
  );
}
