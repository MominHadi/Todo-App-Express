import { Todo } from "../models/todo.model.js";


export const getAllTodos = async() => {
    return await Todo.find();
};

export const getUserTodos = async(userId) => {
    return await Todo.find({ user: userId });
};

export const createTask = async(data) => {
    const task = new Todo(data);
    return await task.save();
};

export const updateTask = async(id, data) => {
    return await Todo.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTask = async(id) => {
    return await Todo.findByIdAndDelete(id);
};