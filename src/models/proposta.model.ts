import type { create } from "node:domain";
import db from "../lib/db.js";
import type { PropostaDBType, propostaType } from "../utils/types.js";
import type { RowDataPacket } from "mysql2";

export const PropostaModel = {
    async createProposta(newProposta: propostaType) {
        try {
            const query = 'INSERT INTO table_proposta VALUES (?, ?, ?, ?, ?, ?, ?)'

            const values = [
                null,
                newProposta.id_prestacao_servico,
                newProposta.preco_hora,
                newProposta.hora_estimadas,
                newProposta.estado,
                newProposta.created_at,
                newProposta.update_at,
                new Date(),
                new Date()
            ]

            const rows = await db.execute(query, values)


        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAllProposta() {
        try {
            const query = 'SELECT * FROM tbl_proposta'

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getProposta(id: string) {
        try {
            const query = 'SELECT * FROM tbl_proposta WHERE id = ?'

            const value = [id]

            const rows = db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async updateProposta(id: string, PropostaAtualizado: propostaType) {
        try {
            const query = `UPDATE tbl_proposta
                        SET
                            nome=?,
                            descricao=?,
                            categoria=?,
                            enabled=?,
                            updated_at=?,
                        WERE
                            id=?
                        ;`

            const values = [
                PropostaAtualizado.id_prestacao_servico,
                PropostaAtualizado.preco_hora,
                PropostaAtualizado.hora_estimadas,
                PropostaAtualizado.estado,
                PropostaAtualizado.created_at,
                PropostaAtualizado.update_at,
                new Date(),
                id
            ]

            const rows = await db.execute(query, values)

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async deleteProposta(id: string) {
        try {
            const query = `DELETE FROM  tbl_Proposta WHERE id =?`

            const value = [id]

            const rows: any = await db.execute(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getByIdPrestacaoServico(idPrestacaoServico: string): Promise<PropostaDBType[] | null> {
        try {
            const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_proposta
                WHERE id_prestacao_servico = ?`,
                [idPrestacaoServico]
            )

            if (!Array.isArray(rows) || rows.length === 0) return null
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async acceptProposal (id: string) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_propostas`
            )
        }catch (err) {
            console.log(err)
            return null
        }
    }
}