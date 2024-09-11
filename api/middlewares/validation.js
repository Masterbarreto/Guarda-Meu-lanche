import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'yup'

const validation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas(schema => schema);
    const errorResult = {};

    for (const [key, schema] of Object.entries(schemas)) {
        try {

            await schema.validate(req[key], {
                abortEarly: false,
                strict: true
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                const err = {};
                error.inner.forEach(errItem => {
                    if (errItem.path) {
                        err[errItem.path] = errItem.message;
                    }
                });
                errorResult[key] = err;
            }
        }
    }

    if (Object.keys(errorResult).length === 0) {
        return next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorResult,
        });
    }
};

export default validation;
