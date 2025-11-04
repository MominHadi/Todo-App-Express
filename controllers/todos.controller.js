import { getAllTodos, getUserTodos, createTask, updateTask, deleteTask } from "../services/todo.service.js";

export const getTodos = async(req, res, next) => {
    try {
        const { user } = req;

        // Checking User role and feching tasks accordingly here so that only can get access to all tasks
        const todos = user.role === "admin" ?
            await getAllTodos() :
            await getUserTodos(user._id);

        res.status(200).json(todos);
    } catch (err) {
        next(err);
    }
};

export const addTask = async(req, res, next) => {
    try {
        const { user } = req;

        const task = await createTask({...req.body, user: user._id });
        res.status(201).json({
            message: "Task Added Successfully",
            task
        });
    } catch (err) {
        next(err);
    }
};

export const editTask = async(req, res, next) => {
    try {
        const task = await updateTask(req.params.id, req.body);
        res.status(200).json({
            message: "Task edited Successfully",
            task
        });
    } catch (err) {
        next(err);
    }
};

export const removeTask = async(req, res, next) => {
    try {
        await deleteTask(req.params.id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        next(err);
    }
};