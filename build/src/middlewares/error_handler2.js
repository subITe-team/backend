"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlerMiddleware = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? "Internal Server Error" : err.message;
    if (statusCode === 500)
        console.log(err.message);
    res.status(statusCode).json({
        error: true,
        message,
    });
};
exports.default = errorHandlerMiddleware;
//# sourceMappingURL=error_handler2.js.map