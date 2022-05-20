"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const UserController_1 = require("./controllers/UserController");
const useAuthenticator_1 = __importDefault(require("./hooks/useAuthenticator"));
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.post("/user", new UserController_1.UserController().create);
routes.get("/user/:id", useAuthenticator_1.default, new UserController_1.UserController().findOneById);
routes.put("/user/:id", useAuthenticator_1.default, new UserController_1.UserController().update);
routes.delete("/user/:id", useAuthenticator_1.default, new UserController_1.UserController().delete);
