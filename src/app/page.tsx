'use client'
import { Toaster, toast } from 'sonner'
import { FaSistrix, FaHeart, FaAngleDown, FaAngleUp } from "react-icons/fa6";

const key = "2700b5defae477e83d3c60909f7c5276"


// Alimentar Dados
function dadosNaTela(dados){

  const resCidade = document.querySelector("#rescidade");
  const graus = document.querySelector("#graus");
  const tempo = document.querySelector("#tempo");
  const umidade = document.querySelector("#umidade");
  const icontempo = document.querySelector("#icontempo");
  const tmin = document.querySelector("#tmin");
  const tmax = document.querySelector("#tmax");

  if (resCidade) resCidade.innerHTML = `Previsão em ${dados.name}`;
  if (graus) graus.innerHTML = `${Math.floor(dados.main.temp)} °C`;
  if (tempo) tempo.innerHTML = dados.weather[0].description;
  if (umidade) umidade.innerHTML = `Umidade ${dados.main.humidity}%`;
  if (icontempo) icontempo.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
  if (tmin) tmin.innerHTML = `${Math.floor(dados.main.temp_min)} °C`;
  if (tmax) tmax.innerHTML = `${Math.floor(dados.main.temp_max)} °C`;

}


// Pegar Info Servidor
async function buscarCidade(cidade){
  
  const dados = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then( resposta => resposta.json())
  
  dadosNaTela(dados)
  console.log(dados)
}

// Pegar Cidade

function buscar(){
  const cidade = document.querySelector("#inpcidade")?.value
  
  if (cidade.length == 0){
        toast.error('Preencha o nome da cidade')
  }else{
    //alert("CIDADE OK")
    buscarCidade(cidade)
  }

  //

}

export default function Home() {
  return (

    
    <main className="w-screen h-screen flex-1 flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">

      <div id="conteudo" className="bg-slate-800/80 p-5 rounded-xl space-y-2 ">
        
        <div id="buscar" className="flex gap-3">
          <input id="inpcidade" type="text" placeholder="Digite o nome da cidade" className="border-none outline-none bg-slate-600/80 p-2 rounded-full text-slate-400"/>
          <button onClick={buscar} className="bg-slate-600/80 w-10 h-10 p-2 rounded-full flex items-center justify-center"><FaSistrix className="text-slate-400"/></button>
        </div>

        <div id="rescidade" className="text-slate-200 py-3">Previsão do tempo</div>
        <div className="flex justify-between col-span-5">
        <div></div>
          <div id="graus" className="text-slate-200 text-4xl font-semibold">00ºC</div>
          <div>
            <div id="min" className="text-slate-200 text-sm font-semibold flex items-center gap-1">MIN <FaAngleDown className="text-green-600"/></div>
            <div id="tmin" className="text-slate-200 text-xs font-semibold flex items-center justify-center">00ºC</div>
          </div>
          <div className="flex flex-col items-center">
            <div id="max" className="text-slate-200 text-sm font-semibold flex items-center gap-1">MAX <FaAngleUp className="text-red-600" /></div>
            <div id="tmax" className="text-slate-200 text-xs font-semibold flex items-center justify-center">00ºC</div>
          </div>
          <div></div>
        </div>
        <div id="status" className="flex items-center justify-between">
        <div></div>
          <div className="flex items-center">
            <img alt="icone info tempo" id="icontempo" src="https://openweathermap.org/img/wn/04n.png"></img>
            <p id="tempo" className="text-slate-200 text-sm font-semibold capitalize">Climão</p>
          </div>
          
          <p id="umidade" className="text-slate-200 text-xs font-semibold capitalize">Umidade: 00%</p>
          <div></div>
        </div>
        
      </div>        
      
      <div className="text-slate-800 text-xs font-semibold flex items-center gap-2 pt-2">feito com <FaHeart className="animate-pulse" /> por wDev</div>

    </main>
  );
}
