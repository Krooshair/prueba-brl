"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bwip_js_1 = __importDefault(require("bwip-js"));
function generateBarcodeImage(barcodeData) {
    return new Promise((resolve, reject) => {
        bwip_js_1.default.toBuffer({
            bcid: 'code128', // Tipo de código de barras (en este caso, Code 128)
            text: barcodeData, // Datos del código de barras
            scale: 3, // Escala del código de barras
            height: 10, // Altura del código de barras
            includetext: true, // Incluir el texto junto al código de barras
        }, (err, buffer) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(buffer.toString('base64'));
            }
        });
    });
}
exports.default = generateBarcodeImage;
