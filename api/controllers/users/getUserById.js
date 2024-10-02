import yup from "yup";
import { Knex } from "../../knex/knex.js";
import { handleError } from "../handlers/handleServerError.js";
import validation from "../../middlewares/validation.js";
import { StatusCodes } from "http-status-codes";

export const getByIdValidation = validation((schema) => ({
  params: yup
    .object()
    .shape({
      user_id: yup.number().optional(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));
const getUser = async (id) =>
  await Knex("users").select("id", "name", "created_at").where({ id }).first();

export const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await getUser(user_id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({
          error: { message: "usuario não encontrado", status: StatusCodes.NOT_FOUND },
        });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    handleError({ r: res, e: error });
  }
};
