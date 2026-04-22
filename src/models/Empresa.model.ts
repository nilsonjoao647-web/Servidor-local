import db from "../lib/db.js"
import { formatDateDDMMYYYY } from "../utils/date.js";
import { hashPassword } from "../utils/password.js";
import type { EmpresaDBType } from "../utils/types.js"; 
import { generateUUID } from "../utils/uuid.js";

export const EmpresaModel = {
    async create(empresas: EmpresaDBType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_empresas 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    generateUUID(),
                    null,
                    empresas.designacao,
                    empresas.nif,
                    empresas.icone,
                    empresas.id_utilizador,
                    empresas.localizacao,
                    empresas.enabled,
                    new Date(),
                    new Date()
                ]
            )
            console.log({ rows })
            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAll() {
        const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")

        return rows
    },

    async get(id: string) {

        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_utilizadores 
        WHERE tbl_utilizadores.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, empresaAtualizado: EmpresaDBType) {
        try {
            const query = `
            UPDATE tbl_empresas
            SET 
                nome = ?,
                designacao = ?,
                nif = ?,
                icone = ?,
                id_utilizador = ?,
                localizacao = ?,
                enabled = ?,
                created_at = ?,
                updated_at = ?
            WHERE id = ?`

            const values = [
                empresaAtualizado.designacao,
                empresaAtualizado.nif,
                empresaAtualizado.icone,
                empresaAtualizado.id_utilizador,
                empresaAtualizado.localizacao,
                empresaAtualizado.enabled,
                empresaAtualizado.created_at,
                new Date(),
                id
            ]

            const rows = await db.execute(query, values)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async delete(id: string) {
        try {
            const query = `
            DELETE FROM tbl_utilizadores
            WHERE id = ?
        `

            const values = [id]

            const rows: any = await db.execute(query, values)

            return rows[0].affectedRows === 1 ? null : rows[0]
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getByEmail(email: string): Promise<EmpresaDBType | null> {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_utilizadores
                WHERE tbl_utilizadores.email = ?`,
                [email]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as EmpresaDBType : null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

