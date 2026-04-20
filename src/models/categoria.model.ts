import db from "../lib/db.js"
import { formatDateDDMMYYYY } from "../utils/date.js";
import { hashPassword } from "../utils/password.js";
import type { CategoriaDBType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const CategoriaModel = {
    async create(categorias: CategoriaDBType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_categoria
            VALUES (?, ?, ?, ?, ?)`,
                [
                    null,
                    categorias.designacao,
                    categorias.icone,
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

    async allCategoria() {
        const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")

        return rows
    },

    async getCategoria(id: string) {

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

    async update(id: string, categoriaAtualizado: CategoriaDBType) {
        try {
            const query = `
            UPDATE tbl_categoria
            SET 
                id = ?,
                designacao = ?,
                icone = ?,
                enabled = ?,
                updated_at = ?
            WHERE id = ?`

            const values = [
                categoriaAtualizado.id,
                categoriaAtualizado.designacao,
                categoriaAtualizado.icone,
                new Date(),
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

    async getByEmail(email: string): Promise<CategoriaDBType | null> {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_utilizadores
                WHERE tbl_utilizadores.email = ?`,
                [email]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as CategoriaDBType : null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

