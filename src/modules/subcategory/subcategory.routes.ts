import { Router } from "express";
import SubcategoryController from "./subcategory.controller";
import { createSubcategory, updateSubcategory } from "./subcategory.schema";
import validateSchema from "../../shared/middlewares/validateSchema";
import { getSecretKey } from "../../shared/security/getSecretKey";
import validateToken from "../../shared/middlewares/validateToken";

const SubcategoryRoute = Router()
const subcategory = new SubcategoryController()

SubcategoryRoute.get   ('/subcategory',                                                                                      (req, res) => subcategory.listSubcategory            (req, res))
SubcategoryRoute.get   ('/subcategory/:slug',                                                                                (req, res) => subcategory.searchSubcategoryBySlug    (req, res))
SubcategoryRoute.get   ('/subcategory/id/:id',                                                                               (req, res) => subcategory.searchSubcategoryById      (req, res))
SubcategoryRoute.get   ('/subcategory/category/:categoryId',                                                                 (req, res) => subcategory.listSubcategoryByCategoryId(req, res))
SubcategoryRoute.post  ('/subcategory',                      validateToken(getSecretKey), validateSchema(createSubcategory), (req, res) => subcategory.createSubcategory          (req, res))
SubcategoryRoute.put   ('/subcategory/:id',                  validateToken(getSecretKey), validateSchema(updateSubcategory), (req, res) => subcategory.updateSubcategory          (req, res))
SubcategoryRoute.delete('/subcategory/:id',                  validateToken(getSecretKey),                                    (req, res) => subcategory.trashSubcategory           (req, res))

export default SubcategoryRoute