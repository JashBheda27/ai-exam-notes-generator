import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        let token = req.cookies?.token;

        const authHeader = req.headers.authorization;

        if (!token && authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "Token is not found"
            });
        }

        const verifyToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = verifyToken.UserId;

        next();

    } catch (err) {
        console.error(err);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

export default isAuth;