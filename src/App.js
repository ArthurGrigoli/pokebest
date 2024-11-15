import { useState } from 'react';
import Banner from './componentes/Banner';
import CampoTexto from './componentes/CampoTexto';
import Formulario from './componentes/Formulario/Index';
import Time from './componentes/Time';

function App() {

  const times = [
    {
      nome : "Kanto",
      corPrimaria: "#3374ff",
      corSecundaria: "#ff3333"
    },
    {
      nome : "Johto",
      corPrimaria: "#f8cb50",
      corSecundaria: "#85c8eb"
    },
    {
      nome : "Hoenn",
      corPrimaria: "#c8340e",
      corSecundaria: "#2961ae"
    },
    {
      nome : "Sinnoh",
      corPrimaria: "#486189",
      corSecundaria: "#e7dee1"
    },
    {
      nome : "Unova",
      corPrimaria: "#000000",
      corSecundaria: "#9db6bb"
    },
    {
      nome : "Kalos",
      corPrimaria: "#647abe",
      corSecundaria: "#ef7c6e"
    },
    {
      nome : "Alola",
      corPrimaria: "#f4e45d",
      corSecundaria: "#5e3286"
    },
    {
      nome : "Galar",
      corPrimaria: "#06a0e6",
      corSecundaria: "#eb5777"
    },
    {
      nome : "Paldea",
      corPrimaria: "#9b2322",
      corSecundaria: "#7818b8"
    },
    {
      nome : "Dream Team",
      corPrimaria: "#dccf00",
      corSecundaria: "#1076b8"
    },
  ]

  const [pokemons, setPokemons] = useState([])

  const aoNovoPokemonAdicionado = (pokemon) =>{
    setPokemons([...pokemons, pokemon])
  }

  const aoExcluirPokemon = (nomePokemon) => {
    setPokemons(pokemons.filter((pokemon) => pokemon.nome !== nomePokemon));
  };

  return (
    <div className="App">
      <Banner/>
      <Formulario regiaoDoTime={times.map(time => time.nome)} aoPokemonCadastrado = {pokemon => aoNovoPokemonAdicionado(pokemon)}/>

      {times.map(time => (
        <Time 
          key={time.nome}
          nome={time.nome}
          corPrimaria={time.corPrimaria}
          corSecundaria={time.corSecundaria}
          pokemons={pokemons.filter(pokemon => pokemon.time === time.nome)}
          aoExcluirPokemon={aoExcluirPokemon} // Passar a função de exclusão aqui
        />
      ))}

    </div>
  );
}

export default App;
