export interface PedidoSevicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean
}

export interface AlunosType {
    nome: string;
    endereco: string;
    contacto: string;
}

export interface ServicoType {
    nome: string,
    precoHora: number,
    categoria: string,
    minimoDescontado: number,
    percentagemDeconto: number
}

export interface ResponseType {
    status: boolean,
    message: string,
    data: ServicoType | null,
}

export interface AlunosType {
    nome: string;
    endereco: string;
    contacto: string;
}

export interface PrestadorType {
    nome: string;
    precoHora: number;
    profissao: string;
    minimoParaDesconto: number;
    percentagemDesconto: number;
    taxaDesconto: number;
}

export interface inserirType {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    created_at: string,
    updated_at: string
}

export interface ServicoDBType {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean;
    created_at: string,
    updated_at: string
}