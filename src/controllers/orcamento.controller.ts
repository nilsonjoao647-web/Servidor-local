import type { Request, Response } from "express"
import type { orcamentoType } from "../utils/types.js"
import { orcamentoModel } from "../models/orcamento.model.js"

export const OrcamentoController = {
    async createOrcamento(req: Request, res: Response) {
        const neworcamento: orcamentoType = req.body

        if (!neworcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            })
        }

        const createOrcamentoResponse = await orcamentoModel.create(neworcamento)
        if (createOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Orcamento criado com success",
            data: null
        })
    },

    async getAllOrcamento(req: Request, res: Response) {
        const getAllOrcamentoResponse = await orcamentoModel.getAll()
        if (!getAllOrcamentoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar orcamento",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Orcamento buscando com sucesso",
            data: null
        })
    },

    async getOrcamento(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do orcamento nao fornecido",
                data: null
            })
        }

        const getAllOrcamentoResponse = await orcamentoModel.get(id as string)
        if (!getAllOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Orcamento encontrado com sucesso",
            data: null
        })
    },

    async updateOrcamento(req: Request, res: Response) {
        const { id } = req.params

        const updatedOrcamento: orcamentoType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            })
        }

        const updatedServicoResponse = await orcamentoModel.update(id as string, updatedOrcamento)

        if (!updatedServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Error ao atualizar orcamento",
                data: null
            })
        }


        return res.status(400).json({
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: null
        })
    },

    async deleteOrcamento(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const deleteOrcamentoResponse = await orcamentoModel.delete(id as string)
        if (!deleteOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar orcamento",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento apagado com success",
            data: deleteOrcamentoResponse
        })
    },

    async calcular(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const prestacao_servico = await orcamentoModel.getPrestacaoDeServico(id as string)
        if (!prestacao_servico) {
            return res.status(400).json({
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Calculo realizado com sucesso",
            data: prestacao_servico
        })
    }
}