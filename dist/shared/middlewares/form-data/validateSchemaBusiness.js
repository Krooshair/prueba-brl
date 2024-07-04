"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validateSchemaBusiness = (schema) => (req, res, next) => {
    try {
        req.body.investment = Number(req.body.investment);
        req.body.price = Number(req.body.price);
        req.body.priceOffer = req.body.priceOffer && Number(req.body.priceOffer);
        req.body.stock = Number(req.body.stock);
        req.body.quantityDrawer = Number(req.body.quantityDrawer);
        req.body.productId = Number(req.body.productId);
        req.body.supplierId = Number(req.body.supplierId);
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
exports.default = validateSchemaBusiness;
