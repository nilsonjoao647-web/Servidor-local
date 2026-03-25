import db from "../lib/db.js"
import { formatDateDDMMYYYY } from "../utils/date.js";
import { hashPassword } from "../utils/password.js";
import type { UserType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const UserModel = {
    async create(users: UserType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_utilizadores 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    generateUUID(),
                    users.nome,
                    users.numero_identificado,
                    formatDateDDMMYYYY(users.data_nascimento),
                    users.email,
                    users.telefone,
                    users.pais,
                    users.localidade,
                    await hashPassword(users.password),
                    users.enabled,
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

    async allUser() {
        const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")

        return rows
    },

    async getUser(id: string) {

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

    async update(id: string, userAtualizado: UserType) {
        try {
            const query = `
            UPDATE tbl_utilizadores
            SET 
                nome = ?,
                numero_identificacao = ?,
                data_nascimento = ?,
                email = ?,
                telefone = ?,
                pais = ?,
                localidade = ?,
                password = ?,
                enabled = ?,
                updated_at = ?
            WHERE id = ?`

            const values = [
                userAtualizado.nome,
                userAtualizado.numero_identificado,
                formatDateDDMMYYYY(userAtualizado.data_nascimento),
                userAtualizado.email,
                userAtualizado.telefone,
                userAtualizado.pais,
                userAtualizado.localidade,
                await hashPassword(userAtualizado.password),
                userAtualizado.enabled,
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
    }

}