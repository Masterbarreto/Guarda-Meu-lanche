import yup from 'yup';
import validation from '../../middlewares/validation.js';
import { Knex } from '../../knex/knex.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cpf } from "cpf-cnpj-validator"

const maxDecimals = (value) => {
    if (value === undefined || value === null || value === '') {
        return false;
    }
    const regex = /^\d+\.\d{2}$/;
    return regex.test(value.toString());
};

export const createValidation = validation((schema) => ({
    body: yup.object().shape({
        name: yup.string().required(),
        desc: yup.string().max('250').required(),
        price: yup
            .number()
            .required()
            .positive()
            .test(
                'max-decimals',
                'o preço precisa ter duas casas decimais',
                value => maxDecimals(value, 2)
            )
        ,
        url: yup.string().url().required()
    })
}));

const decodeToken = (token) => jwt.decode(token)

export const createItem = async (body) => {
    const { price, name, desc, url, restaurant_id } = body
    try {
        const item = await Knex('menu_item').insert({ restaurant_id, price, name, desc, url }).returning('id')
        return item[0]
    } catch (e) {
        console.log(e)
        throw {
            status: StatusCodes.BAD_REQUEST,
            error: 'erro ao criar o produto'
        }
    }
}
export const create = async (req, res,) => {
    try {
        const response = await createItem({ restaurant_id: req.credentials.id, ...req.body })
        return res.status(StatusCodes.CREATED).json(response)
    } catch (e) {

        if (e.status) {
            return res.status(e.status).json(e)
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'erro interno do servidor, por favor tente novamente mais tarde.' })

    }
}
