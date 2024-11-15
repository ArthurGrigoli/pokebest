import { useState, useEffect } from "react";
import axios from "axios";
import Botao from "../Botao/Index";
import ListaSuspensa from "../ListaSuspensa";
import CampoTexto from "../CampoTexto";
import "./Formulario.css";

const Formulario = (props) => {
  const [regiao, setRegiao] = useState("");
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState([]);
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [tipo, setTipo] = useState("");
  const [formas, setFormas] = useState([]);
  const [formaSelecionada, setFormaSelecionada] = useState("");

  // Mapeamento entre região e geração de pokémons
  const regioesParaGeracoes = {
    Kanto: 1,
    Johto: 2,
    Hoenn: 3,
    Sinnoh: 4,
    Unova: 5,
    Kalos: 6,
    Alola: 7,
    Galar: 8,
    Paldea: 9,
  };

  // Mapeamento de tipos de pokémon do inglês para o português
  const tiposEmPortugues = {
    bug: "Inseto",
    dark: "Sombrio",
    dragon: "Dragão",
    electric: "Elétrico",
    fairy: "Fada",
    fighting: "Lutador",
    fire: "Fogo",
    flying: "Voador",
    ghost: "Fantasma",
    grass: "Grama",
    ground: "Terrestre",
    ice: "Gelo",
    normal: "Normal",
    poison: "Venenoso",
    psychic: "Psíquico",
    rock: "Pedra",
    steel: "Aço",
    water: "Água",
  };

  // Função para capitalizar a primeira letra de uma string
  const capitalizarPrimeiraLetra = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Atualizar a lista de pokémons ao selecionar uma região
  useEffect(() => {
    if (regiao && regioesParaGeracoes[regiao]) {
      const geracao = regioesParaGeracoes[regiao];
      axios
        .get(`https://pokeapi.co/api/v2/generation/${geracao}`)
        .then((response) => {
          const pokemons = response.data.pokemon_species.map((pokemon) => ({
            nome: capitalizarPrimeiraLetra(pokemon.name),
          }));
          setPokemonsFiltrados(pokemons);
        })
        .catch((error) => {
          console.error("Erro ao buscar pokémons:", error);
        });
    }
  }, [regiao]);

  // Buscar as formas do pokémon ao selecionar o nome
  useEffect(() => {
    if (nome) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${nome.toLowerCase()}`)
        .then((response) => {
          const varieties = response.data.varieties;
          if (varieties.length > 1) {
            setFormas(varieties);
          } else {
            buscarDetalhesPokemon(varieties[0].pokemon.name);
            setFormas([]);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar espécies do pokémon:", error);
        });
    }
  }, [nome]);

  // Buscar os detalhes da forma selecionada
  useEffect(() => {
    if (formaSelecionada) {
      buscarDetalhesPokemon(formaSelecionada);
    }
  }, [formaSelecionada]);

  // Função para buscar os detalhes do pokémon, incluindo tipo e imagem
  const buscarDetalhesPokemon = (nomePokemon) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${nomePokemon.toLowerCase()}`)
      .then((response) => {
        const tipos = response.data.types.map((typeInfo) => {
          const tipoIngles = typeInfo.type.name;
          return tiposEmPortugues[tipoIngles] || tipoIngles;
        });
        setTipo(tipos.join(", "));

        setImagem(response.data.sprites.front_default);
      })
      .catch((error) => {
        console.error("Erro ao buscar tipos e imagem do pokémon:", error);
      });
  };

  const aoSalvar = (evento) => {
    evento.preventDefault();
    props.aoPokemonCadastrado({
      nome,
      tipo,
      imagem,
      time: regiao,
    });
    setNome("");
    setTipo("");
    setImagem("");
    setRegiao("");
    setFormas([]);
    setFormaSelecionada("");
  };

  return (
    <section className="formulario">
      <form onSubmit={aoSalvar}>
        <h2>Bem vindo ao PokeBest! Aqui você pode criar seus times favoritos de cada região, inclusive o seu time favorito! </h2>
        <h3>Preencha os dados para criar o card de seu pokemon</h3>
        
        <ListaSuspensa
          obrigatorio={true}
          label="Região"
          itens={props.regiaoDoTime}
          valor={regiao}
          aoAlterado={(valor) => setRegiao(valor)}
        />

        <ListaSuspensa
          obrigatorio={true}
          label="Pokémon"
          itens={pokemonsFiltrados.map((pokemon) => pokemon.nome)}
          valor={nome}
          aoAlterado={(valor) => setNome(valor)}
        />

        {formas.length > 1 && (
          <ListaSuspensa
            obrigatorio={true}
            label="Forma"
            itens={formas.map((forma) => capitalizarPrimeiraLetra(forma.pokemon.name))}
            valor={formaSelecionada}
            aoAlterado={(valor) => setFormaSelecionada(valor)}
          />
        )}

        <CampoTexto
          obrigatorio={true}
          label="Tipo"
          valor={tipo}
          aoAlterado={() => {}}
          desabilitado={true}
        />

        <Botao>Criar Card</Botao>
      </form>
    </section>
  );
};

export default Formulario;


