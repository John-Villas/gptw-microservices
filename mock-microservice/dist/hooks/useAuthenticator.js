"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
async function useAuthenticator(req, res, next) {
    const result = await (0, node_fetch_1.default)(`${process.env.AUTH_SERVICE_URL}/auth/validate`, {
        method: "get",
        headers: req.headers,
    }).then((res) => {
        return res;
    });
    if (result.status === 401) {
        return res.status(401).json(result.statusText);
    }
    next();
}
exports.default = useAuthenticator;
