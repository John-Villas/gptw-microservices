"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const AuthController_1 = require("./controllers/AuthController");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.post("/auth", new AuthController_1.AuthController().authenticate);
routes.get("/auth/validate", new AuthController_1.AuthController().validate);
