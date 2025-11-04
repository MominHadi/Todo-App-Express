import express from "express";
import authRoutes from "../routes/auth.route.js";
import todoRoutes from "../routes/todos.route.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/todo", todoRoutes);

export default router;