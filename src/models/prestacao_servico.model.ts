import type { promises } from "node:dns"
import db from "../lib/db.js"
import type { PrestacaoServicoByCategoriaType, PrestadorServicoDetalhadoType,  prestacaoServicoType } from "../utils/types.js"
import type { RowDataPacket } from "mysql2"

export const prestacaoServicoModel = {
    async create(newprestacaoServico: prestacaoServicoType) {
        try {
            const query = 'INSERT INTO table_prestacaoServico VALUES (?, ?, ?, ?, ?, ?, ?)'

            const values = [
                null,
                newprestacaoServico.designacao,
                newprestacaoServico.subtotal,
                newprestacaoServico.horas_estimadas,
                newprestacaoServico.id_prestador,
                newprestacaoServico.preco_hora,
                newprestacaoServico.estado,
                newprestacaoServico.id_orcamento,
                newprestacaoServico.enabled,
                newprestacaoServico.created_at,
                newprestacaoServico.update_at,
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
            const query = 'SELECT * FROM tbl_prestacaoServico'

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = 'SELECT * FROM tbl_prestacaoServico WHERE id = ?'

            const value = [id]

            const rows = db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, prestacaoServicoAtualizado: prestacaoServicoType) {
        try {
            const query = `UPDATE tbl_prestacaoServico
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
                prestacaoServicoAtualizado.designacao,
                prestacaoServicoAtualizado.subtotal,
                prestacaoServicoAtualizado.horas_estimadas,
                prestacaoServicoAtualizado.id_prestador,
                prestacaoServicoAtualizado.preco_hora,
                prestacaoServicoAtualizado.estado,
                prestacaoServicoAtualizado.id_orcamento,
                prestacaoServicoAtualizado.enabled,
                prestacaoServicoAtualizado.created_at,
                prestacaoServicoAtualizado.update_at,
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
            const query = `DELETE FROM  tbl_prestacaoServico WHERE id =?`

            const value = [id]

            const rows: any = await db.execute(query, value)

            return rows[0]?.affectedRows === 0 ? null : rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getByIdOrcamento(idOrcamento: string): Promise<prestacaoServicoType | null> {
        try {


            const [rows] = await db.execute<prestacaoServicoType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_prestacao_servico
            WHERE tbl_prestacao_servico.id_orcamento =?`,

                [idOrcamento]
            )

            if (Array.isArray(rows) && rows.length === 0) return null

            return Array.isArray(rows) ? rows[0] as prestacaoServicoType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAllPrestacaoServicoDetalhada(limit: number, offset: number) {
        try {
            const query = `
            SELECT
                ps.id as id_prestacao_servico,
                ps.designacao as descricao,
                u.nome as nome_utilizador,
                u.imail as imail_utilizador,
                s.nome as nome_servico,
                ps.created_at as data_pedido,
                ps.urgente
            FROM tbl_prestacao_servico ps
            INNER JOIN tbl_utilizadores u ON ps.id_utilizador = u.id
            INNER JOIN tbl_servico s ON ps.id_servico = s.id
            ORDER BY ps.created_at DESC
            LIMIT ? OFFSET ?
            `

            const [rows] = await db.execute<PrestadorServicoDetalhadoType[] & RowDataPacket[]>(
                query,
                [
                    limit.toString(),
                    offset.toString()
                ]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as PrestadorServicoDetalhadoType[] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAllPrestacaoServicoByCategoriaDetalhada(limit: number, offset: number, idCategoria: string): Promise<PrestacaoServicoByCategoriaType[] | null> {
        try {
            const query = `
            SELECT DISTINCT
                ps.id as id_prestacao_servico,
                ps.designacao as descricao,
                s.nome as nome_servico,
                c.designacao as nome_categoria,
                c.icone as icone_categoria,
                ps.created_at as data_pedido,
                ps.urgente
            FROM tbl_prestacao_servico ps
            INNER JOIN tbl_categoria c ON c.id = s.id_categoria AND c.id =?
            INNER JOIN tbl_servicos s ON ps.id_servico = s.id
            ORDER BY ps.created_at DESC
            LIMIT ? OFFSET ?
            `

            const [rows] = await db.execute<PrestacaoServicoByCategoriaType[] & RowDataPacket[]>(
                query,

                [
                    idCategoria,
                    limit.toString(),
                    offset.toString()
                ]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as PrestacaoServicoByCategoriaType[] : null
        } catch (err) {
            console.log(err)
            return null
        }
    }

}
