import type { create } from "node:domain";
import db from "../lib/db.js"
import type { prestadorType } from "../utils/types.js"

export const PrestadorModel = {
    async create(newPrestador: prestadorType) {
        try {
            const query = 'INSERT INTO table_Prestador VALUES (?, ?, ?, ?, ?, ?, ?)'

            const values = [
                null,
                newPrestador.nif,
                newPrestador.profissao,
                newPrestador.minimo_desconto,
                newPrestador.percentagem_desconto,
                newPrestador.disponivel,
                newPrestador.enabled,
                newPrestador.created_at,
                newPrestador.update_at,
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
            const query = 'SELECT * FROM tbl_Prestador'

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = 'SELECT * FROM tbl_Prestador WHERE id = ?'

            const value = [id]

            const rows = db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, prestadorAtualizado: prestadorType) {
        try {
            const query = `UPDATE tbl_Prestador
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
                prestadorAtualizado.nif,
                prestadorAtualizado.profissao,
                prestadorAtualizado.taxa_urgencia,
                prestadorAtualizado.minimo_desconto,
                prestadorAtualizado.percentagem_desconto,
                prestadorAtualizado.disponivel,
                prestadorAtualizado.enabled,
                prestadorAtualizado.created_at,
                prestadorAtualizado.update_at,
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
            const query = `DELETE FROM  tbl_Prestador WHERE id =?`

            const value = [id]

            const rows: any = await db.execute(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows
        } catch (error) {
            console.log(error)
            return null
        }
    },


}
