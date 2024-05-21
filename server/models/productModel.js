import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name is required"]
    },
    description: {
        type: String,
        required: [true, "product description is required"]
    },
    price: {
        type: Number,
        required: [true, "product price is required"]
    },
    stock: {
        type: Number,
        required: [true, "product stock is required"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
images: [
    {
    public_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    },
],
});

const ProductModel = mongoose.model('Product', productSchema);

productSchema.statics.create = async function (data) {
    return this.create(data);
};

export const productModel = mongoose.model("Products", productSchema);
export default productSchema;