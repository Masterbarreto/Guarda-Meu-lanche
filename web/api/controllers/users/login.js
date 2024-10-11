import { StatusCodes } from "http-status-codes";
import yup from "yup";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Knex } from "../../knex/knex.js";
import validation from "../../middlewares/validation.js";
import { handleError } from "../handlers/handleServerError.js";

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRATION;

export const loginValidation = validation((schema) => ({
  body: yup
    .object()
    .shape({
      email: yup.string().email().required(),

      password: yup.string().min(6).required(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const comparePassword = async (password, hash) => bcrypt.compare(password, hash);

const getUser = async (email) => await Knex("users").where({ email }).first();

const createToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      cpf: user.cpf,
      role: "user",
      verified: true,
    },
    secret,
    { expiresIn }
  );

  return token;
};

const decodeToken = (token) => jwt.decode(token);

const resetToken = async (user_id) => {
  const oldToken = await Knex("tokens").where({ user_id }).first();

  if (oldToken) {
    await Knex("tokens").where({ user_id }).delete();
  }
};

const insertTokenOnDatabase = async (token, user_id) => {
  await resetToken(user_id);
  const tokenDecoded = decodeToken(token);
  const [tokenResponse] = await Knex("tokens").insert({
    token,
    user_id,
    expires_at: new Date(tokenDecoded.exp * 1000),
    type: "user",
  }).returning(["created_at","expires_at","token","type"])

  return tokenResponse;
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await getUser(email);
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: {
          message: "usuario não encontrado.",
          status: StatusCodes.BAD_REQUEST,
        },
      });
    }

    if (!(await comparePassword(password, user.passwordHash))) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: {
          message: "senha incorreta.",
          status: StatusCodes.BAD_REQUEST,
        },
      });
    }

    if (!user.is_verified) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: {
          message: "usuario não verificado.",
          status: StatusCodes.BAD_REQUEST,
        },
      });
    }
    const token = createToken(user);
    const tokenResponse = await insertTokenOnDatabase(token, user.id);
    return res.status(StatusCodes.OK).json(tokenResponse);
  } catch (e) {
    handleError({ r: res, e });
  }
};
