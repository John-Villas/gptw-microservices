"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserService_1 = require("../services/UserService");
class UserController {
    async create(req, res) {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            return res
                .status(400)
                .json("The First Name, Last Name, Email and Password info are required.");
        }
        const id = (0, uuid_1.v4)();
        const hash = bcryptjs_1.default.hashSync(password, 8);
        const result = await new UserService_1.UserService().create({
            id,
            firstname,
            lastname,
            email,
            hash,
        });
        if (result instanceof Error) {
            return res.status(409).json(result.message);
        }
        delete result.password;
        return res.json(result);
    }
    async findOneById(req, res) {
        const id = req.params.id;
        const result = await new UserService_1.UserService().findOneById({
            id,
        });
        if (result instanceof Error) {
            return res.status(409).json(result.message);
        }
        delete result.password;
        return res.json(result);
    }
    async update(req, res) {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            return res
                .status(400)
                .json("The First Name, Last Name, Email and Password info are required.");
        }
        const id = req.params.id;
        const hash = bcryptjs_1.default.hashSync(password, 8);
        const result = await new UserService_1.UserService().update({
            id,
            firstname,
            lastname,
            email,
            hash,
        });
        if (result instanceof Error) {
            return res.status(409).json(result.message);
        }
        delete result.password;
        return res.json(result);
    }
    async delete(req, res) {
        const id = req.params.id;
        const result = await new UserService_1.UserService().delete({
            id,
        });
        if (result instanceof Error) {
            return res.status(409).json(result.message);
        }
        return res.status(204).json();
    }
}
exports.UserController = UserController;
