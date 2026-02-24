interface PedidoSevico {
    cliente: string;
    descricao: string;
    horasEstimada: number;
    urgente: boolean
}

function Orcamento (pedidoServico: PedidoSevico, precoHora: number){
    const valorBase = precoHora * pedidoServico.horasEstimada
    let urgente = true
    let urgentePrice = 0
    urgente === true ? urgentePrice = valorBase * 0.30 : urgentePrice = 0
    let Orcamento = 0
    Orcamento = valorBase + urgentePrice
    return Orcamento
}