import db from "../lib/db.js"
import type { orcamentoType } from "../utils/types.js"

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

            const rows = db.execute(query, value)

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
                            nome=?,
                            descricao=?,
                            categoria=?,
                            enabled=?,
                            updated_at=?,
                        WERE
                            id=?
                        ;`

            const values = [
                orcamentoAtualizado.total,
                orcamentoAtualizado.id_utilizadores,
                orcamentoAtualizado.enabled,
                orcamentoAtualizado.created_at,
                orcamentoAtualizado.update_at,
                new Date(),
                id
            ]

            const rows = await db.execute(query, values)

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


}
