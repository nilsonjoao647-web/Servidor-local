import type {Request, Response} from "express"
import type { prestacaoServicoType } from "../utils/types.js"
import { prestacaoServicoModel } from "../models/prestacao_servico.model.js"

export const PrestacaoServicoController = {
    async create (req: Request, res: Response) {
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

        async getAllPrestacaoServicoDetalhado(req: Request, res: Response) {
            const { limit, offset } = req.query as {limit: string, offset: string}

            let LIMIT = 10
            let OFFSET = 0

            if (limit && parseInt (limit) > 0) LIMIT = parseInt(limit)
            if (offset && parseInt (offset) > 0) OFFSET = parseInt(offset)

            const getAllPrestacaoServicoResponse = await prestacaoServicoModel.getAllPrestacaoServicoDetalhada(LIMIT, OFFSET)

            if (!getAllPrestacaoServicoResponse) {
                return res.status(500).json({
                    status: "error",
                    message: "erro ao buscer prestacao de srvico",
                    data: null
                })
            }

            return res.status(200).json({
                    status: "error",
                    message: "Prestacoes de serviso buscada com sucesso",
                    data: getAllPrestacaoServicoResponse
                })
        }
}