"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validateSchemaSale = (schema) => (req, res, next) => {
    try {
        req.body.totalAmount = Number(req.body.totalAmount);
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const errosMessages = error.errors.map((err) => ({
                [err.path[0]]: err.message,
            }));
            return res.status(400).json({ message: errosMessages });
        }
        next(error);
    }
};
exports.default = validateSchemaSale;
