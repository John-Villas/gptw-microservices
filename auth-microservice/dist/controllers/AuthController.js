"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthService_1 = require("../services/AuthService");
class AuthController {
    async authenticate(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json("Please Provide an email address and a password");
        }
        const result = await new AuthService_1.AuthService().authenticate({
            email,
            hash: password,
        });
        if (result instanceof Error) {
            return res.status(401).json(result.message);
        }
        const token = jsonwebtoken_1.default.sign({ id: result.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        delete result.password;
        return res.json({ result, token });
    }
    async validate(req, res) {
        const { authorization } = req.headers;
        try {
            if (!authorization) {
                throw new Error();
            }
            const token = authorization.replace("Bearer", "").trim();
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            return res.status(204).json();
        }
        catch (error) {
            return res.status(401).json("Unauthorized");
        }
    }
}
exports.AuthController = AuthController;
