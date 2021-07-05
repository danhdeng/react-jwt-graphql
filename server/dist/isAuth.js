"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    console.log(authorization);
    if (!authorization) {
        throw new Error("not authenticated");
    }
    try {
        const token = authorization.split(" ")[1];
        console.log("isauth secret:", process.env.ACCESS_TOKEN_SECRET);
        console.log(token);
        const payload = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, token) {
            if (err) {
                console.log("verify error", err);
            }
            else {
                console.log("token", token);
            }
        });
        console.log("payload:", payload);
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