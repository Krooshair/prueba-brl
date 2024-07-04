"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = __importDefault(require("./report.controller"));
const ReportRoute = (0, express_1.Router)();
const report = new report_controller_1.default();
ReportRoute.get('/report', (req, res) => report.listReportGlobal(req, res));
ReportRoute.get('/report/admin/:id', (req, res) => report.listReportByAdmin(req, res));
ReportRoute.get('/report/client/:id', (req, res) => report.listReportByClient(req, res));
ReportRoute.get('/report/business/:id', (req, res) => report.listReportByBusiness(req, res));
ReportRoute.get('/report/download', (req, res) => report.downloadReportForMonth(req, res));
ReportRoute.get('/report/global', (req, res) => report.downloadReportGlobal(req, res));
ReportRoute.get('/report/download/business/:id', (req, res) => report.downloadReportByBusiness(req, res));
exports.default = ReportRoute;
