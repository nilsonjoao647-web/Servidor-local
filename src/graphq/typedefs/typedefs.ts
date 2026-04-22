
import { gql } from "graphql-tag";

export const typeDefs = gql`
    enum Role {
        CLIENTE = "cliente",
        ADMIN = "admin",
        PRESTADOR = "prestador",
        EMPRESA = "empresa"
    }
    enum EstadoProposta {
        PENDENTE = "pendente",
        ACEITE = "aceite",
        CANCELADO = "cancelado"
    }
    enum EstadoPrestacaoServico {
        PENDENTE = "pendente",
        FINALIZADO = "finalizado",
        EM_PROGRESSO = "em_progresso",
        CANCELADO = "cancelado"
    }



    type orcamento {
        id: string,
        total: string,
        id_utilizadores: string,
        enabled: boolean,
        created_at: string
        update_at: string
    }

    type Utilizador {
        id: ID!,
        nome: String!,
        numero_identificado: String!,
        data_nascimento: String!,
        email: String!,
        telefone: String!,
        pais: String!,
        localidade: String,
        password: String;
        role: Role;
        enabled: Boolean;
        created_at: String;
        updated_at: String
    }

    type Proposta {
        id: ID!,
        id_prestacao_servico: ID!,
        preco_hora: Float!,
        hora_estimadas: Int!,
        estado: String,
        enabled: Boolean,
        created_at: String,
        update_at: String
    }

    type prestacaoServicoType {
        id: ID!,
        designacao: String,
        subtotal: String,
        horas_estimadas: String!,
        id_prestador: String,
        id_servico: String,
        preco_hora: String!,
        estado: String,
        id_orcamento: String,
        enabled: Boolean,
        created_at: String,
        update_at: String
    }

        type prestador {
        id: String!,
        nif: Flaut,
        profissao: String,
        taxa_urgencia: String,
        minimo_desconto: String,
        percentagem_desconto: String,
        disponivel: String,
        enabled: Boolean,
        created_at: String,
        update_at: String
    }   

`
