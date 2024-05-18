import User from "../models/userModel.js";

export const registerController = async (req, res) => {
try {
    const { name, sobrenome, email, password } = req.body;
    // validation 
    if (!name ||!sobrenome ||!email ||!password) {
    return res.status(400).send({
        success: false,
        message: "Please Provide all Fields"
    });
    }
    const newUser = new User({
    name,
    sobrenome,
    email,
    password
    });
    await newUser.save();
    res.status(201).send({
    success: true,
    message: 'Sucesso no registro, faça login',
    user: newUser,
    });
} catch (error) {
    console.log(error);
    res.status(500).send({
    success: false,
    message: 'Error in Register Api',
    error: error.message,
    });
}
};