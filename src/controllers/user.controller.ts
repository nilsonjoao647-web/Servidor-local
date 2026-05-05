import { UserModel } from "../models/users.model.js"
import type { userType } from "../utils/types.js"
import type { Request, Response } from "express"
import { comparePassword } from "../utils/password.js"
import  jwt  from "jsonwebtoken"

export const UserController = {
    async create(req: Request, res: Response) {
        const user: userType = req.body

        if (!user) {
            return res.status(400).json({
                error: "utilizador nao encontrado",
            })
        }
        const createUserResponse = await UserModel.create(user);
        return res.status(200).json(createUserResponse)
    },

    async getAll(req: Request, res: Response) {
        const getUserResponse = await UserModel.getAll()

        res.json(getUserResponse);
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

        const getServiceResponse = await UserModel.get(id as string)
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

        const updatedServico: userType = req.body

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

        const updatedServicoResponse = await UserModel.update(id as string, updatedServico)

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

        const deleteServicoResponse = await UserModel.delete(id as string)
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

        const userData = await UserModel.getByEmail(email as string)

        if (!userData) {
            return res.status(404).json({
                status: "error",
                message: "Nao existe nenhuma conta com esse email",
                data: null
            })
        }

        const isPasswordValid = await comparePassword(password, userData.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "error",
                message: "Credenciais invalidos",
                data: null
            })
        }

        const playload = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome,
            role: userData.role
        }

        const token = jwt.sign(playload, process.env.JWT_SECRET as string, {expiresIn: "1h"})
        

        return res.status(200).json ({
            status: "sucess",
            message: "login realizado com sucesso",
            data: {
                token,
                user: playload
            }
        })
    },
}