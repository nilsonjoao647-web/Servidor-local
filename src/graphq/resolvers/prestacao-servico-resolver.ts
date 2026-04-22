
import { prestacaoServicoModel } from "../../models/prestacao_servico.model.js";
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
    }
}