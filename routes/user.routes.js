import express from "express";
import { register, login } from "../controllers/user.controllers.js";
import { authenticateToken, verifyAdmin } from '../middleware/auth.js'
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/register", register)
router.post("/login", login);
router.get("/dashboard", authenticateToken, (req, res) => {
    res.send({ 
        message: "welcome to dashboard",
        user: req.user 
    });
});

export default router;