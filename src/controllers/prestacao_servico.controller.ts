import { response, type Request, type Response } from "express"
import type { PrestacaoServicoByCategoriaType, prestacaoServicoType, responseType } from "../utils/types.js"
import { prestacaoServicoModel } from "../models/prestacao_servico.model.js"

export const PrestacaoServicoController = {
    async create(req: Request, res: Response) {
        const newPrestacaoServico: prestacaoServicoType = req.body

        if (!newPrestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de PrestacaoServico invalidos",
                data: null
            })
        }

        const createPrestacaoServicoResponse = await prestacaoServicoModel.create(newPrestacaoServico)
        if (createPrestacaoServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar PrestacaoServico",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Orcamento criado com success",
            data: null
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestacaoServicoResponse = await prestacaoServicoModel.getAll()
        if (!getAllPrestacaoServicoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar PrestacaoServico",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "PrestacaoServico buscando com sucesso",
            data: null
        })
    },

    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do PrestacaoServico nao fornecido",
                data: null
            })
        }

        const getAllPrestacaoServicoResponse = await prestacaoServicoModel.get(id as string)
        if (!getAllPrestacaoServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "PrestacaoServico nao encontrado",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "PrestacaoServico encontrado com sucesso",
            data: null
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedPrestacaoServico: prestacaoServicoType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedPrestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestacaoservico invalidos",
                data: null
            })
        }

        const updatedServicoResponse = await prestacaoServicoModel.update(id as string, updatedPrestacaoServico)

        if (!updatedServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Error ao atualizar prestacaoservico",
                data: null
            })
        }


        return res.status(400).json({
            status: "success",
            message: "PrestacaoServico atualizado com sucesso",
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

        const deletePrestacaoServicoResponse = await prestacaoServicoModel.delete(id as string)
        if (!deletePrestacaoServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar prestacaoservico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "PrestacaoServico apagado com success",
            data: deletePrestacaoServicoResponse
        })
    },

    async getAllPrestacaoServicoByCategoriaDetalhada(req: Request, res: Response) {
        const { categoria } = req.params
        const { limit, offset } = req.query as { limit: string, offset: string }

        let LIMIT = 10
        let OFFSET = 0

        if (limit && parseInt(limit) > 0) LIMIT = parseInt(limit)
        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)

        if (!categoria) {
            const response: responseType<null> = {
                status: "error",
                message: "Cateegoria obrigatória",
                data: null
            }
            return res.status(400).json(response)
        }

        const getAllPrestacaoServicoByCategoriaDetalhadaResponse = await prestacaoServicoModel.getAllPrestacaoServicoByCategoriaDetalhada(LIMIT, OFFSET, categoria as string)

        if (!getAllPrestacaoServicoByCategoriaDetalhadaResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Prestacao de servico nao encontrado",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: responseType<PrestacaoServicoByCategoriaType[]> = {
            status: "success",
            message: "Prestacoes de serviso encontrada com sucesso",
            data: getAllPrestacaoServicoByCategoriaDetalhadaResponse
        }
        return res.status(200).json(response)
    },


}
