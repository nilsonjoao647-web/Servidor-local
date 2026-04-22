
import { gql } from "graphql-tag";

export const typeDefs = gql`
    enum Role {
        CLIENTE ,
        ADMIN ,
        PRESTADOR ,
        EMPRESA 
    }
    enum EstadoProposta {
        PENDENTE ,
        ACEITE ,
        CANCELADO 
    }
    enum EstadoPrestacaoServico {
        PENDENTE ,
        FINALIZADO ,
        EM_PROGRESSO ,
        CANCELADO 
    }
    enum TipoPrestador {
        PRESTADOR ,
        EMPRESA 
    }


    type Utilizador {
        id: ID!,
        nome: String!,
        numero_identificacao: String!
        data_nascimento: String!
        email: String!
        telemovel: String!
        pais: String!
        localidade: String!
        password: String!
        role: Role!
        estado: String!
        enabled: Boolean!
        created_at: String
        updated_at: String
    }

    type Servico {
        id: ID!,
        nome: String!,
        descricao: String,
        categoria: String,
        enabled: boolean;
        created_at: String,
        updated_at: String
    }

    type orcamento {
        id: ID!,
        total: String,
        id_utilizadores: Utilizador!,
        enabled: Boolean,
        created_at: String
        update_at: String
    }

    type prestador {
        id: ID!,
        nif: float!,
        profissao: String,
        taxa_urgencia: String,
        minimo_desconto: String,
        percentagem_desconto: String,
        disponivel: String,
        enabled: Boolean,
        created_at: String,
        update_at: String
    }

    type Proposta {
        id: ID!,
        id_prestacao_servico: PretacaoServico,
        idPrestador: String,
        preco_hora: Float,
        hora_estimadas: Float!,
        estado: EstadoProposta,
        owner: String,
        enabled: Boolean,
        created_at: String,
        update_at: String
    }

    type prestacaoServico {
        id: ID!,
        designacao: string,
        subtotal: string,
        urgente: boolean,
        horasestimadas: string,
        id_prestador: Prestador,
        id_servico: Servico, 
        preco_hora: string,
        id_utilizador:Utilizador,
        id_orcamento: Orcamento,
        id_empresa: Empresa,
        tipo_prestador: TipoPretador,
        enabled: boolean,
        created_at: string,
        update_at: string
    }

    type Categoria {
        id: ID!,
        designacao: string,
        icone: string,
        created_at: string,
        updated_at: string
    }

    type Empresa {
        id: ID!,
        designacao: string,
        nif: string!,
        icone: string,
        id_utilizador: Utilizador,
        localizacao: string!,
        enabled: boolean,
        created_at: string,
        updated_at: string
    }

    type Query {
        getAllUsers: [Utilizador]
        getUserById(id: ID!): Utilizador
        getAllServices: [servico]
        getServiceById(id: ID!): Servico
    }

    type Mutation {
        createUser(
            nome: String!, 
            numero_identificacao: String!, 
            data_nascimento: String!, 
            email: String, 
            telefone: String!, 
            pais: String!, 
            localidade: String, 
            password: String, 
            role: Role, 
            enabled: Boolean): Utilizador
        updateUser(
            id: ID!, 
            nome: String!, 
            numero_identificacao: String!, 
            data_nascimento: Strig!, 
            email: String!, 
            telefone: String!, 
            pais: String!, 
            localidade: String, 
            password: String, 
            role: Role, 
            enabled: Boolean
            ): Utilizador
        deleteUser(id: ID!): Utilizador
        ceateService(
            nome: String!,
            descricao: String,
            categoria: Categoria)
    }

`
