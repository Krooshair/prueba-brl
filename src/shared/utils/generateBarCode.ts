import BWIPJS from 'bwip-js';

function generateBarcodeImage(barcodeData: string): Promise<string> {
  return new Promise((resolve, reject) => {
    BWIPJS.toBuffer({
      bcid: 'code128', // Tipo de código de barras (en este caso, Code 128)
      text: barcodeData, // Datos del código de barras
      scale: 3, // Escala del código de barras
      height: 10, // Altura del código de barras
      includetext: true, // Incluir el texto junto al código de barras
    }, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString('base64'));
      }
    });
  });
}

export default generateBarcodeImage