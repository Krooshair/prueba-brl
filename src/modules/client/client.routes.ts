import { Router } from "express";
import ClientController from "./client.controller";
import { createClient, queryDocumentNumber, updateClient } from "./client.schema";
import validateSchema from "../../shared/middlewares/validateSchema";
import { getSecretKey } from "../../shared/security/getSecretKey";
import validateToken from "../../shared/middlewares/validateToken";

const ClientRoute = Router()
const client = new ClientController()

ClientRoute.get   ('/client',                                                                                          (req, res) => client.listClient                  (req, res))
ClientRoute.get   ('/client/query',                  validateToken(getSecretKey), validateSchema(queryDocumentNumber), (req, res) => client.queryDocumentNumber         (req, res))
ClientRoute.get   ('/client/:id',                                                                                      (req, res) => client.searchClientById            (req, res))
ClientRoute.get   ('/client/search/:documentNumber',                                                                   (req, res) => client.searchClientByDocumentNumber(req, res))
ClientRoute.post  ('/client',                        validateToken(getSecretKey), validateSchema(createClient),        (req, res) => client.createClient                (req, res))
ClientRoute.put   ('/client/:id',                    validateToken(getSecretKey), validateSchema(updateClient),        (req, res) => client.updateClient                (req, res))
ClientRoute.delete('/client/:id',                    validateToken(getSecretKey),                                      (req, res) => client.trashClient                 (req, res))


export default ClientRoute