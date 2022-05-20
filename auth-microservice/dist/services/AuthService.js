"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
class AuthService {
    async authenticate({ email, hash }) {
        if (!(await prisma.user.findUnique({ where: { email: email } }))) {
            return new Error("You have entered an incorrect email or password");
        }
        const user = await prisma.user.findUnique({ where: { email: email } });
        const isValidPassword = await bcryptjs_1.default.compare(hash, user.password);
        if (!isValidPassword) {
            return new Error("You have entered an incorrect email or password");
        }
        return user;
    }
    async verify({ id }) {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            return new Error("User not found");
        }
        return user;
    }
}
exports.AuthService = AuthService;
