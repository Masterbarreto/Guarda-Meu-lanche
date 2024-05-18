import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required: [true, 'o nome é obrigatório']
    },
    sobrenome:{
        type:String,
        required: [true, 'o sobrenome é obrigatório']
    },
    email:{
        type:String,
        required: [true, 'e-mail é obrigatório'],
        unique: [true, 'e-mail já recebido']
    },
    password:{
        type:String,
        required: [true, 'senha é obrigatório'],
        minlength: [6, 'senha deve ter no mínimo 6 caracteres']
    },
});

export const userMdoel = mongoose.model("Users", userSchema);
export default userMdoel;