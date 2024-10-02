import yup from "yup";
import validation from "../../middlewares/validation.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cpf } from "cpf-cnpj-validator";
import { generateCode } from "../../shared/generatecode.js";

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

const createToken = async (user) => {
  const token = await jwt.sign(
    {
      id: user.id,
      email: user.email,
      cpf: user.cpf,
      role: "user",
      verified: false,
      code,
    },
    secret,
    { expiresIn }
  );

  return token;
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
    .insert({ ...rest, passwordHash, validation_code })
    .returning(["id", "email", "cpf", "validation_code"]);

  // const token = await createToken(user);

  const id = user.id;

  // if (token) {
  //   const tokenDecoded = jwt.decode(token);
  //   await Knex("tokens").insert({
  //     user_id: id,
  //     token,
  //     expires_at: new Date(tokenDecoded.exp * 1000),
  //     type: "user",
  //   });
  // }
  return { id, validation_code };
};

export const create = async (req, res) => {
  try {
    const userResponse = await createUser(req.body);
    if (userResponse.errors) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: userResponse.errors });
    }
    return res.status(StatusCodes.CREATED).json(userResponse);
  } catch (e) {
    console.log(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
};
