interface ServicoType {
    nome: string,
    precoHora: number,
    categoria: string,
    minimoDescontado: number,
    percentagemDeconto: number
}

let catagoriaServicos: ServicoType [] = []

export function adicionarServico(novoservico: ServicoType){
    if (novoservico.nome  && novoservico.precoHora <= 0) {
        return "Erro: Nome obrigatório e preço deve ser maio que zero."
    }

    for (let i = 0; 1 <catagoriaServicos.length; i++){
        if (catagoriaServicos[i]?.nome === novoservico.nome){
            return `Erro: O seviço ${novoservico.nome} já existe.`
        }
    }

    catagoriaServicos.push(novoservico);
    return ({
        status: true ,
        message: "Sucesso: Serviço adicionado!",
        data: novoservico
    })
}