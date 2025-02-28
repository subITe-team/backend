"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (fn) => (req, res, next) => {
    fn(req, res).catch((error) => next(error));
};
//# sourceMappingURL=catchedAsync.js.map