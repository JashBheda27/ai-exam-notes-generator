import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        let { token } = req.cookies;
        if (!token) {
            return res.status(400).json({ message: "Token is not found" });
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            return res.status(400).json({ message: "Invalid token" });
        }
        req.userId = verifyToken.UserId;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    }
}

export default isAuth;
