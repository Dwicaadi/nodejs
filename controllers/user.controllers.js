import Users from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

//register
export const register = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, phone, password, role } = req.body;

        // Check if email or phone already exists
        const existingUser = await Users.findOne({
            where: {
                [Op.or]: [{ email: email }, { phone: phone }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: "Email atau nomor telepon sudah terdaftar" });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await Users.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            created_at: new Date(),
            updated_at: new Date(),
        });

        res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
};


//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email dan password harus diisi" });
        }
        // cek apakah user ada
        const user = await Users.findOne({ where: { email: email } });
        if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
        
        // cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Password salah" });
        
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
                role: user.role
            }, 
            process.env.JWT_SECRET
        );
        //kirim token
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
}
