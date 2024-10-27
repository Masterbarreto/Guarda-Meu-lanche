import yup from "yup";
import validation from "../../middlewares/validation.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cpf } from "cpf-cnpj-validator";
import { generateCode } from "../../shared/generatecode.js";
import axios from "axios";
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               cpf:
 *                 type: string
 *               age:
 *                 type: string
 *                 format: date
 *                 example: "2000-09-30"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    example: "1"
 *       400:
 *         description: Dados inválidos
 */

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRATION;
// #region user

export const createValidation = validation((schema) => ({
    body: yup
        .object()
        .shape({
            email: yup.string().email().required(),
            cpf: yup
                .string()
                .length(11)
                .required()
                .test("isValid", "cpf invàlido", (val) => cpf.isValid(val)),
            password: yup.string().min(6).required(),
            age: yup
                .string()
                .matches(/^\d{4}-\d{2}-\d{2}$/, "A data deve estar no formato yyyy-mm-dd")
                .required(),
            name: yup.string().required(),
            role: yup.string().oneOf(['Aluno', 'Funcionário', 'Administrador']).required(),
        })
        .noUnknown(true, "chaves adicionais não são permitidas."),
}));
const code = generateCode();

const createHash = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        throw new Error("Error creating hash password.");
    }
};

// #endregion

const createUser = async (body) => {
    const { password, ...rest } = body;
    const { cpf, email } = rest;
    const errors = [];

    const checkExists = async (fields, table = "users") => {
        for (const [field, value] of Object.entries(fields)) {
            const exists = await Knex(table)
                .select("id")
                .where({ [field]: value })
                .first();

            if (exists) {
                errors.push(`${field} já cadastrado(a).`);
            }
        }
    };

    await checkExists({ cpf, email });
    if (errors.length > 0) {
        return { errors };
    }

    const passwordHash = await createHash(password);

    const validation_code = code;

    const [user] = await Knex("users")
        .insert({ ...rest, passwordHash, validation_code , role: body.role})
        .returning(["id", "email", "cpf", "validation_code", "name", "role"]);

    const id = user.id;

    user.validation_code = validation_code
    return user;
};

export const create = async (req, res) => {
    try {
        const userResponse = await createUser(req.body);
        if (userResponse.errors) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: userResponse.errors });
        }
            /* parete de envio de email
        const api = process.env.EMAIL_API + "/send_code"
        const BASE_URL = process.env.BASE_URL
        const response = await axios.post(api,
            {
                "to": userResponse.email,
                "subject": "Criação de conta.",
                "body": " ",
                "verification_code": userResponse.validation_code,
                "name": userResponse.name,
                "url": `${BASE_URL}/validation/?code=${userResponse.validation_code}&user_id=${userResponse.id}`
            }
        )
        console.log(response.data);
        */
        return res.status(StatusCodes.CREATED).json({ id: userResponse.id, validation_code: userResponse.validation_code });
    } catch (e) {
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
    }

};
