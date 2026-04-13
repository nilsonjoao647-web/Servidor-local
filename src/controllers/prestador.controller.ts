import { PrestadorModel} from "../models/prestador.model.js"
import type { prestadorType } from "../utils/types.js"
import type { Request, Response } from "express"

export const PrestadorController = {
    async create (req: Request, res: Response) {
        const newPrestador: prestadorType = req.body
        
                if (!newPrestador) {
                    return res.status(400).json({
                        status: "error",
                        message: "Dados de  invalidos",
                        data: null
                    })
                }
        
                const createPrestadorResponse = await PrestadorModel.create(newPrestador)
                if (!createPrestadorResponse) {
                    return res.status(400).json({
                        status: "error",
                        message: "Erro ao criar Prestador",
                        data: null
                    })
                }
                return res.status(200).json({
                    status: "Success",
                    message: "Prestador criado com success",
                    data: null
                })
    },

    async getAll(req: Request, res: Response) {
            const getAllPrestadorResponse = await PrestadorModel.getAllPrestador()
            if (!getAllPrestadorResponse) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao buscar Prestador",
                    data: null
                })
            }
            return res.status(200).json({
                status: "Success",
                message: "Prestador buscando com sucesso",
                data: null
            })
        },
    
        async get(req: Request, res: Response) {
            const id = req.params.id
    
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID do Prestador nao fornecido",
                    data: null
                })
            }
    
            const getAllPrestadorResponse = await PrestadorModel.getPrestador(id as string)
            if (!getAllPrestadorResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Prestador nao encontrado",
                    data: null
                })
            }
            return res.status(200).json({
                status: "Success",
                message: "Prestador encontrado com sucesso",
                data: null
            })
        },
    
        async update(req: Request, res: Response) {
            const { id } = req.params
    
            const updatedPrestador: prestadorType = req.body
    
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID obrigatorio",
                    data: null
                })
            }
    
            if (!updatedPrestador) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados de Prestador invalidos",
                    data: null
                })
            }
    
            const updatedPrestadorResponse = await PrestadorModel.updatePrestador(id as string, updatedPrestador)
    
            if (!updatedPrestadorResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Error ao atualizar Prestador",
                    data: null
                })
            }
    
    
            return res.status(400).json({
                status: "success",
                message: "Prestador atualizado com sucesso",
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
    
            const deletePrestadorResponse = await PrestadorModel.delete(id as string)
            if (!deletePrestadorResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao apagar orcamento",
                    data: null
                })
            }
    
            return res.status(200).json({
                status: "success",
                message: "Prestador apagado com success",
                data: deletePrestadorResponse
            })
        }
}