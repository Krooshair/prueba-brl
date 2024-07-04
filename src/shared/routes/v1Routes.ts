import { Router } from "express";

//IMPORT RUTAS
import AdminRoute from '../../modules/admin/admin.routes';
import CategoryRoute from "../../modules/category/category.routes";
import ClientRoute from "../../modules/client/client.routes";
import SubcategoryRoute from "../../modules/subcategory/subcategory.routes";
import ProductRoute from "../../modules/product/product.routes";
import SaleRoute from "../../modules/sale/sale.routes";
import SupplierRoute from "../../modules/supplier/supplier.routes";
import BusinessRoute from "../../modules/business/business.routes";
import ReportRoute from "../../modules/report/report.routes";

const v1Routes = Router();

v1Routes.use(AdminRoute)
v1Routes.use(CategoryRoute)
v1Routes.use(ClientRoute)
v1Routes.use(SubcategoryRoute)
v1Routes.use(ProductRoute)
v1Routes.use(SaleRoute)
v1Routes.use(SupplierRoute)
v1Routes.use(BusinessRoute)
v1Routes.use(ReportRoute)

export default v1Routes