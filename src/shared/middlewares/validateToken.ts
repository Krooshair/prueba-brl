import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

type GetUserSecretKey = (id: number) => Promise<string | null>;

const validateToken =
  (getUserSecretKey: GetUserSecretKey) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "No enviaste la cabecera 'Authorization'" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Formato de token inválido' });
    }

    try {
      const decoded = jwt.decode(token);
      const userId = decoded && typeof decoded != 'string' && decoded.id;

      const secretKey = await getUserSecretKey(userId);

      if (!secretKey)
        return res
          .status(401)
          .json({ message: 'El administrador tiene una clave de acceso' });

      jwt.verify(token, secretKey, (err, decoded): Response | void => {
        if (err) {
          console.log(err);
          return res
            .status(401)
            .json({ message: 'No tienes permisos para realizar esta acción' });
        }
        req.body = { ...req.body, decoded };
        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
  };

export default validateToken;
