import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Knex } from "../knex/knex.js";

/** Checa o tipo de token
 * @param {('user'|'restaurant')} role
 *
 * @example
 * app.get('/rote', checkToken('user'), (req, res) => {
 *    res.send('Acesso permitido');
 * });
 *
 */

export const checkToken = (role) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: { message: "não autorizado.", status: StatusCodes.UNAUTHORIZED },
      });
    }

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer")
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: { message: "não autorizado.", status: StatusCodes.UNAUTHORIZED },
      });

    try {
      const secret = process.env.JWT_SECRET;

      jwt.verify(token, secret, async (err, decode) => {
        if (err) {
          const { message } = err;

          if (err.name == "TokenExpiredError") {
            return res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ error: { message:"token expirado.", expired_at: err.expiredAt,status: StatusCodes.BAD_REQUEST} });
          }

          return res.status(StatusCodes.UNAUTHORIZED).json({ message });
        }

        if (decode.role != role) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            error: { message: "token incompatível.", status: StatusCodes.UNAUTHORIZED },
          });
        }

        if (decode.role == "user") {
          const id = decode.id;
          const user = await Knex("users").where({ id }).first();

          if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
              error: {
                message: "usuário não encontrado.",
                status: StatusCodes.NOT_FOUND,
              },
            });
          }
        }
        req.credentials = decode;
        console.log(decode);

        next();
      });
    } catch (error) {
      return res.status(400).json({ message: "token inválido!" });
    }
  };
};
