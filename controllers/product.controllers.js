import Product from "../models/product.js";
import path from 'path';
import fs from 'fs';

// Read - Dapat diakses member dan admin
export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.id }
        });
        if (product) {
            res.set('Content-Type', product.type);
            res.send(product.image);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Create - Hanya admin
export const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const product = await Product.create({
            name,
            description,
            price,
            image: imagePath
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update - Hanya admin
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const updateData = { name, description, price };
        if (imagePath) {
            // Hapus gambar lama jika ada
            const oldProduct = await Product.findByPk(req.params.id);
            if (oldProduct && oldProduct.image) {
                const oldImagePath = path.join(__dirname, '..', oldProduct.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.image = imagePath;
        }

        await Product.update(updateData, {
            where: { id: req.params.id }
        });
        res.json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete - Hanya admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product && product.image) {
            const imagePath = path.join(__dirname, '..', product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        await Product.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
