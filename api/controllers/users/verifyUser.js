import yup from "yup";
import validation from "../../middlewares/validation.js";
import { handleError } from "../handlers/handleServerError.js";
import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";
import path from "path";

export const verifyQueryValidation = validation((schema) => ({
  query: yup
    .object()
    .shape({
      user_id: yup.number().required(),
      code: yup.string().length(5).required(),
    })
    .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const checkUser = async (id) => {
  return await Knex("users").where({ id }).first();
};

const validateCode = async (user_id, code) => {
  const [user] = await Knex("users")
    .where({ id: user_id, validation_code: code, is_verified: false })
    .update({ is_verified: true })
    .returning(["id", "is_verified"]);

  if (!user) {
    return {
      error: {
        message: "codigo invàlido ou ja verificado.",
        status: StatusCodes.BAD_REQUEST,
      },
    };
  }

  return user;
};

export const verifyUser = async (req, res) => {
  try {
    const { code, user_id } = req.query;

    const user = await checkUser(user_id);
    if (!user) {
      return res.sendFile(path.resolve("public", "pages", "user_not_found.html"));
    }

    const userValidated = await validateCode(user_id, code);
    if (userValidated.error) {

      return res.sendFile(path.resolve("public", "pages", "user_not_found.html"));
    }

    return res.sendFile(path.resolve("public", "pages", "verified.html"));
  } catch (e) {
    return res.sendFile(path.resolve("public", "pages", "500.html"));
  }
};
