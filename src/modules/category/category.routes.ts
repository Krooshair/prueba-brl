import { Router } from "express";
import CategoryController from "./category.controller";
import { createCategory, updateCategory } from "./category.schema";
import validateSchema from "../../shared/middlewares/validateSchema";
import { getSecretKey } from "../../shared/security/getSecretKey";
import validateToken from "../../shared/middlewares/validateToken";

const CategoryRoute = Router()
const category = new CategoryController()

CategoryRoute.get   ('/category',                                                                         (req, res) => category.listCategory        (req, res))
CategoryRoute.get   ('/category/id/:id',                                                                  (req, res) => category.searchCategoryById  (req, res))
CategoryRoute.get   ('/category/:slug',                                                                   (req, res) => category.searchCategoryBySlug(req, res))
CategoryRoute.post  ('/category',            validateToken(getSecretKey), validateSchema(createCategory), (req, res) => category.createCategory      (req, res))
CategoryRoute.put   ('/category/:id',        validateToken(getSecretKey), validateSchema(updateCategory), (req, res) => category.updateCategory      (req, res))
CategoryRoute.delete('/category/:id',        validateToken(getSecretKey),                                 (req, res) => category.trashCategory       (req, res))

export default CategoryRoute