import StatusCodes from "http-status-codes";
import yup from "yup";
import { Knex } from "../../knex/knex.js";
import { handleError } from "../handlers/handleServerError.js";
import validation from "../../middlewares/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const passwordSchema = yup.object().shape({
  old: yup.string().min(6).required(),
  new: yup.string().min(6).required(),
});

export const updateValidation = validation((schema) => ({
  body: yup
    .object()
    .shape({
      email: yup.string().email().optional(),
      password: passwordSchema.optional(),
      age: yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, "A data deve estar no formato yyyy-mm-dd")
        .optional(),
      name: yup.string().optional(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const createHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw new Error("Error creating hash password.");
  }
};

const comparePassword = async (password, hash) => bcrypt.compare(password, hash);

const updateData = async (data, id) => {

  const [user] = await Knex("users")
    .where({ id })
    .update({ ...data })
    .returning("id")
    .then(async (u) => u)
    .catch((e) => {
      return {
        error: {
          message: "erro ao atualizar o usuario",
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        },
      };
    });
  return user;
};

const updateUserFromDatabase = async (id, body) => {
  if (body.password) {
    const user = await checkUser(id);
    const oldPass = body.password.old;
    const newPass = body.password.new;

    const passwordIsValid = await comparePassword(oldPass, user.passwordHash);

    if (passwordIsValid) {

      const { password, ...obj } = body;
      obj.passwordHash = await createHash(newPass);

      const updatedUser = await updateData(obj, id);
      return updatedUser;
    } else {
      return {
        error: {
          message: "senha incorreta",
          status: StatusCodes.FORBIDDEN,
        },
      };
    }
  }

  const updatedUser = await updateData(body, id);

  return updatedUser;
};

const checkUser = async (id) => await Knex("users").where({ id }).first();

export const updateUser = async (req, res) => {
  try {
    const { id } = req.credentials;
    const { body } = req;
    const user = await checkUser(id);

    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        error: {
          message: "usuario não encontrado.",
          status: StatusCodes.NOT_FOUND,
        },
      });

    const updatedUser = await updateUserFromDatabase(id, body);
    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    console.log(error);
    handleError({ r: res, e: error });
  }
};
