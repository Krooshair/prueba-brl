"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryDocument = exports.CloudinaryBase64 = exports.Cloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const Cloudinary = async (image, width, height, crop, folder, use_filename = true, filename) => {
    try {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.PUBLIC_KEY,
            api_secret: process.env.SECRET_KEY,
        });
        const result = await new Promise((resolve, reject) => {
            const options = {
                transformation: { width, height, crop },
                folder,
                use_filename,
            };
            if (filename) {
                options.public_id = filename;
            }
            const stream = cloudinary_1.v2.uploader.upload_stream(options, (error, result) => {
                if (error || !result) {
                    reject(error || new Error('Result es undefined'));
                }
                else {
                    resolve(result);
                }
            });
            stream.end(image.buffer);
        });
        return result;
    }
    catch (error) {
        console.error('Error al cargar archivo:', error);
        return null;
    }
};
exports.Cloudinary = Cloudinary;
const CloudinaryBase64 = async (imageBase64, width, height, crop, folder, use_filename = true) => {
    try {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.PUBLIC_KEY,
            api_secret: process.env.SECRET_KEY,
        });
        const result = await new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload(`data:image/jpeg;base64,${imageBase64}`, // Agrega el prefijo de formato y la codificación base64
            {
                transformation: { width, height, crop }, // Ajusta el tamaño según tus necesidades
                folder, // Colocar nombre al folder
                use_filename, // Validamos si queremos que se guarde con el nombre real del archivo (por defecto true)
            }, (error, result) => {
                if (error || !result) {
                    reject(error || new Error('Result es undefined'));
                }
                else {
                    resolve(result);
                }
            });
        });
        return result;
    }
    catch (error) {
        console.error('Error al cargar archivo:', error);
        return null;
    }
};
exports.CloudinaryBase64 = CloudinaryBase64;
const CloudinaryDocument = async (file, folder, use_filename = true, filename) => {
    try {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.PUBLIC_KEY,
            api_secret: process.env.SECRET_KEY,
        });
        // Obtén la extensión del archivo
        const originalExtension = file.originalname.split('.').pop();
        // Asegúrate de que filename incluya la extensión
        const publicId = filename ? `${filename}.${originalExtension}` : undefined;
        const options = {
            folder,
            use_filename,
            resource_type: 'raw',
        };
        if (publicId) {
            options.public_id = publicId;
        }
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream(options, (error, result) => {
                if (error || !result) {
                    reject(error || new Error('Result es undefined'));
                }
                else {
                    resolve(result);
                }
            });
            stream.end(file.buffer);
        });
        return result;
    }
    catch (error) {
        console.error('Error al cargar archivo:', error);
        return null;
    }
};
exports.CloudinaryDocument = CloudinaryDocument;
