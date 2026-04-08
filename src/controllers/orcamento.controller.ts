import type { Request, Response } from "express"
import type { orcamentoType, PropostaDBType } from "../utils/types.js"
import { orcamentoModel } from "../models/orcamento.model.js"
import { prestacaoServicoModel } from "../models/prestacao_servico.model.js"
import { PropostaModel } from "../models/proposta.model.js"
import { PrestadorModel } from "../models/prestador.model.js"

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
        if (createOrcamentoResponse === null) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            })
        }

        return res.status(201).json({
            status: "success",
            message: "Orcamento criado com sucesso",
            data: neworcamento
        })
    },

    async getAllOrcamento(req: Request, res: Response) {
        const getAllOrcamentoResponse = await orcamentoModel.getAll()
        if (getAllOrcamentoResponse === null) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar orcamento",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentoResponse
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

        const orcamento = await orcamentoModel.get(id as string)
        if (!orcamento) {
            return res.status(404).json({
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Orcamento encontrado com sucesso",
            data: orcamento
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
                message: "Erro ao atualizar orcamento",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updatedServicoResponse
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
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse
        })
    },

    async calcularBudget(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do orcamento nao fornecido",
                data: null
            })
        }

        const prestacaoServico = await prestacaoServicoModel.getByIdOrcamento(id as string)
        if (!prestacaoServico) {
            return res.status(404).json({
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            })
        }

        const propostas = await PropostaModel.getByIdPrestacaoServico(prestacaoServico.id)
        if (!propostas) {
            return res.status(404).json({
                status: "error",
                message: "Nenhuma proposta encontrada para a prestacao de servico",
                data: null
            })
        }

        const acceptedProposal = propostas.find(
            (proposal) => proposal.estado === 1 || proposal.estado === "ACEITE"
        ) || null

        if (!acceptedProposal) {
            return res.status(404).json({
                status: "error",
                message: "Ainda nenhuma proposta foi aceite",
                data: null
            })
        }

        const precoHora = Number(acceptedProposal.preco_hora ?? prestacaoServico.preco_hora)
        const horasEstimadas = Number(
            (acceptedProposal as any).hora_estimadas ?? prestacaoServico.horas_estimadas ?? 0
        )

        const prestador = await PrestadorModel.getPrestador(prestacaoServico.id_prestador)
        if (!prestador) {
            return res.status(404).json({
                status: "error",
                message: "Prestador nao encontrado",
                data: null
            })
        }

        const urgencyTax = Number(prestador.taxa_urgencia)
        const minimumDiscount = Number(prestador.minimo_desconto)
        const discountPercentage = Number(prestador.percentagem_desconto)
        const isUrgent = Boolean((prestacaoServico as any).urgente)

        let subtotal = precoHora * horasEstimadas

        if (subtotal > minimumDiscount) {
            subtotal = subtotal * (1 - discountPercentage)
        }

        if (isUrgent) {
            subtotal = subtotal * (1 - urgencyTax)
        }

        const updateOrcamentoResponse = await orcamentoModel.updateBudget(id as string, subtotal)
        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao calcular orcamento",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento calculado e atualizado com sucesso",
            data: updateOrcamentoResponse
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

        const prestacaoservico = await orcamentoModel.getPrestacaoDeServico(id as string)
        if (!prestacaoservico) {
            return res.status(400).json({
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Calculo realizado com sucesso",
            data: prestacaoservico
        })
    }
}
