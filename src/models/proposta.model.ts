import type { create } from "node:domain";
import db from "../lib/db.js";
import type { PropostaDBType, propostaType } from "../utils/types.js";
import type { RowDataPacket } from "mysql2";
import { id } from "date-fns/locale";
import { generateUUID } from "../utils/uuid.js";

export const PropostaModel = {
    async create(Proposta: propostaType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_propostas
                VALUES(?, ?, ?, ?, ?, ?, ?, ?,)`,

                [
                    generateUUID(),
                    Proposta.id_prestacao_servico,
                    Proposta.preco_hora,
                    Proposta.hora_estimadas,
                    Proposta.estado,
                    Proposta.enabled,
                    new Date(),
                    new Date()
                ]
            )
            console.log({ rows })
            return rows
        }catch(err){
            console.log(err)
            return null
        }
    },

    async getAll() {
    try {
        const query = 'SELECT * FROM tbl_proposta'

        const rows = await db.execute(query)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

    } catch (error) {
        console.log(error)
        return null
    }
},

    async get(id: string): Promise < PropostaDBType | null > {
    try {
        const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>(
            `SELECT DISTINC
                pt.*,
                pr.id as owner
                FROM tbl_proposta pt
                INNER JOIN tbl_prestadores p ON pt.id_prestador = pr.id
                INNER JOIN tbl_utilizadores u ON pr.id_utilizador = u.id
                `,

            [id]
        )

            if(Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0]! : null

    } catch(error) {
        console.log(error)
        return null
    }
},

    async update(id: string, PropostaAtualizado: propostaType) {
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

    async delete (id: string) {
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

    async getByIdPrestacaoServico(idPrestacaoServico: string): Promise < PropostaDBType[] | null > {
    try {
        const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>(
            `SELECT * FROM tbl_proposta
                WHERE id_prestacao_servico = ?`,
            [idPrestacaoServico]
        )

            if(!Array.isArray(rows) || rows.length === 0) return null
            return rows
    } catch(err) {
        console.log(err)
        return null
    }
},

    async acceptProposal(id: string) {
    try {
        const [rows] = await db.execute(
            `UPDATE tbl_propostas`
        )
    } catch (err) {
        console.log(err)
        return null
    }
}
}