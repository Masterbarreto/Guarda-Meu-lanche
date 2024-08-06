import express from 'express';
import { loginController, registerController, getUserProfileController, logoutController, updateUserProfileController, updatePasswordControler, updateProfilePicController} from '../controllers/userController.js';
import { isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from '../middlewares/multer.js';

//Router object
const router = express.Router();

//routes
//register
router.post('/register', registerController)

//login
router.post('/login', loginController);

//profile
router.get('/profile', isAuth,getUserProfileController);

//logout 
router.get("/logout", isAuth, logoutController);

//update profile 
router.put('/profile-update', isAuth, updateUserProfileController);

//update password 
router.put('/update-password', isAuth, updatePasswordControler) 

// update profile pic
router.put("/update-picture", isAuth, singleUpload, updateProfilePicController);

//export
export default router;