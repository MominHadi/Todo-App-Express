import { body, param } from "express-validator";
import express from "express";
import { validate } from "../middleware/validation.js";
import { addTask, editTask, removeTask, getTodos } from "../controllers/todos.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js"
let router = express.Router();

router.get("/",
    authenticateToken,
    validate,
    getTodos);

router.post("/", [
        body("title").notEmpty().withMessage("Title is required").isString()
        .withMessage("Title must be a string")
        .trim()
    ],
    authenticateToken,
    validate,
    addTask);

router.put("/:id",
    authenticateToken, [
        body("title").notEmpty().withMessage("Title is required").isString()
        .withMessage("Title must be a string")
        .trim()
    ],
    validate,
    editTask);


router.delete("/:id",
    authenticateToken,
    // param(":id").notEmpty().withMessage("Id is required"),
    validate,
    removeTask
);


export default router;