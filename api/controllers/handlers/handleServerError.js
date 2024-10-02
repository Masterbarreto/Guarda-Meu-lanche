import { StatusCodes } from "http-status-codes";
export const handleError = ({ r, e }) => {
    console.log(e);
  
    if (e.status) return r.status(e.status).json(e);
  
    return r.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "erro interno do servidor, por favor tente novamente mais tarde.",
    });
  };