import User from "../../models/User.js";
import { Request, Response } from "express";

export const getUsers = async(req: Request, res: Response) => {
try {
    if(!await User.find()) {
        res.status(404).json(`No users found.`);
    }
    res.status(200).json(await User.find());
} catch(error) {
    res.status(500).json(`An error occured while getting users..., ${error}`);
}
};

export const getUser = async (req: Request, res: Response) => {
    const {userId} = req.params;
    const user = await User.findById(userId);
    try{
        if(!user) {
            res.status(404).json(`No user found.`);
        }
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json(`An error occured while getting user... ${error}`);
    }
}