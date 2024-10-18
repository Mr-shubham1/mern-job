import express from "express";
import { login, logout, register, updateprofile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multermiddleware.js";

const router = express.Router();

router.route("/register").post(upload.single('file'),register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,updateprofile);   // wahi update kar payega jo authenticated ho
router.route("/logout").get(logout);

export default router;