"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategory_controller_1 = __importDefault(require("./subcategory.controller"));
const subcategory_schema_1 = require("./subcategory.schema");
const validateSchema_1 = __importDefault(require("../../shared/middlewares/validateSchema"));
const getSecretKey_1 = require("../../shared/security/getSecretKey");
const validateToken_1 = __importDefault(require("../../shared/middlewares/validateToken"));
const SubcategoryRoute = (0, express_1.Router)();
const subcategory = new subcategory_controller_1.default();
SubcategoryRoute.get('/subcategory', (req, res) => subcategory.listSubcategory(req, res));
SubcategoryRoute.get('/subcategory/:slug', (req, res) => subcategory.searchSubcategoryBySlug(req, res));
SubcategoryRoute.get('/subcategory/id/:id', (req, res) => subcategory.searchSubcategoryById(req, res));
SubcategoryRoute.get('/subcategory/category/:categoryId', (req, res) => subcategory.listSubcategoryByCategoryId(req, res));
SubcategoryRoute.post('/subcategory', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (0, validateSchema_1.default)(subcategory_schema_1.createSubcategory), (req, res) => subcategory.createSubcategory(req, res));
SubcategoryRoute.put('/subcategory/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (0, validateSchema_1.default)(subcategory_schema_1.updateSubcategory), (req, res) => subcategory.updateSubcategory(req, res));
SubcategoryRoute.delete('/subcategory/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => subcategory.trashSubcategory(req, res));
exports.default = SubcategoryRoute;
