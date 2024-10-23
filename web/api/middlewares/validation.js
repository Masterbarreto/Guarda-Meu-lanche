import { StatusCodes } from "http-status-codes";
import { ValidationError } from "yup";

const validation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas((schema) => schema);
  const errorResult = {};

  if (schemas.params) {
    const params = req.params;

    for (const [key, value] of Object.entries(params)) {
      if (!isNaN(value)) {
        params[key] = parseInt(value);
      }
    }
  }

  if (schemas.query) {
    const query = req.query;

    for (const [key, value] of Object.entries(query)) {
      if (!isNaN(value)) {
        query[key] = parseInt(value);
        
      }
    }
  }
  for (const [key, schema] of Object.entries(schemas)) {
    try {
      await schema.validate(req[key], {
        abortEarly: false,
        strict: true,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const err = {};
        error.inner.forEach((errItem) => {
          if (errItem.path) {
            err[errItem.path] = errItem.message;
          }
          err[errItem.type] = errItem.message;
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
