"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("./product.controller"));
const multer_1 = __importDefault(require("multer"));
const validateToken_1 = __importDefault(require("../../shared/middlewares/validateToken"));
const getSecretKey_1 = require("../../shared/security/getSecretKey");
const validateSchema_1 = __importDefault(require("../../shared/middlewares/validateSchema"));
const validateSchemaProduct_1 = __importDefault(require("../../shared/middlewares/form-data/validateSchemaProduct"));
const product_schema_1 = require("./product.schema");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const ProductRoute = (0, express_1.Router)();
const product = new product_controller_1.default();
ProductRoute.get('/product', (req, res) => product.listProduct(req, res));
ProductRoute.get('/product/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => product.searchProductById(req, res));
ProductRoute.get('/product/slug/:slug', (req, res) => product.searchProductBySlug(req, res));
ProductRoute.post('/product', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), upload.single('image'), (0, validateSchemaProduct_1.default)(product_schema_1.createProduct), (req, res) => product.createProduct(req, res));
ProductRoute.post('/product/image/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), upload.single('image'), (req, res) => product.addImageProduct(req, res));
ProductRoute.put('/product/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (0, validateSchema_1.default)(product_schema_1.updateProduct), (req, res) => product.updateProduct(req, res));
ProductRoute.patch('/product/thumbnail/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), upload.single('image'), (req, res) => product.updateThumbnail(req, res));
ProductRoute.delete('/product/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => product.trashProduct(req, res));
ProductRoute.delete('/product/image/:imageId', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => product.trashImageProduct(req, res));
exports.default = ProductRoute;
