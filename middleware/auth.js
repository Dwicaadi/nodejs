import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// untuk token
export const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send("Tidak memiliki akses");

    try{
        //verifikasi token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).send("Token tidak valid");
    }
}

// untuk admin
export const verifyAdmin = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Akses ditolak. Hanya untuk admin" });
        }
    });
};