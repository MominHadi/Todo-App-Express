import { User } from "../models/users.model.js";

export const createUser = async(data) => {
    const user = new User(data);
    return await user.save();
};

export const findUser = async(email) => {
    let user = await User.findOne({ email });

    return user;
};