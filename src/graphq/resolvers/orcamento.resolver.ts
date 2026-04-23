
import { orcamentoModel } from "../../models/orcamento.model.js";
import { prestacaoServicoModel } from "../../models/prestacao_servico.model.js";
import { UserModel } from "../../models/users.model.js";
import type { orcamentoDBType } from "../../utils/types.js";

export const orcamentoResolver = {
    Query: {
        getAllOrcamento: async () => {
            return await orcamentoModel.getAll();
        },
        getOrcamentoById: async (_: any, args: { id: string }) => {
            return await orcamentoModel.get(args.id);
        }
    },

    Mutation: {
        createOrcamento: async (_: any, args: { orcamento: orcamentoDBType }) => {
            return await orcamentoModel.create(args.orcamento);
        },

        updateOrcamento: async (_: any, args: { id: string, orcamento: orcamentoDBType }) => {
            return await orcamentoModel.update(args.id, args.orcamento);
        },

        deleteOrcamento: async (_: any, args: { id: string }) => {
            return await orcamentoModel.delete(args.id);
        }
    },

    //Relacionamento de tables
    Orcamento: {
        user: async (parent: { id: string }) => {
            return await UserModel.get(parent.id);
        },
        PrestacaoServico: async (parent: { id: string }) => {
            return await prestacaoServicoModel.get(parent.id);
        }
    }
}