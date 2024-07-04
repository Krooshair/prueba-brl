import { Router } from "express";
import BusinessController from "./business.controller";
import multer from 'multer'
import validateSchemaBusiness from "../../shared/middlewares/form-data/validateSchemaBusiness";
import { createBusiness, modifyPosition, updateBill, updateStockByCode, updateStockById } from "./business.schema";
import validateSchema from '../../shared/middlewares/validateSchema';
import validateToken from "../../shared/middlewares/validateToken";
import { getSecretKey } from "../../shared/security/getSecretKey";

const BusinessRoute = Router()
const business = new BusinessController()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

BusinessRoute.get   ('/business',                   validateToken(getSecretKey),                                                                (req, res) => business.listBusiness           (req, res))
BusinessRoute.get   ('/business/product/:id',       validateToken(getSecretKey),                                                                (req, res) => business.listBusinessByProductId(req, res))
BusinessRoute.get   ('/business/:id',               validateToken(getSecretKey),                                                                (req, res) => business.searchBusinessById     (req, res))
BusinessRoute.get   ('/business/code/:code',        validateToken(getSecretKey),                                                                (req, res) => business.searchBusinessByCode   (req, res))
BusinessRoute.get   ('/business/print/:id',         validateToken(getSecretKey),                                                                (req, res) => business.printCodeBusiness      (req, res))
BusinessRoute.get   ('/business/download/:id',      validateToken(getSecretKey),                                                                (req, res) => business.downloadCodeBusiness   (req, res))
BusinessRoute.get   ('/business/download/bill/:id', validateToken(getSecretKey),                                                                (req, res) => business.downloadBillBusiness   (req, res))
BusinessRoute.post  ('/business',                   validateToken(getSecretKey), upload.single('bill'), validateSchemaBusiness(createBusiness), (req, res) => business.createBusiness         (req, res))
BusinessRoute.put   ('/business/:id',               validateToken(getSecretKey), upload.single('bill'), validateSchema(updateBill),             (req, res) => business.updateBill             (req, res))
BusinessRoute.patch ('/business/stock/id/:id',      validateToken(getSecretKey),                        validateSchema(updateStockById),        (req, res) => business.updateStockById        (req, res))
BusinessRoute.patch ('/business/stock',             validateToken(getSecretKey),                        validateSchema(updateStockByCode),      (req, res) => business.updateStockByCode      (req, res))
BusinessRoute.patch ('/business/position/:id',      validateToken(getSecretKey),                        validateSchema(modifyPosition),         (req, res) => business.modifyPosition         (req, res))
BusinessRoute.delete('/business/:id',               validateToken(getSecretKey),                                                                (req, res) => business.completeBusiness       (req, res))

export default BusinessRoute