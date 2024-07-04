import { Router } from "express";
import ReportController from "./report.controller";

const ReportRoute = Router()
const report = new ReportController()

ReportRoute.get('/report',                       (req, res) => report.listReportGlobal         (req, res))
ReportRoute.get('/report/admin/:id',             (req, res) => report.listReportByAdmin        (req, res))
ReportRoute.get('/report/client/:id',            (req, res) => report.listReportByClient       (req, res))
ReportRoute.get('/report/business/:id',          (req, res) => report.listReportByBusiness     (req, res))
ReportRoute.get('/report/download',              (req, res) => report.downloadReportForMonth   (req, res))
ReportRoute.get('/report/global',                (req, res) => report.downloadReportGlobal     (req, res))
ReportRoute.get('/report/download/business/:id', (req, res) => report.downloadReportByBusiness (req, res))

export default ReportRoute