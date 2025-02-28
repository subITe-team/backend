"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (res, statusCode, data) => {
    res.status(statusCode).json({
        error: false,
        data,
    });
};
//# sourceMappingURL=response.js.map