import db from "../lib/db.js"
import type { prestacao_servicoType } from "../utils/types.js"

export const prestacaoservicoModel = {
    async create(newprestacaoservico: prestacao_servicoType) {
        try {
            const query = 'INSERT INTO table_prestacao_servico VALUES (?, ?, ?, ?, ?, ?, ?)'

            const values = [
                null,
                newprestacaoservico.designacao,
                newprestacaoservico.subtotal,
                newprestacaoservico.horas_estimadas,
                newprestacaoservico.id_prestador,
                newprestacaoservico.preco_hora,
                newprestacaoservico.estado,
                newprestacaoservico.id_orcamento,
                newprestacaoservico.enabled,
                newprestacaoservico.created_at,
                newprestacaoservico.update_at,
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
            const query = 'SELECT * FROM tbl_prestacao_servico'

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = 'SELECT * FROM tbl_prestacao_servico WHERE id = ?'

            const value = [id]

            const rows = db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, prestacaoservicoAtualizado: prestacao_servicoType) {
        try {
            const query = `UPDATE tbl_prestacaoservico
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
                prestacaoservicoAtualizado.designacao,
                prestacaoservicoAtualizado.subtotal,
                prestacaoservicoAtualizado.horas_estimadas,
                prestacaoservicoAtualizado.id_prestador,
                prestacaoservicoAtualizado.preco_hora,
                prestacaoservicoAtualizado.estado,
                prestacaoservicoAtualizado.id_orcamento,
                prestacaoservicoAtualizado.enabled,
                prestacaoservicoAtualizado.created_at,
                prestacaoservicoAtualizado.update_at,
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
            const query = `DELETE FROM  tbl_prestacaoservico WHERE id =?`

            const value = [id]

            const rows: any = await db.execute(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows
        } catch (error) {
            console.log(error)
            return null
        }
    },


}
