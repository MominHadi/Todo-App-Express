import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import express from "express";
import { validate } from "../middleware/validation.js";
let router = express.Router();

router.post("/register", [
    body("fname").notEmpty().withMessage("First Name is required").isString()
    .withMessage("First name must be a string")
    .trim(),
    body("lname")
    .optional()
    .isString()
    .withMessage("Last name must be a string")
    .trim(),
    body("email").notEmpty().withMessage("Email is required.").isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long")
], validate, registerUser);

router.post("/login", [
    body("email").notEmpty().withMessage("Email is required.").isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long")
], validate, loginUser);

export default router;