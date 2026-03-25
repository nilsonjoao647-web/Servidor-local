import type {Request, Response} from "express"
import type { prestacao_servicoType } from "../utils/types.js"
import { prestacaoservicoModel } from "../models/prestacao_servico.model.js"

export const PrestacaoServicoController = {
    async createPrestacaoServico (req: Request, res: Response) {
        const newPrestacaoServico: prestacao_servicoType = req.body
        
                if (!newPrestacaoServico) {
                    return res.status(400).json({
                        status: "error",
                        message: "Dados de PrestacaoServico invalidos",
                        data: null
                    })
                }
        
                const createPrestacaoServicoResponse = await prestacaoservicoModel.create(newPrestacaoServico)
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

    async getAllPrestacaoServico(req: Request, res: Response) {
            const getAllPrestacaoServicoResponse = await prestacaoservicoModel.getAll()
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
    
        async getPrestacaoServico(req: Request, res: Response) {
            const id = req.params.id
    
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID do PrestacaoServico nao fornecido",
                    data: null
                })
            }
    
            const getAllPrestacaoServicoResponse = await prestacaoservicoModel.get(id as string)
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
    
        async updatePrestacaoServico(req: Request, res: Response) {
            const { id } = req.params
    
            const updatedPrestacaoServico: prestacao_servicoType = req.body
    
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
    
            const updatedServicoResponse = await prestacaoservicoModel.update(id as string, updatedPrestacaoServico)
    
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
    
        async deletePrestacaoServico(req: Request, res: Response) {
            const { id } = req.params
    
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID obrigatorio",
                    data: null
                })
            }
    
            const deletePrestacaoServicoResponse = await prestacaoservicoModel.delete(id as string)
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
        }
}