import Order from "../models/order.js";
import User from "../models/user.js";
import Product from "../models/product.js";


// Get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User, as: 'customer' },
                { model: Product, as: 'product' }
            ]
        });
        res.json(orders);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: { id: req.params.id }
        });
        res.json(order);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Create order
export const createOrder = async (req, res) => {
    try {
        const orders = req.body;

        // Validasi semua produk terlebih dahulu
        const productValidations = await Promise.all(
            orders.map(async (order) => {
                const product = await Product.findByPk(order.productId);
                if (!product) {
                    throw new Error(`Product dengan ID ${order.productId} tidak ditemukan`);
                }
                return true;
            })
        );

        // Jika semua produk valid, buat order secara parallel
        const results = await Promise.all(
            orders.map((order) => 
                Order.create({
                    customerId: order.customerId,
                    productId: order.productId,
                    customerName: order.customerName,
                    customerPhone: order.customerPhone,
                    quantity: order.quantity,
                    status: order.status,
                    date: order.date,
                    revenue: order.revenue
                })
            )
        );

        res.status(201).json({
            message: "Orders created successfully",
            data: results
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order
export const updateOrder = async (req, res) => {
    try {
        await Order.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({
            message: "Order Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Delete order
export const deleteOrder = async (req, res) => {
    try {
        await Order.destroy({
            where: { id: req.params.id }
        });
        res.json({
            message: "Order Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

//  order history
export const getOrderHistory = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { customerId: req.user.userId },
            include: [
                { model: Product, as: 'product' }
            ],
            order: [['date', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        res.json({ message: error.message });
    }
};