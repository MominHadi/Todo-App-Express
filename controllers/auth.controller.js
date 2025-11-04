import { createUser, findUser } from "../services/auth.service.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

export const registerUser = async(req, res, next) => {
    try {
        let hashedPassword = await hash(req.body.password, 10);
        let newUser = await createUser({...req.body, password: hashedPassword });

        //Generating and sending Token in response
        let token = jwt.sign({
            _id: newUser._id,
            fname: newUser.fname,
            lname: newUser.lname,
            role: newUser.role
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({
            message: "User Registered Successfully",
            token
        });

    } catch (err) {
        if (err.code === 11000) {
            err.status = 409;
            err.message = "Email already registered";
        };
        next(err);
    };
};

export const loginUser = async(req, res, next) => {
    try {
        let user = await findUser(req.body.email);

        if (!user) {
            return res.status(404).json({
                message: `User with email -${req.body.email} does not exist!`
            });
        };
        let isMatch = await compare(req.body.password, user.password)


        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        };

        //Generating and sending Token in response
        const token = jwt.sign({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            role: user.role
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                role: user.role
            }
        });
    } catch (err) {
        next(err)
    };
};