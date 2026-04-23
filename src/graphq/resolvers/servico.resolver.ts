
import { CategoriaModel } from "../../models/categoria.model.js";
import { prestacaoServicoModel } from "../../models/prestacao_servico.model.js";
import { ServiceModel } from "../../models/servico.model.js";
import type { ServicoDBType } from "../../utils/types.js";

export const servicoResolver = {
    Query: {
        getAllServico: async () => {
            return await ServiceModel.getAll();
        },
        getServicoById: async (_: any, args: { id: string }) => {
            return await ServiceModel.get(args.id);
        }
    },

    Mutation: {
        createServico: async (_: any, args: { servico: ServicoDBType }) => {
            return await ServiceModel.create(args.servico);
        },

        updateServico: async (_: any, args: { id: string, servico: ServicoDBType }) => {
            return await ServiceModel.update(args.id, args.servico);
        },

        deleteServico: async (_: any, args: { id: string }) => {
            return await ServiceModel.delete(args.id);
        }
    },
    //Relacionamento de tables
    Servico: {
        categoria: async (parent: { id: string }) => {
            return await CategoriaModel.get(parent.id);
        },
        PrestacaoServico: async (parent: { id: string }) => {
            return await prestacaoServicoModel.get(parent.id);
        }
    }
}