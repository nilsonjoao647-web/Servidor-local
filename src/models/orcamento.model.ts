import type { RowDataPacket } from "mysql2"
import db from "../lib/db.js"
import type { calcularOrcamento } from "../orcamneto.js"
import type { orcamentoDBType, prestacaoServicoType, propostaType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"

export const orcamentoModel = {
    async create(orcamento: orcamentoDBType): Promise<orcamentoDBType | null> {
        try {
            const [rows] = await db.execute<orcamentoDBType & RowDataPacket[]>(
                `INSERT INTO table_orcamento 
            VALUES(?, ?, ?, ?, ?, ?, ?)`,


                [
                    generateUUID(),
                    orcamento.total,
                    orcamento.id_utilizadores,
                    orcamento.enabled,
                    orcamento.created_at,
                    orcamento.update_at,
                    new Date(),
                    new Date()
                ]
            )
            return rows as orcamentoDBType
        } catch (error) {
            console.log(error)
            return null
        }
            
    },

    async getAll(): Promise<orcamentoDBType[] | null> {
        const [rows] = await db.execute<orcamentoDBType[] & RowDataPacket[]>("SELECT * FROM tbl_orcamento")

        return rows as orcamentoDBType[]
    },

    async get(id: string): Promise<orcamentoDBType | null>{
        try {
            const [rows] = await db.execute<orcamentoDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_orcamentos
                WHERE tbl_orcamentos.id = ?`,
                [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as orcamentoDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, orcamentoAtualizado: orcamentoDBType) {
        try {
            const query = `UPDATE tbl_orcamento
                        SET
                            total = ?,
                            id_utilizadores = ?,
                            enabled = ?,
                            updated_at = ?
                        WHERE
                            id = ?`

            const values = [
                orcamentoAtualizado.total,
                orcamentoAtualizado.id_utilizadores,
                orcamentoAtualizado.enabled,
                new Date(),
                id
            ]

            const rows: any = await db.execute(query, values)
            return rows[0]?.affectedRows === 0 ? null : rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async updateBudget(id: string, total: number) {
        try {
            const query = `UPDATE tbl_orcamento
                        SET
                            total = ?,
                            updated_at = ?
                        WHERE
                            id = ?`

            const values = [total, new Date(), id]
            const rows: any = await db.execute(query, values)
            return rows[0]?.affectedRows === 0 ? null : rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async delete(id: string) {
        try {
            const query = `DELETE FROM  tbl_orcamento WHERE id =?`

            const value = [id]

            const rows: any = await db.execute(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getPrestacaoDeServico(id: string) {
        try {
            const query = 'SELECT * FROM tbl_prestacaoServico WHERE id = ?'

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }

    },

    async updateBuget(id: string, total: number) {
        try {
            const rows: any = await db.execute(
                `UPDATE tbl_orcamento SET total = ?, update_at = ? WHERE id = ?`,
                [total, new Date(), id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        }
        catch (err) {
            console.log(err)
            return null
        }
    }

}


