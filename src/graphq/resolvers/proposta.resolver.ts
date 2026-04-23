
import { prestacaoServicoModel } from "../../models/prestacao_servico.model.js";
import { PropostaModel } from "../../models/proposta.model.js";
import type { propostaType } from "../../utils/types.js";

export const propostaResolver = {
    Query: {
        getAllProposta: async () => {
            return await PropostaModel.getAll();
        },
        getPropostaById: async (_: any, args: { id: string }) => {
            return await PropostaModel.get(args.id);
        }
    },

    Mutation: {
        createProposta: async (_: any, args: { proposta: propostaType }) => {
            return await PropostaModel.create(args.proposta);
        },


        updateProposta: async (_: any, args: { id: string, proposta: propostaType }) => {
            return await PropostaModel.update(args.id, args.proposta);
        },

        deleteProposta: async (_: any, args: { id: string }) => {
            return await PropostaModel.delete(args.id);
        }
    },

    //Relacionamento de tables
        Proposta: {
            PretacaoServico: async (parent: { id: string }) => {
                return await prestacaoServicoModel.get(parent.id);
            }
    
            
        }
}