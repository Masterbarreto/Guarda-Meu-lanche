import yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken'


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

        const { authorization } = req.headers

        if (!authorization) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'nao autorizado.' })
        }

        const [type, token] = authorization.split(' ')
        if (type !== "Bearer") return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'nao autorizado.' })


        try {
            const secret = process.env.JWT_SECRET


            jwt.verify(token, secret, (err, decode) => {
                if (err) {
                    const { message } = err
                    return res.status(400).json({ message })
                }

                if (decode.role != role) {
                    return res.status(400).json({ message: "token incompativel" })

                }
                req.credentials = decode
                next()
            })

        } catch (error) {
            return res.status(400).json({ message: 'Token inválido!' })
        }

    }
}