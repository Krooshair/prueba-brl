"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//IMPORT RUTAS
const admin_routes_1 = __importDefault(require("../../modules/admin/admin.routes"));
const category_routes_1 = __importDefault(require("../../modules/category/category.routes"));
const client_routes_1 = __importDefault(require("../../modules/client/client.routes"));
const subcategory_routes_1 = __importDefault(require("../../modules/subcategory/subcategory.routes"));
const product_routes_1 = __importDefault(require("../../modules/product/product.routes"));
const sale_routes_1 = __importDefault(require("../../modules/sale/sale.routes"));
const supplier_routes_1 = __importDefault(require("../../modules/supplier/supplier.routes"));
const business_routes_1 = __importDefault(require("../../modules/business/business.routes"));
const report_routes_1 = __importDefault(require("../../modules/report/report.routes"));
const v1Routes = (0, express_1.Router)();
v1Routes.use(admin_routes_1.default);
v1Routes.use(category_routes_1.default);
v1Routes.use(client_routes_1.default);
v1Routes.use(subcategory_routes_1.default);
v1Routes.use(product_routes_1.default);
v1Routes.use(sale_routes_1.default);
v1Routes.use(supplier_routes_1.default);
v1Routes.use(business_routes_1.default);
v1Routes.use(report_routes_1.default);
exports.default = v1Routes;
