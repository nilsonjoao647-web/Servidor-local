
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
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Orcamento {
        id: ID!,
        total: String,
        id_utilizadores: Utilizador!,
        enabled: Boolean,
        created_at: String
        update_at: String
    }

    type Prestador {
        id: ID!,
        nif: Float!,
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
        id_prestacao_servico: PrestacaoServico,
        idPrestador: String,
        preco_hora: Float,
        hora_estimadas: Float!,
        estado: EstadoProposta,
        owner: String,
        enabled: Boolean,
        created_at: String,
        update_at: String
    }

    type PrestacaoServico {
        id: ID!,
        designacao: String,
        subtotal: String,
        urgente: Boolean,
        horasestimadas: String,
        id_prestador: Prestador,
        id_servico: Servico, 
        preco_hora: String,
        id_utilizador:Utilizador,
        id_orcamento: Orcamento,
        id_empresa: Empresa,
        tipo_prestador: TipoPrestador,
        enabled: Boolean,
        created_at: String,
        update_at: String
    }

    type Categoria {
        id: ID!,
        designacao: String,
        icone: String,
        created_at: String,
        updated_at: String
    }

    type Empresa {
        id: ID!,
        designacao: String,
        nif: String!,
        icone: String,
        id_utilizador: Utilizador,
        localizacao: String!,
        enabled: Boolean,
        created_at: String,
        updated_at: String
    }

    type Query {
        getAllUsers: [Utilizador]
        getUserById(id: ID!): Utilizador
        getAllServico: [Servico]
        getServicoById(id: ID!): Servico
        getAllProposta: [Proposta]
        getPropostaById(id: ID!): Proposta
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
            data_nascimento: String!, 
            email: String!, 
            telefone: String!, 
            pais: String!, 
            localidade: String, 
            password: String, 
            role: Role, 
            enabled: Boolean
            ): Utilizador
        deleteUser(id: ID!): Utilizador
        createServico(
            nome: String!,
            descricao: String,
            categoria: String):Servico
        updateServico(
            id: ID!,
            nome: String!,): Servico
        deleteServico(id: ID!): Servico
        createProposta(
            id_prestacao_servico: String!,
            idPrestador: String!,): Proposta
        updateProposta(
            id: ID!,): Proposta
        deleteProposta(id: ID!): Proposta
            
    }

`
