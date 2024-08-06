
import { token } from "morgan";
import userModel from "../models/userModel.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/features.js"

export const registerController = async (req, res) => {
    try {
    const { name, email, password, sobrenome } = req.body;
      // validation
    if (!name ||!email ||!password ||!sobrenome) {
        return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
        });
    }
      // check existing user
    const existingUser = await userModel.findOne({ email });
      // validation
    if (existingUser) {
        return res.status(500).send({
        success: false,
        message: "email already taken",
        });
    }
    const user = await userModel.create({
        name,
        email,
        password,
        sobrenome,
    });
    res.status(201).send({
        success: true,
        message: "Registeration Success, please login",
        user,
    });
    } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Error In Register API",
        error,
    });
    }
};

  //LOGIN
    export const loginController = async (req, res) => {
    try {
    const { email, password } = req.body;
      //validation
    if (!email || !password) {
        return res.status(500).send({
        success: false,
        message: "Please Add Email OR Password",
        });
    }
      // check user
    const user = await userModel.findOne({ email });
      //user valdiation
    if (!user) {
        return res.status(404).send({
        success: false,
        message: "USer Not Found",
        });
    }
      //check pass
    const isMatch = await user.comparePassword(password);
      //valdiation pass
    if (!isMatch) {
        return res.status(500).send({
        success: false,
        message: "invalid credentials",
        });
    }
      //teken
    const token = user.generateToken();

    res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "development" ? true : false,
    httpOnly: process.env.NODE_ENV === "development" ? true : false,
    sameSite: process.env.NODE_ENV === "development" ? true : false,
    })
    .send({
    success: true,
    message: "Login Successfully",
    token,
    user,
    });
} catch (error) {
console.log(error);
res.status(500).send({
    success: "false",
    message: "Error In Login Api",
    error,
});
}
};

  // GET USER PROFILE
export const getUserProfileController = async (req,res) => {
    try { 
        const user = await userModel.findById(req.user._id);
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "User Profile fetched successfully",
            user,
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success: "false",
            message: "Error In PRofile Api",
            error,
        });
    }
};

// LOGOUT
export const logoutController = async (req, res) => {
    try {
    res
        .status(200)
        .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
        })
        .send({
        success: true,
    message: "Logout SUccessfully",
        });
    } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Error In LOgout API",
        error,
    });
    }
};


//update user profile 

export const updateUserProfileController = async (req,res) => {
    try {
        const user = await userModel.findById(req.user._id)
        const {name, email, password} =req.body
        //validation + update 
        if(name) user.name = name
        if(email) user.email = email
        if(password) user.password = password
        //save user 
        await user.save();
        res.status(200).send({
            success: true, 
            message: "User Profile Updated Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Error In update profile API",
        error,
        }
    )};
};

//update user password 
export const updatePasswordControler = async (req, res) => {
    try{
        const user = await userModel.findById(req.user._id)
        const {oldPassword, newPassword} = req.body
        //validation 
        if(!oldPassword || !newPassword ) {
            return res.status(500).send({
                success: false,
                message: "Please Enter Old Password and New Password",
            })
        }
        //old check
        const isMatch = await user.comparePassword(oldPassword)
        //validação 
        if(!isMatch){
            return res.status(500).send({
                success: false,
                massage: 'invalid old Password' 
            })
        }
        user.password = newPassword
        await user.save()
        res.status(200).send({
            success:true,
            message: "Password Updated Successfully",
        })
    } catch (error){
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Error In update password API",
        error,
        }
    )};
}

/// Update user profile photo
export const updateProfilePicController = async (req, res) => {
    try {
    const user = await userModel.findById(req.user._id);
      // file get from client photo
    const file = getDataUri(req.file);
      // delete prev image
    await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
      // update
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    user.profilePic = {
        public_id: cdb.public_id,
        url: cdb.secure_url,
    };
      // save func
    await user.save();

    res.status(200).send({
        success: true,
        message: "profile picture updated",
    });
    } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Error In update profile pic API",
        error,
    });
    }
};




































































































































































































































































































































































    

