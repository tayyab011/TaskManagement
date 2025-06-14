import express from "express";
const router = express.Router();
import * as userController from "../app/controllers/userController.js";
import * as taskController from "../app/controllers/taskController.js";
import authMiddleware from "../app/middlewares/authMiddleware.js";


router.post("/register", userController.register);
router.post("/login", userController.login);
/* router.get("/getMyProfile",authMiddleware, userController.getMyProfile); */
router.put("/updateProfile",authMiddleware,userController.updateProfile);
router.get("/logout",authMiddleware, userController.logout);
router.get("/verifyEmail/:email", userController.verifyEmail);
router.get("/verifyOtp/:email/:otp", userController.verifyOtp);
router.post("/resetPass/:email/:otp/:password", userController.resetPass);



router.post("/createTask",authMiddleware, taskController.createTask);
router.delete("/deleteTask/:id",authMiddleware, taskController.deleteTask);
router.put("/updateTask/:id",authMiddleware, taskController.updateTask);
router.get("/listStatusTask/:status",authMiddleware, taskController.listStatusTask);
router.get("/taskStatusCount", authMiddleware, taskController.taskStatusCount);



export default router;
