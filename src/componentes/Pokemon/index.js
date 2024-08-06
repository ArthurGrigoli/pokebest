import "./Pokemon.css"

const Pokemon = (props) => {
    return(
        <div className="pokemon">
            <div className="cabecalho" style={{backgroundColor:props.corDeFundo}}>
                <img src={props.imagem}
                 alt={props.nome}/>
            </div>
            <div className="rodape">
                <h5>{props.nome}</h5>
                <h6>{props.tipo}</h6>
            </div>
        </div>
    )
}

export default Pokemon