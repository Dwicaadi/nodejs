import express from "express";
import db from "./config/config.js";
import cors from "cors";
import figlet from "figlet";
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//database
try {
    await db.authenticate();
    console.log("database ok");
    console.log("=================================");
    console.log("✅ Semua tabel berhasil dimuat!" );
    console.log("=================================");
} catch (error) {
    console.log("belum konek", error);
}
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//routes
app.use('/api/', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);

//server
app.listen(5000, () => {
    figlet("DWICA", function(err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);
        console.log("\nServer is running on port 5000"); 
        console.log("http://localhost:5000");
    });
});
