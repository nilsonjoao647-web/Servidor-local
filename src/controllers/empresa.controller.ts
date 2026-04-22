import { EmpresaModel } from "../models/Empresa.model.js"
import type { EmpresaDBType } from "../utils/types.js"
import type { Request, Response } from "express"
import { comparePassword } from "../utils/password.js"
import jwt from "jsonwebtoken"

export const EmpresaController = {
    async create(req: Request, res: Response) {
        const empresa: EmpresaDBType = req.body

        if (!empresa) {
            return res.status(400).json({
                error: "utilizador nao encontrado",
            })
        }
        const createEmpresaResponse = await EmpresaModel.create(empresa);
        res.json(createEmpresaResponse)
    },

    async getAll(req: Request, res: Response) {
        const getEmpresaResponse = await EmpresaModel.getAll()

        res.json(getEmpresaResponse);
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

        const getServiceResponse = await EmpresaModel.get(id as string)
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

        const updatedServico: EmpresaDBType = req.body

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

        const updatedServicoResponse = await EmpresaModel.update(id as string, updatedServico)

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

        const deleteServicoResponse = await EmpresaModel.delete(id as string)
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

        const empresaData = await EmpresaModel.getByEmail(email as string)

        if (!empresaData) {
            return res.status(404).json({
                status: "error",
                message: "Nao existe nenhuma conta com esse email",
                data: null
            })
        }
    }
}