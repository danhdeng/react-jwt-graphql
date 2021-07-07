"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = ({ context }, next) => {
    let token;
    if (context.req.headers.authorization && context.req.headers.authorization.startsWith("Bearer")) {
        token = context.req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        throw new Error("not authenticated");
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        context.payload = payload;
    }
    catch (err) {
        console.log("error:", err);
        throw new Error("not authenticated");
    }
    return next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map