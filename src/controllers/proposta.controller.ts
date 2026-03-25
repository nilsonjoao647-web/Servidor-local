
import { PropostaModel } from "../models/proposta.model.js"
import type { propostaType } from "../utils/types.js"
import type { Request, Response } from "express"

export const PropostaController = {
    async createpropostas(req: Request, res: Response) {
        const proposta: propostaType = req.body

        if (!proposta) {
            return res.status(400).json({
                error: "utilizador nao encontrado",
            })
        }
            const createPropostaResponse = await PropostaModel.createProposta(proposta);
            res.json(createPropostaResponse)
    },

async allUproposta(req: Request, res: Response) {
    const getPropostaResponse = await PropostaModel.getAllProposta()

        res.json(getPropostaResponse);
},

async getpropostas(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do Proposta nao fornecido",
                data: null
            })
        }

        const getPropostaResponse = await PropostaModel.getProposta(id as string)
        if (!getPropostaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Proposta nao encontrado",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Proposta encontrado com sucesso",
            data: null
        })
    },

    async updatepropostas(req: Request, res: Response) {
        const { id } = req.params

        const updatedProposta: propostaType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedProposta) {
            return res.status(400).json({
                status: "error",
                message: "Dados de Proposta invalidos",
                data: null
            })
        }

        const updatedPropostaResponse = await PropostaModel.updateProposta(id as string, updatedProposta)

        if (!updatedPropostaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Error ao atualizar Proposta",
                data: null
            })
        }


        return res.status(400).json({
            status: "success",
            message: "Proposta atualizado com sucesso",
            data: null
        })
    },

    async deletepropostas(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const deletePropostaResponse = await PropostaModel.deleteProposta(id as string)
        if (!deletePropostaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar Proposta",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Proposta apagado com success",
            data: deletePropostaResponse
        })
    }
}