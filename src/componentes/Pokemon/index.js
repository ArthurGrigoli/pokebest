import "./Pokemon.css";

const Pokemon = (props) => {
  return (
    <div className="pokemon">
      <div className="cabecalho" style={{ backgroundColor: props.corDeFundo }}>
        <button onClick={props.aoExcluir} className="botao-excluir" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/imagens/Xicon.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            width: "20px",
            height: "20px",
            border: "none",
            padding: "0",
            margin: "0",
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
          }} />
        <img src={props.imagem} alt={props.nome} />
      </div>
      <div className="rodape">
        <h5>{props.nome}</h5>
        <h6>{props.tipo}</h6>
      </div>
    </div>
  );
};

export default Pokemon;


