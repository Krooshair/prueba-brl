import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

export function NodemailerRestorePassword(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ACCOUNT_EMAIL || '',
      pass: process.env.PASS_APPLICATION || '',
    },
    tls: {
      rejectUnauthorized: false, // Establecer false para que el certificado self-signed sea aceptado
    },
  });
  transporter.verify().then(() => {
    console.log('Listo para enviar');
  });

  const mailOptions = {
    from: '"Restablecer contraseña" <eddybermudez200103@gmail.com>',
    to: email,
    subject: 'Restablecer contraseña',
    html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email de Contacto</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header h1 {
                    color: #333333;
                }
                .content {
                    margin-bottom: 20px;
                }
                .content p {
                    color: #555555;
                    line-height: 1.6;
                }
                .buttons {
                    text-align: center;
                }
                .buttons a {
                    display: inline-block;
                    margin: 10px;
                    padding: 10px 20px;
                    color: #ffffff;
                    background-color: #007bff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .buttons a.whatsapp {
                    background-color: #25d366;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Restablecer contraseña</h1>
                </div>
                <div class="content">
                    <p>Este correo es enviado para que puedas restableces tu contraseña en caso te hayas olvidado. Darle al boton "Cambiar contraseña"</p>
                </div>
                <div class="buttons">
                    <a href="http://localhost:5173/restablecer-clave?token=${token}" target="_blank">Cambiar contraseña</a>
                </div>
            </div>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return;
    }
    console.log('Email enviado: ' + info.response);
  });
}

export function NodemailerVerifyEmail(email: string, token: string | undefined) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ACCOUNT_EMAIL || '',
      pass: process.env.PASS_APPLICATION || '',
    },
    tls: {
      rejectUnauthorized: false, // Establecer false para que el certificado self-signed sea aceptado
    },
  });
  transporter.verify().then(() => {
    console.log('Listo para enviar');
  });

  const mailOptions = {
    from: '"Verificar cuenta" <eddybermudez200103@gmail.com>',
    to: email,
    subject: 'Verificar cuenta',
    html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email de Contacto</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header h1 {
                    color: #333333;
                }
                .content {
                    margin-bottom: 20px;
                }
                .content p {
                    color: #555555;
                    line-height: 1.6;
                }
                .buttons {
                    text-align: center;
                }
                .buttons a {
                    display: inline-block;
                    margin: 10px;
                    padding: 10px 20px;
                    color: #ffffff;
                    background-color: #007bff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .buttons a.whatsapp {
                    background-color: #25d366;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Verifica tu cuenta</h1>
                </div>
                <div class="content">
                    <p>Este correo es enviado para que puedas verificar tu cuenta. Presiona el boton "Verificar correo"</p>
                </div>
                <div class="buttons">
                    <a href="http://localhost:5173/verficar-correo?token=${token}" target="_blank">Verificar correo</a>
                </div>
            </div>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return;
    }
    console.log('Email enviado: ' + info.response);
  });
}
