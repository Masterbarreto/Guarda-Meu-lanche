import { Knex } from "../../knex/knex.js";
import { StatusCodes } from "http-status-codes";

const getUser = async (id) =>
  Knex("users").select("email", "name", "id", "created_at", "age").where({ id }).first();

const handleError = ({ r, e }) => {

  console.log(e);

  if (e.status) return r.status(e.status).json(e);

  return r.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "erro interno do servidor, por favor tente novamente mais tarde.",
  });
};

export const getProfile = async (req, res) => {
  const { id } = req.credentials;

  try {
    const profile = await getUser(id);
    const error = {
      error: { message: "usuario não encontrado", status: StatusCodes.NOT_FOUND },
    };
    const response = profile ? profile : error;

    return res.status(StatusCodes.OK).json(response);
  } catch (e) {
    handleError({ r: res, e: error });
  }
};
