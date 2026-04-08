import db from "../lib/db.js"
import type { calcularOrcamento } from "../orcamneto.js"
import type { orcamentoType, prestacaoServicoType, propostaType } from "../utils/types.js"

export const orcamentoModel = {
    async create(neworcamento: orcamentoType) {
        try {
            const query = 'INSERT INTO table_orcamento VALUES (?, ?, ?, ?, ?, ?, ?)'

            const values = [
                null,
                neworcamento.total,
                neworcamento.id_utilizadores,
                neworcamento.enabled,
                neworcamento.created_at,
                neworcamento.update_at,
                new Date(),
                new Date()
            ]

            const rows = await db.execute(query, values)


        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAll() {
        try {
            const query = 'SELECT * FROM tbl_orcamento'

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = 'SELECT * FROM tbl_orcamento WHERE id = ?'

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, orcamentoAtualizado: orcamentoType) {
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

    }
}


