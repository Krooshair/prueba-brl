"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNumeric_1 = __importDefault(require("../../shared/utils/isNumeric"));
const subcategory_service_1 = __importDefault(require("./subcategory.service"));
class SubcategoryController extends subcategory_service_1.default {
    /**
     * Método para listar todas las subcategorias
     * @param _req Parametro no usado de tipo Request
     * @param res Parametro de tipo Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async listSubcategory(_req, res) {
        try {
            const response = await this.getSubcategory();
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al listar subcategorias',
                error,
            });
        }
    }
    /**
     * Método para buscar una subcategoria por su id
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async searchSubcategoryById(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const response = await this.getSubcategoryById(Number(id));
            if (!response)
                return res
                    .status(404)
                    .json({ message: 'La subcategoria que intenta buscar, no existe!' });
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al buscar subcategoria por id',
                error,
            });
        }
    }
    /**
     * Método para buscar una subcategoria por su slug
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async searchSubcategoryBySlug(req, res) {
        try {
            const { slug } = req.params;
            const response = await this.getSubcategoryBySlug(slug);
            if (!response)
                return res
                    .status(404)
                    .json({ message: 'La subcategoria que intenta buscar, no existe!' });
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al buscar subcategoria por slug',
                error,
            });
        }
    }
    /**
     * Método para listar todas las subcategorias por categoria
     * @param _req Parametro no usado de tipo Request
     * @param res Parametro de tipo Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async listSubcategoryByCategoryId(req, res) {
        try {
            const { categoryId } = req.params;
            if (!(0, isNumeric_1.default)(Number(categoryId)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'categoryId' no es numérico" });
            const response = await this.getSubcategoryByCategoryId(Number(categoryId));
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al listar subcategorias por categoria',
                error,
            });
        }
    }
    /**
     * Método para crear una nueva subcategoria
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async createSubcategory(req, res) {
        try {
            const subcategory = req.body;
            const findName = await this.getSubcategoryByName(subcategory.name);
            if (findName)
                return res.status(409).json({
                    message: 'Ya existe una subcategoria registrada con este nombre',
                });
            const findCategory = await this.getCategoryById(Number(subcategory.categoryId));
            if (!findCategory)
                return res
                    .status(400)
                    .json({ message: 'La categoria que intenta asignar, no existe!' });
            const response = await this.postSubcategory(subcategory);
            return res.status(201).json({
                message: 'Una nueva subcategoria ha sido registrada!',
                body: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar crear una nueva subcategoria',
                error,
            });
        }
    }
    /**
     * Método para actualizar los datos de una subcategoria
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async updateSubcategory(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const findSubcategory = await this.getSubcategoryById(Number(id));
            if (!findSubcategory)
                return res.status(404).json({
                    message: 'La subcategoria que intenta actualizar, no existe!',
                });
            const subcategory = req.body;
            const findName = await this.getSubcategoryByName(subcategory.name);
            if (findName && findSubcategory.name != subcategory.name)
                return res.status(409).json({
                    message: 'Ya existe una subcategoria registrada con este nombre',
                });
            const findCategory = await this.getCategoryById(Number(subcategory.categoryId));
            if (!findCategory)
                return res
                    .status(400)
                    .json({ message: 'La categoria que intenta asignar, no existe!' });
            const response = await this.putSubcategory(Number(id), subcategory);
            return res.status(200).json({
                message: 'Los datos de la subcategoria ha sido actualizada!',
                body: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar actualizar dato de la subcategoria',
                error,
            });
        }
    }
    /**
     * Método para deshabilitar a una subcategoria
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async trashSubcategory(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const findSubcategory = await this.getSubcategoryById(Number(id));
            if (!findSubcategory)
                return res.status(404).json({
                    message: 'La subcategoria que intenta eliminar, no existe!',
                });
            const response = await this.deleteSubcategory(Number(id));
            return res.status(200).json({ message: response });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar eliminar la subcategoria',
                error,
            });
        }
    }
}
exports.default = SubcategoryController;
