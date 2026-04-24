import type { create } from "node:domain";
import db from "../lib/db.js";
import type { ServicoDBType, ServicoDetalhadoType } from "../utils/types.js";
import type { RowDataPacket } from "mysql2";

export const ServiceModel = {
    async create(newService: ServicoDBType) {
        try {
            const query = 'INSERT INTO table_servicos (id, nome, descricao, categoria, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'

            const values = [
                null,
                newService.nome,
                newService.descricao,
                newService.categoria,
                newService.enabled,
                new Date(),
                new Date()
            ]

            const rows = await db.execute(query, values)

            // select last id
            const queryLastId = `SELECT * FROM table_servicos ORDER BY id DESC LIMIT 1`
            const [lastService] = await db.execute<ServicoDBType[] & RowDataPacket[]>(queryLastId)

            return lastService[0] as ServicoDBType
            
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


    async getallServicoDetalhado(limit: number, offset: number): Promise<ServicoDetalhadoType[] | null> {
        try {
            const query = `
            SELECT DISTINCT
                s.id as id_servico
                s.nome as servico_nome
                s.descricao as servico_descricao
                c.designacao as designacao_categoria
                c.icone as icone_categoria
                e.id as id_empresa
                e.designacao as designacao_empresa
                e.icone as icone_empresa
                s.enabled 
                FORM tbl_servicos s
                INNER JOIN tbl_categoria c ON c.id = s.id_categoria
                INNER JOIN tbl_prestacao_servico ps ON s.id = ps.id_servico
                INNER JOIN tbl_empresa c ON c.id = s.id_empresa
                LIMIT ? OFFSET?

                `

            const values = [limit, offset]

            const [rows] = await db.execute<ServicoDetalhadoType[] & RowDataPacket[]>(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows as ServicoDetalhadoType[] : null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}