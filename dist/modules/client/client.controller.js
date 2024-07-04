"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNumeric_1 = __importDefault(require("../../shared/utils/isNumeric"));
const client_service_1 = __importDefault(require("./client.service"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class ClientController extends client_service_1.default {
    /**
     * Método para listar todos los clientes
     * @param _req Parametro no usado de tipo Request
     * @param res Parametro de tipo Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async listClient(_req, res) {
        try {
            const response = await this.getClient();
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al listar clientes',
                error,
            });
        }
    }
    /**
     * Método para consultar los datos de una persona por su numero de documento
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async queryDocumentNumber(req, res) {
        try {
            const { documentNumber, documentType, } = req.body;
            const findDocument = await this.getClientByDocumentNumber(documentNumber);
            if (findDocument)
                return res
                    .status(409)
                    .json({ message: 'Este numero de documento ya esta registrado!' });
            if (documentType == 'DNI') {
                const axiosResponse = await axios_1.default.get(`https://api.apis.net.pe/v2/reniec/dni?numero=${documentNumber}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.TOKEN_QUERY}`,
                        Accept: 'application/json',
                    },
                });
                return res.status(axiosResponse.status).json({
                    fullName: axiosResponse.data.nombres +
                        ' ' +
                        axiosResponse.data.apellidoPaterno +
                        ' ' +
                        axiosResponse.data.apellidoMaterno,
                });
            }
            else if (documentType == 'RUC') {
                const axiosResponse = await axios_1.default.get(`https://api.apis.net.pe/v2/sunat/ruc?numero=${documentNumber}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.TOKEN_QUERY}`,
                        Accept: 'application/json',
                    },
                });
                return res
                    .status(axiosResponse.status)
                    .json({ fullName: axiosResponse.data.razonSocial });
            }
            else {
                return res.status(400).json({
                    message: 'Solo podemos obtener datos de documentos nacionales',
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar obtener informacion de cliente',
                error,
            });
        }
    }
    /**
     * Método para buscar un cliente por su id
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async searchClientById(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const response = await this.getClientById(Number(id));
            if (!response)
                return res
                    .status(404)
                    .json({ message: 'El cliente que intenta buscar, no existe!' });
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al buscar un cliente por id',
                error,
            });
        }
    }
    /**
     * Método para buscar un cliente por su numero de documento
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async searchClientByDocumentNumber(req, res) {
        try {
            const { documentNumber } = req.params;
            if (!(0, isNumeric_1.default)(Number(documentNumber)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'documentNumber' no es numérico" });
            const response = await this.getClientByDocumentNumber(documentNumber);
            if (!response)
                return res
                    .status(404)
                    .json({ message: 'El cliente que intenta buscar, no existe!' });
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al buscar un cliente por numero de documento',
                error,
            });
        }
    }
    /**
     * Método para crear un nuevo cliente
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async createClient(req, res) {
        try {
            const client = req.body;
            const findClient = await this.getClientByDocumentNumber(client.documentNumber);
            if (findClient)
                return res.status(409).json({
                    message: 'Ya existe un cliente registrado con este numero de documento!',
                });
            const response = await this.postClient(client);
            return res.status(201).json({
                message: 'Un nuevo cliente ha sido registrado!',
                body: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar registrar un nuevo cliente',
                error,
            });
        }
    }
    /**
     * Método para actualizar datos personales de un cliente
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async updateClient(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const findClient = await this.getClientById(Number(id));
            if (!findClient)
                return res.status(404).json({
                    message: 'El cliente que intenta actualizar, no existe!',
                });
            const client = req.body;
            const findDocumentNumber = await this.getClientByDocumentNumber(client.documentNumber);
            if (findDocumentNumber &&
                findClient.documentNumber != client.documentNumber)
                return res.status(409).json({
                    message: 'Ya existe un cliente registrado con este numero de documento!',
                });
            const response = await this.putClient(Number(id), client);
            return res.status(200).json({
                message: 'Los datos del cliente han sido actualizados!',
                body: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar actualizar datos del cliente',
                error,
            });
        }
    }
    /**
     * Método para borrar un cliente
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async trashClient(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const findClient = await this.getClientById(Number(id));
            if (!findClient)
                return res.status(404).json({
                    message: 'El cliente que intenta eliminar, no existe!',
                });
            const response = await this.deleteClient(Number(id));
            return res.status(200).json({ message: response });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar eliminar al cliente',
                error,
            });
        }
    }
}
exports.default = ClientController;
