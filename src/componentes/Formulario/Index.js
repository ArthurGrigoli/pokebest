import { useState } from "react"
import Botao from "../Botao/Index"
import CampoTexto from "../CampoTexto"
import ListaSuspensa from "../ListaSuspensa"
import "./Formulario.css"

const Formulario = (props) => {

 //   const regioes = [
 //       "Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea", "Dream Team" 
  //  ]

    const [nome, setNome] = useState("")
    const [tipo, setTipo] = useState("")
    const [imagem, setImagem] = useState("")
    const [time, setTime] = useState("")


    const aoSalvar = (evento) =>{
        evento.preventDefault()
        props.aoPokemonCadastrado({
            nome,
            tipo,
            imagem,
            time
        })
        setNome("")
        setTipo("")
        setImagem("")
        setTime("")
    }

    return (
        <section className="formulario">
            <form onSubmit={aoSalvar}>
                <h2>Bem vindo ao PokeBest! Aqui você pode criar seus times favoritos de cada região,
                     inclusive o seu time favorito! </h2>
                <h3>Preencha os dados para criar o card de seu pokemon</h3>
                <CampoTexto
                    obrigatorio={true}
                    label="Nome"
                    placeholder="Digite o nome do pokemon"
                    valor={nome}
                    aoAlterado={valor => setNome(valor)}
                 />
                <CampoTexto
                    obrigatorio={true}
                    label="Tipo"
                    placeholder="Digite o tipo"
                    valor = {tipo}
                    aoAlterado = {valor => setTipo(valor)}
                  />
                <CampoTexto
                    label="Imagem"
                    placeholder="Digite o endereço da imagem"
                    valor={imagem}
                    aoAlterado={valor => setImagem(valor)}
                 />
                 
                <ListaSuspensa 
                    obrigatorio={true}
                    label="Região"
                    itens={props.regiaoDoTime}
                    valor={time}
                    aoAlterado={valor => setTime(valor)}
                />
                <Botao>
                    Criar Card
                </Botao>
            </form>
        </section>
    )
}

export default Formulario