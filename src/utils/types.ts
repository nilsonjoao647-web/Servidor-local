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

export interface userType {
    id: string,
    nome: string,
    numero_identificado: string,
    data_nascimento: string,
    email: string,
    telefone: string,
    pais: string,
    localidade: string,
    password: string;
    enabled: boolean;
    created_at: string;
    updated_at: string
}

export interface orcamentoType {
    id: string,
    total: string,
    id_utilizadores: string,
    enabled: boolean,
    created_at: string
    update_at: string
}

export interface propostaType {
    id: string,
    id_prestacao_servico: string,
    preco_hora: string,
    hora_estimadas: string,
    estado: string,
    created_at: string,
    update_at: string
}

export interface prestadorType {
    id: string,
    nif: number,
    profissao: string,
    taxa_urgencia: string,
    minimo_desconto: string,
    percentagem_desconto: string,
    disponivel: string,
    enabled: boolean,
    created_at: string,
    update_at: string
}

export interface prestacaoServicoType {
    id: string,
    designacao: string,
    subtotal: string,
    horas_estimadas: string,
    id_prestador: string,
    id_servico: string,
    preco_hora: string,
    estado: string,
    id_orcamento: string,
    enabled: boolean,
    created_at: string,
    update_at: string
}

export interface PropostaDBType {
    id: string,
    id_prestacao_servico: string,
    preco_hora: number | string,
    hora_estimadas?: number | string,
    estado: string | number,
    enabled: boolean,
    created_at: string,
    update_at: string
}

export enum EstadoProposta {
    PENDENTE = "pendente",
    ACEITE = "aceite",
    CANCELADO = "cancelado"
}

export enum EstadoPrestacaoServico {
    PENDENTE = "pendente",
    FINALIZADO = "finalizado",
    EM_PROGRESSO = "em_progresso",
    CANCELADO = "cancelado"
}