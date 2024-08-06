import productModel from "../models/productModel.js";
import cloudinary from "cloudinary";
import { getDataUri } from "./../utils/features.js";

// GET ALL PRODUCTS
export const getAllProductsController = async (req, res) => {
  const { keyword, category } = req.query;
  try {
    const products = await productModel
      .find({
        name: {
          $regex: keyword ? keyword : "",
          $options: "i",
        },
        // category: category ? category : null,
      })
      .populate("category");
    res.status(200).send({
      success: true,
      message: "all products fetched successfully",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Products API",
      error,
    });
  }
};

// GET TOP PRODUCT
export const getTopProductsController = async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).send({
      success: true,
      message: "top 3 products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get TOP PRODUCTS API",
      error,
    });
  }
};

// GET SINGLE PRODUCT
export const getSingleProductController = async (req, res) => {
  try {
    // get product id
    const product = await productModel.findById(req.params.id);
    //valdiation
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Product Found",
      product,
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get single Products API",
      error,
    });
  }
};

//criação de produto 

export const createProductController = async (req, res) => {
  try {
    const {name,description,price,stock} = req.body;
    //validação 
    if(!name ||!description ||!price||!stock){
      return res.status(500).send({
        success: false,
        massage:'please provide all fields',
      });
    }
    if(!req.file){
      return res.status(500).send({
        success: false,
        massage:'please provide image',
      })
    }
    const file = getDataUri(req.file)
    const cbd = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cbd.public_id,
      url: cbd.secure_url
    }
    await productModel.create({
      name,
      description,
      price,
      stock,
      image: [image]
    })

    res.status(201).send({
      success: true,
      massage:'product created'

    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get single Products API",
      error: error.message,
    });
  }
}









































