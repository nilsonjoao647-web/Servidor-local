import type { create } from "node:domain";
import db from "../lib/db.js";
import type { ServicoDBType } from "../utils/types.js";

export const ServiceModel = {
    async create(newService: ServicoDBType) {
        try {
            const query = 'INSERT INTO table_servicos VALUES (?, ?, ?, ?, ?, ?, ?)'

            const values = [
                null,
                newService.nome,
                newService.descricao,
                newService.categoria,
                newService.enabled,
                newService.created_at,
                newService.updated_at,
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
            const query = 'SELECT * FROM tbl_servicos'

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = 'SELECT * FROM tbl_servicos WHERE id = ?'

            const value = [id]

            const rows = db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, servicoAtualizado: ServicoDBType) {
        try {
            const query = `UPDATE tbl_servicos
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
                servicoAtualizado.nome,
                servicoAtualizado.descricao,
                servicoAtualizado.categoria,
                servicoAtualizado.enabled,
                servicoAtualizado.updated_at,
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
        const query = `DELETE FROM  tbl_servicos WHERE id =?`

        const value = [id]

        const rows: any = await db.execute(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows
    } catch (error) {
        console.log(error)
        return null
    }
    },


}