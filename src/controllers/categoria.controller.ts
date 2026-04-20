
import type { CategoriaDBType } from "../utils/types.js"
import type { Request, Response } from "express"
import { CategoriaModel } from "../models/categoria.model.js"

export const CategoriaController = {
    async create(req: Request, res: Response) {
        const categoria: CategoriaDBType = req.body

        if (!categoria) {
            return res.status(400).json({
                error: "utilizador nao encontrado",
            })
        }
        const createCategoriaResponse = await CategoriaModel.create(categoria);
        res.json(createCategoriaResponse)
    },

    async getAll(req: Request, res: Response) {
        const getCategoriaResponse = await CategoriaModel.allCategoria()

        res.json(getCategoriaResponse);
    },

    async getById(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do servico nao fornecido",
                data: null
            })
        }

        const getServiceResponse = await CategoriaModel.getCategoria(id as string)
        if (!getServiceResponse) {
            return res.status(400).json({
                status: "error",
                message: "Servico nao encontrado",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Servico encontrado com sucesso",
            data: null
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedServico: CategoriaDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servicos invalidos",
                data: null
            })
        }

        const updatedServicoResponse = await CategoriaModel.update(id as string, updatedServico)

        if (!updatedServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Error ao atualizar servico",
                data: null
            })
        }


        return res.status(400).json({
            status: "success",
            message: "servico atualizado com sucesso",
            data: null
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const deleteServicoResponse = await CategoriaModel.delete(id as string)
        if (!deleteServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Servico apagado com success",
            data: deleteServicoResponse
        })
    },

    async login(req: Request, res: Response) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Credenciais invalidos",
                data: null
            })
        }

        const categoriaData = await CategoriaModel.getByEmail(email as string)

        if (!categoriaData) {
            return res.status(404).json({
                status: "error",
                message: "Nao existe nenhuma conta com esse email",
                data: null
            })
        }

    }
}