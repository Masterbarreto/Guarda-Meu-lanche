import { BAD_REQUEST, StatusCodes } from "http-status-codes";
import { ValidationError } from "yup";

import { Knex } from "../../knex/knex.js";
import axios from "axios";
import yup from "yup";
import bcrypt from "bcrypt";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("email inválido")
        .required("o email é obrigatório"),
});

const checkEmail = async (email) =>
    await Knex("users").select("email").where({ email }).first();

const checkCode = async (email, code) =>
    await Knex("password_reset_codes").where({ email }).first();

// const handleEmail = async (res, email) => {
//     try {
//     } catch (e) {
//         if (e.name === "ValidationError") {
//             throw {
//                 message: e.message,
//                 status: StatusCodes.BAD_REQUEST,
//             };
//         }
//         throw {
//             message: "erro interno do servidor.",
//             status: StatusCodes.INTERNAL_SERVER_ERROR,
//         };
//     }
// };

// const handleEmailAndCode = async (res, email, code, password) => {
//     const resetData = await checkCode(email);
//     code = String(code);

//     const user = await checkEmail(email);

//     if (!user) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             error: {
//                 message: "email não encontrado.",
//                 status: StatusCodes.NOT_FOUND,
//             },
//         });
//     }
//     if (!resetData) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             error: {
//                 message: "não há código de redefinição para este email.",
//                 status: StatusCodes.NOT_FOUND,
//             },
//         });
//     }
//     console.log(code);

//     if (code !== resetData.verification_code) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             error: {
//                 message: "código inválido.",
//                 status: StatusCodes.BAD_REQUEST,
//             },
//         });
//     }

//     if (password.password !== password.confirm_password) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             error: {
//                 message: "as senhas não coincidem.",
//                 status: StatusCodes.BAD_REQUEST,
//             },
//         });
//     }

//     const passwordHash = await createHash(password.password);
//     console.log(passwordHash);
//     const userFromDatabase = await Knex("users")
//         .where({ email })
//         .update({ passwordHash: passwordHash })
//         .returning("id");
//     return res.status(StatusCodes.OK).json({
//         message: "ok",
//         status: StatusCodes.OK,
//     });
// };

// const createHash = async (password) => {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(String(password), salt);
//         return hash;
//     } catch (err) {
//         throw new Error("Error creating hash password.");
//     }
// };
// const comparePassword = async (password, hash) =>
//     bcrypt.compare(password, hash);

export const sendValidationCode = async (req, res) => {
    try {
        const email = req.query.email;
        const code = req.query.code;

        if (email && !code) {
            await schema.validate({ email });
            const user = await checkEmail(email);
            

            if (!user) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: {
                        message: "email não encontrado.",
                        status: StatusCodes.NOT_FOUND,
                    },
                });
            }
            const base = process.env.EMAIL_API;
            const url = `${base}/send_password_code`;

            await res.status(StatusCodes.OK).json({
                status: 200,
                message: "e-mail enviado com sucesso.",
            });
            const request = await axios.post(url, {
                to: email,
                subject: "Redefinição de senha do app guarda meu lanche.",
            });
        }
        if (email && code) {
            const ok = await checkCode(email);

            if (ok.verification_code != code) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: {
                        message: "rejected",
                        status: StatusCodes.UNAUTHORIZED,
                    },
                });
            }
            return res.status(StatusCodes.OK).json({
                message: "ok",
                status: StatusCodes.OK,
            });
        }
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                message: e.message,
                status: StatusCodes.INTERNAL_SERVER_ERROR,
            },
        });
    }
};
