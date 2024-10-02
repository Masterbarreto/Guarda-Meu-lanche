import StatusCodes from "http-status-codes";
import yup from "yup";
import { Knex } from "../../knex/knex.js";
import { handleError } from "../handlers/handleServerError.js";
import validation from "../../middlewares/validation.js";

const passwordSchema = yup.object().shape({
  old: yup.string().min(6).required(),
  new: yup.string().min(6).required(),
});

export const deleteValidation = validation((schema) => ({
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

const checkUser = async (id) => await Knex("users").where({ id }).first();
const deleteUserFromDatabase = async (id) => {
  try {
    const res = await Knex("users").where({ id }).del();

    if (res === 0) {
      return {
        error: {
          message: "erro ao deletar usuario",
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        },
      };
    }
    if (res === 1) {
      return {
        message: "ok",
        status: StatusCodes.OK,
      };
    }
  } catch (e) {
    return {
      error: {
        message: "erro ao processar sua solicitação",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    };
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.credentials;

    const user = await checkUser(id);

    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        error: {
          message: "usuario não encontrado.",
          status: StatusCodes.NOT_FOUND,
        },
      });

    const deletedUser = await deleteUserFromDatabase(id);
    return res.status(StatusCodes.OK).json(deletedUser);
  } catch (error) {
    console.log(error);
    handleError({ r: res, e: error });
  }
};
