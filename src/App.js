import { useState } from "react";
import { FiSearch } from "react-icons/fi"
import "./style.css"
import api from "./services/api";

function App() {

  const [input, setinput] = useState("")
  const [cep, setCep] = useState({});

  async function handsearch() {
    if (input === "") {
      alert("Preencha algun CEP")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setinput("")
    }
    catch {
      alert("ops erro ao buscar aqui")
      setinput("")
    }
  }


  return (
    <div className="container">

      <h1 className="title">Encontre um endereço</h1>

      <div className="containerinput">
        <input type="text" placeholder="Digite seu CEP..." value={input} onChange={(e) => setinput(e.target.value)}></input>
        <button className="buttonsearch" onClick={handsearch}><FiSearch size={25} color='#000000'></FiSearch></button>
      </div>

      {Object.keys(cep).length > 0 && (  //Ultilizada pra ver se há algo dentro, se o tamanho for maios que zero vai mostrar as informacoes
        <main className='main'>
          <h2>CEP: {cep.cep} </h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade}- {cep.uf}</span>
        </main>
      )}

      
      <footer>
        <h1>Criado por: <a href="https://moonlit-tulumba-a47889.netlify.app/" target="blank">Francisco Lima</a></h1>
      </footer>

    </div>
  );
};

export default App;
