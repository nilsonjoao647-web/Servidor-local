import type { Request, Response } from "express"
import type { orcamentoDBType, PropostaDBType, responseType } from "../utils/types.js"
import { orcamentoModel } from "../models/orcamento.model.js"
import { prestacaoServicoModel } from "../models/prestacao_servico.model.js"
import { PropostaModel } from "../models/proposta.model.js"
import { PrestadorModel } from "../models/prestador.model.js"
import { resolve } from "node:dns"

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const orcamento: orcamentoDBType = req.body

        if (!orcamento) {
            const response: responseType<orcamentoDBType> = {
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const createOrcamentoResponse: orcamentoDBType | null = await orcamentoModel.create(orcamento)
        if (!createOrcamentoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            })
        }

        const response: responseType<orcamentoDBType> = {
            status: "success",
            message: "Orcamento criado com sucesso",
            data: orcamento
        }

        return res.status(201).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentoResponse: orcamentoDBType[] | null = await orcamentoModel.getAll()
        if (!getAllOrcamentoResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Erro ao buscar orcamento",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: responseType<orcamentoDBType[]> = {
            status: "success",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentoResponse
        }
        return res.status(200).json(response)
    },

    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            const response: responseType<orcamentoDBType[]> = {
                status: "error",
                message: "ID do orcamento nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }

        const getOrcamentoByIdResponse: orcamentoDBType | null = await orcamentoModel.get(id as string)
        if (!getOrcamentoByIdResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: responseType<orcamentoDBType> = {
            status: "success",
            message: "Orcamento encontrado com sucesso",
            data: getOrcamentoByIdResponse
        }
        return res.status(200).json(response)
    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        const updatedOrcamento: orcamentoDBType = req.body

        if (!id) {
            const response:responseType<orcamentoDBType[]> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        if (!updatedOrcamento) {
            const response:responseType<orcamentoDBType[]> = {
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const updatedServicoResponse: orcamentoDBType | null = await orcamentoModel.update(id as string, updatedOrcamento)

        if (!updatedServicoResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: responseType<orcamentoDBType> = {
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updatedServicoResponse
        }
        return res.status(200).json(response)
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: responseType<orcamentoDBType> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        const deleteOrcamentoResponse: orcamentoDBType | null = await orcamentoModel.delete(id as string)
        if (!deleteOrcamentoResponse) {
            const response: responseType<orcamentoDBType> = {
                status: "error",
                message: "Erro ao apagar orcamento",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: responseType<orcamentoDBType> = {
            status: "success",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse
        }
        return res.status(200).json(response)
    },

    async calcularBudget(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: responseType<orcamentoDBType> = {
                status: "error",
                message: "ID do orcamento nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }

        const prestacaoServico = await prestacaoServicoModel.getByIdOrcamento(id as string)
        if (!prestacaoServico) {
            const response: responseType<null> = {
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            }
            return res.status(404).json(response)
        }

        const propostas: orcamentoDBType[] | null = await PropostaModel.getByIdPrestacaoServico(prestacaoServico.id)
        if (!propostas) {
            const response: responseType<orcamentoDBType> = {
                status: "error",
                message: "Nenhuma proposta encontrada para a prestacao de servico",
                data: null
            }
            return res.status(404).json(response)
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

        const response: responseType<orcamentoDBType> = {
            status: "success",
            message: "Orcamento calculado e atualizado com sucesso",
            data: updateOrcamentoResponse
        }
        return res.status(200).json(response)
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

        const prestacaoservico: orcamentoDBType[] | null = await orcamentoModel.getPrestacaoDeServico(id as string)
        if (!prestacaoservico) {
            return res.status(400).json({
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            })
        }

        const response: responseType<orcamentoDBType> = {
            status: "success",
            message: "Calculo realizado com sucesso",
            data: null
        }
        return res.status(200).json(response)
    }
}
