import jwt from 'jsonwebtoken';

export const getToken = async (UserId) =>{
    try {
        const token = jwt.sign({ UserId }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log(error);
    }
}