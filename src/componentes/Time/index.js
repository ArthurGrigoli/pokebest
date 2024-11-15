import "./Time.css";
import Pokemon from "../Pokemon";

const Time = (props) => {
  const css = { backgroundColor: props.corSecundaria };

  const aoExcluir = (nomePokemon) => {
    props.aoExcluirPokemon(nomePokemon);
  };

  return (
    props.pokemons.length > 0 && (
      <section className="time" style={css}>
        <h4 style={{ borderColor: props.corPrimaria }}>{props.nome}</h4>
        <div className="pokemons">
          {props.pokemons.map((pokemon) => (
            <Pokemon
              corDeFundo={props.corPrimaria}
              key={pokemon.nome}
              nome={pokemon.nome}
              tipo={pokemon.tipo}
              imagem={pokemon.imagem}
              aoExcluir={() => aoExcluir(pokemon.nome)}
            />
          ))}
        </div>
      </section>
    )
  );
};

export default Time;
