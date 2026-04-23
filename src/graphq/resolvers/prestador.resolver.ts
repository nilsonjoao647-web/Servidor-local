
import { EmpresaModel } from "../../models/Empresa.model.js";
import { prestacaoServicoModel } from "../../models/prestacao_servico.model.js";
import { PrestadorModel } from "../../models/prestador.model.js";
import type { prestadorType } from "../../utils/types.js";

export const prestadorResolver = {
    Query: {
        getAllPretador: async () => {
            return await PrestadorModel.getAll();
        },
        getPretadorById: async (_: any, args: { id: string }) => {
            return await PrestadorModel.get(args.id);
        }
    },

    Mutation: {
        createPretador: async (_: any, args: { prestador: prestadorType }) => {
            return await PrestadorModel.create(args.prestador);
        },


        updatePretador: async (_: any, args: { id: string, pretador: prestadorType }) => {
            return await PrestadorModel.update(args.id, args.pretador);
        },

        deletePretador: async (_: any, args: { id: string }) => {
            return await PrestadorModel.delete(args.id);
        }
    },

    //Relacionamento de tables
    Pretador: {
        Emresa: async (parent: { id: string }) => {
            return await EmpresaModel.get(parent.id);
        },
        PrestacaoServico: async (parent: { id: string }) => {
            return await prestacaoServicoModel.get(parent.id);
        }
    }
}