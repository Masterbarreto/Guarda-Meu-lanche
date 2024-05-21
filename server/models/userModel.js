import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";


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
    profilePic: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
},
    {timestamps: true} 
);

//Funções
//função hash
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

  // compare function
userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

  //JWT TOKEN
userSchema.methods.generateToken = function () {
    return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
    });
};

export const userMdoel = mongoose.model("Users", userSchema);
export default userMdoel;













