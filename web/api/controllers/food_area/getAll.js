import { Knex } from "../../knex/knex.js";
import { handleError } from "../handlers/handleServerError.js";
import { StatusCodes } from "http-status-codes";

const getAllAreas = async ()=> await Knex("food_area").select("*")

export const getAll = async (req, res) => {

  try {
    const areas = await getAllAreas()

    if(!areas){
        return res.status(StatusCodes.NOT_FOUND).json({
            error:{
                message:"nenhuma praça de alimentçao encontrada.",
                status:StatusCodes.NOT_FOUND
            }
        })
    }
    return res.status(StatusCodes.OK).json({length: areas.length ,areas})
  } catch (e) {
    handleError({ r: req, e });
  }
};
