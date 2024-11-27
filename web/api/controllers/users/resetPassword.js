import { BAD_REQUEST, StatusCodes } from "http-status-codes";
import { ValidationError } from "yup";

import { Knex } from "../../knex/knex.js";
import axios from "axios";
import yup from "yup";
import bcrypt from "bcrypt";
import validation from "../../middlewares/validation.js";

export const resetPasswordValidation = validation((schema) => ({
    body: yup
        .object()
        .shape({
            new_password: yup.string().min(6).required(),
            confirm_password: yup.string().min(6).required(),
            code: yup.number().meta(5).required(),
            email: yup.string().email().required(),
        })
        .noUnknown(true, "chaves adicionais não são permitidas."),
}));

const checkEmail = async (email) =>
    await Knex("users").select("email").where({ email }).first();

const checkCode = async (email) =>
    await Knex("password_reset_codes").select("*").where({ email }).first();

const createHash = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(String(password), salt);
        return hash;
    } catch (err) {
        throw new Error("Error creating hash password.");
    }
};
const changePassword = async (email, password) => {
    const passwordHash = await createHash(password);
    const user = await Knex("users")
        .where({ email })
        .update({ passwordHash })
        .returning("id");
    return user;
};

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

// const comparePassword = async (password, hash) =>
//     bcrypt.compare(password, hash);

export const resetPassword = async (req, res) => {
    try {
        const { email, new_password, confirm_password, code } = req.body;
        const user = await checkEmail(email);

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: {
                    message: "email não encontrado.",
                    status: StatusCodes.NOT_FOUND,
                },
            });
        }

        if (new_password !== confirm_password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: {
                    message: "as senhas precisam ser iguais.",
                    status: StatusCodes.BAD_REQUEST,
                },
            });
        }
        const dataCode = await checkCode(email);

        if (dataCode.verification_code !== String(code)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: {
                    message: "código inválido.",
                    status: StatusCodes.BAD_REQUEST,
                },
            });
        }

        const response = await changePassword(email, new_password);

        return res.status(StatusCodes.OK).json({
            message: "ok",
            status: StatusCodes.OK,
        });
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                message: e.message,
                status: StatusCodes.INTERNAL_SERVER_ERROR,
            },
        });
    }
};
