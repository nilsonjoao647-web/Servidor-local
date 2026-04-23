

import { EmpresaModel } from "../../models/Empresa.model.js";
import { orcamentoModel } from "../../models/orcamento.model.js";
import { UserModel } from "../../models/users.model.js";
import type { userType } from "../../utils/types.js";

export const userResolver = {
    Query: {
        getAllUsers: async () => {
            return await UserModel.getAll();
        },
        getUserById: async (_: any, args: { id: string }) => {
            return await UserModel.get(args.id);
        }
    },

    Mutation: {
        createUser: async (_: any, args: { user: userType }) => {
            return await UserModel.create(args.user);
        },


        updateUser: async (_: any, args: { id: string, user: userType }) => {
            return await UserModel.update(args.id, args.user);
        },

        deleteUser: async (_: any, args: { id: string }) => {
            return await UserModel.delete(args.id);
        }
    },

    //Relacionamento de tables
    User: {
        Empresa: async (parent: { id: string }) => {
            return await EmpresaModel.get(parent.id);
        },
        Orcamento: async (parent: { id: string }) => {
            return await orcamentoModel.get(parent.id);
        }
    },
}