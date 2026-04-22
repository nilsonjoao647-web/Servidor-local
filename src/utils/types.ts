export enum Role {
    CLIENTE = "cliente",
    ADMIN = "admin",
    PRESTADOR = "prestador",
    EMPRESA = "empresa"
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

export enum TipoPrestador {
    PRESTADOR = " prestador",
    EMPRESA = "empresa"
}

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
    role: Role;
    enabled: boolean;
    created_at: string;
    updated_at: string
}

export interface orcamentoDBType {
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
    owner: string,
    enabled: boolean,
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
    idPrestador: string,
    preco_hora: number | string,
    hora_estimadas?: number | string,
    estado: string | number,
    owner?: string,
    enabled: boolean,
    created_at: string,
    update_at: string
}



export interface prestadorDBType {
    id: string,
    taxa_urgencia: number,
    percentagemDesconto: number,
    minimoDesconto: number,
    disponivel: string,
    nif: string,
    profissao: string,
    enabled: boolean,
    created_at: string,
    update_at: string
}

export interface prestacaoServicoDBType {
    id: string,
    designacao: string,
    subtotal: string,
    urgente: boolean,
    horasestimadas: string,
    id_prestador: string,
    id_servico: string, 
    preco_hora: string,
    id_utilizador:string,
    id_orcamento: string,
    id_empresa: string,
    tipo_prestador: string,
    enabled: boolean,
    created_at: string,
    update_at: string
}

export interface PrestadorServicoDetalhadoType{
    id: string,
    nome_utilizador: string,
    email_utilizador: string,
    nome_servico: string,
    descricao: string,
    data_pedido: string,
    urgente: boolean
}


export interface ServicoDetalhadoType{
    id: string,
    nome: string,
    descricao: string,
    desgnacao_categoria: string,
    icone_categoria: string,
    id_empresa: string,
    designacao_empresa: string,
    
}

export interface responseType <T> {
    status: "success" | "error",
    message: string,
    data: T | null
}

export interface CategoriaDBType {
    id: string,
    designacao: string,
    icone: string,
    created_at: string,
    updated_at: string
}

export interface EmpresaDBType {
    id: string,
    designacao: string,
    nif: string,
    icone: string,
    id_utilizador: string,
    localizacao: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface PrestacaoServicoByCategoriaType {
    id_Prestacao_servico: string,
    descricao: string,
    nome_servico: string,
    nome_categoria: string,
    icone_categoria: string,
    data_pedido: string,
    urgente: boolean
}