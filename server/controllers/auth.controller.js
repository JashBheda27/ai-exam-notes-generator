import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;
        let user = await UserModel.findOne({ email });
        if (!user) {
            user = await UserModel.create({ name, email });
        }
        const token = await getToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure : false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
      return res.status(200).json({
    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits,
    },
    token,
});
    }
    catch (error) {
        console.error('Error in googleAuth:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logOut = async( req , res) =>{
    try {
        await res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error('Error in logOut:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}