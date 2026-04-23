
import { orcamentoModel } from "../../models/orcamento.model.js";
import { prestacaoServicoModel } from "../../models/prestacao_servico.model.js";
import { PrestadorModel } from "../../models/prestador.model.js";
import { PropostaModel } from "../../models/proposta.model.js";
import { ServiceModel } from "../../models/servico.model.js";
import type { prestacaoServicoType } from "../../utils/types.js";

export const pretacaoservicoResolver = {
    Query: {
        getAllPretacaoServico: async () => {
            return await prestacaoServicoModel.getAll();
        },
        getPretacaoServicoById: async (_: any, args: { id: string }) => {
            return await prestacaoServicoModel.get(args.id);
        }
    },

    Mutation: {
        createPretacaoServico: async (_: any, args: { pretacaoservico: prestacaoServicoType }) => {
            return await prestacaoServicoModel.create(args.pretacaoservico);
        },

        updatePretacaoServico: async (_: any, args: { id: string, pretacaoservico: prestacaoServicoType }) => {
            return await prestacaoServicoModel.update(args.id, args.pretacaoservico);
        },

        deletePretacaoServico: async (_: any, args: { id: string }) => {
            return await prestacaoServicoModel.delete(args.id);
        }
    },

    //Relacionamento de tables
    PrestacaoServico: {
        Proposta: async (parent: { id: string }) => {
            return await PropostaModel.get(parent.id);
        },
        Servico: async (parent: { id: string }) => {
            return await ServiceModel.get(parent.id);
        },
        Pretador: async (parent: { id: string }) => {
            return await PrestadorModel.get(parent.id);
        },
        Orcamento: async (parent: { id: string }) => {
            return await orcamentoModel.get(parent.id);
        }
    }
}