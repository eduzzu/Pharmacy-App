import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            res.status(403).json("Access Denied!");
        }
        if (token?.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimStart();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json("An error occured while verifying token...");
    }
};
