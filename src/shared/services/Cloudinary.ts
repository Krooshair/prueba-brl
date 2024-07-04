import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { config } from 'dotenv';
import { CropMode } from 'cloudinary';

config();

type CloudinaryResult = {
  secure_url: string;
  url: string;
};

export const Cloudinary = async (
  image: Express.Multer.File,
  width: number,
  height: number,
  crop: CropMode,
  folder: string,
  use_filename: boolean = true,
  filename?: string
): Promise<CloudinaryResult | null> => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.PUBLIC_KEY,
      api_secret: process.env.SECRET_KEY,
    });

    const result: CloudinaryResult = await new Promise((resolve, reject) => {
      const options: UploadApiOptions = {
        transformation: { width, height, crop },
        folder,
        use_filename,
      };

      if (filename) {
        options.public_id = filename;
      }

      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Result es undefined'));
          } else {
            resolve(result);
          }
        }
      );
      stream.end(image.buffer);
    });

    return result;
  } catch (error) {
    console.error('Error al cargar archivo:', error);
    return null;
  }
};

export const CloudinaryBase64 = async (
  imageBase64: string,
  width: number,
  height: number,
  crop: CropMode,
  folder: string,
  use_filename: boolean = true
): Promise<CloudinaryResult | null> => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.PUBLIC_KEY,
      api_secret: process.env.SECRET_KEY,
    });

    const result: CloudinaryResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        `data:image/jpeg;base64,${imageBase64}`, // Agrega el prefijo de formato y la codificación base64
        {
          transformation: { width, height, crop }, // Ajusta el tamaño según tus necesidades
          folder, // Colocar nombre al folder
          use_filename, // Validamos si queremos que se guarde con el nombre real del archivo (por defecto true)
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Result es undefined'));
          } else {
            resolve(result);
          }
        }
      );
    });

    return result;
  } catch (error) {
    console.error('Error al cargar archivo:', error);
    return null;
  }
};

export const CloudinaryDocument = async (
  file: Express.Multer.File,
  folder: string,
  use_filename: boolean = true,
  filename?: string
): Promise<CloudinaryResult | null> => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.PUBLIC_KEY,
      api_secret: process.env.SECRET_KEY,
    });

    // Obtén la extensión del archivo
    const originalExtension = file.originalname.split('.').pop();

    // Asegúrate de que filename incluya la extensión
    const publicId = filename ? `${filename}.${originalExtension}` : undefined;

    const options: UploadApiOptions = {
      folder,
      use_filename,
      resource_type: 'raw',
    };

    if (publicId) {
      options.public_id = publicId;
    }

    const result: CloudinaryResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Result es undefined'));
          } else {
            resolve(result);
          }
        }
      );
      stream.end(file.buffer);
    });

    return result;
  } catch (error) {
    console.error('Error al cargar archivo:', error);
    return null;
  }
};
