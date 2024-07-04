import isNumeric from '../../shared/utils/isNumeric';
import Admin from './admin.model';
import AdminService from './admin.service';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  NodemailerRestorePassword,
  NodemailerVerifyEmail,
} from '../../shared/services/Nodemailer';

class AdminController extends AdminService {
  /**
   * Método para listar todos los usuarios administradores
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async listAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const {
        decoded,
      }: {
        decoded: { id: number; roleAdmin: string; iat: number; exp: number };
      } = req.body;

      if (decoded.roleAdmin == 'Empleado')
        return res
          .status(404)
          .json({ message: 'Este usuario no tiene acceso a esta solicitud!' });

      const response = await this.getAdmin();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al listar administradores',
        error,
      });
    }
  }

  /**
   * Método para buscar un usuario administrador por su id
   * @param req Parametro de tipo Request
   * @param res Parametro de tipoe Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async searchAdminById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numérico" });

      const {
        decoded,
      }: {
        decoded: { id: number; roleAdmin: string; iat: number; exp: number };
      } = req.body;

      if (decoded.roleAdmin == 'Empleado')
        return res
          .status(404)
          .json({ message: 'Este usuario no tiene acceso a esta solicitud!' });

      const response = await this.getAdminById(Number(id));

      if (!response)
        return res
          .status(404)
          .json({ message: 'El administrador que intenta buscar, no existe!' });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al buscar administrador por id',
        error,
      });
    }
  }

  /**
   * Método para obtener el perfil del administrador autenticado
   * @param req Parametro de tipo Request
   * @param res Parametro de tipoe Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async profileAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const {
        decoded,
      }: {
        decoded: { id: number; roleAdmin: string; iat: number; exp: number };
      } = req.body;

      const response = await this.getAdminById(decoded.id);
      if (!response)
        return res
          .status(404)
          .json({ message: 'El administrador que intenta buscar, no existe!' });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al ver perfil de administrador',
        error,
      });
    }
  }

  /**
   * Método para enviar correo para restablecer contraseña
   * @param req Parametro de tipo Request
   * @param res Parametro de tipo Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async sendEmailForRestorePassword(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const email: string = req.body.email;

      const findEmail = await this.getAdminByEmail(email);
      if (!findEmail)
        return res
          .status(404)
          .json({ message: 'El correo que envio, no existe!' });

      if (!findEmail.isVerify)
        return res
          .status(400)
          .json({ message: 'Lamentablemente este correo no esta verificado' });

      const token =
        findEmail.secretKey &&
        jwt.sign({ id: findEmail.id, verifyPass: true }, findEmail.secretKey, {
          expiresIn: '1h',
        });

      token && NodemailerRestorePassword(email, token);

      return res.status(200).json({
        mesage: 'Verifique su correo',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al intentar enviar correo',
        error,
      });
    }
  }

  public async sendEmailForVerifyAccount(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numerico" });

      const findAdmin = await this.getAdminById(Number(id));
      if (!findAdmin)
        return res.status(404).json({
          message: 'El administrador que intenta verificar, no existe!',
        });

      if (findAdmin.isVerify)
        return res
          .status(409)
          .json({ messgae: 'Esta cuenta ya esta verificada!' });

      const token =
        findAdmin.secretKey &&
        jwt.sign({ id: findAdmin.id, verifyAcc: true }, findAdmin.secretKey, { expiresIn: '1h' });

      console.log(token)

      token && NodemailerVerifyEmail(findAdmin.email, token);

      return res.status(200).json({ message: 'Verifique su correo' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al intentar enviar correo',
        error,
      });
    }
  }

  /**
   * Método para crear el primer administrador de la aplicación
   * @param req Parametro de tipo Request
   * @param res Parametro de tipoe Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async createFirstAdmin(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const admin: Admin & {
        confirmPassword: string;
      } = req.body;

      const listAdmin = await this.getAdminOwner();
      if (listAdmin)
        return res.status(400).json({
          message: 'Ya existe un gerente!',
        });

      admin.roleAdmin = 'Gerente';

      admin.password =
        admin.password && (await bcrypt.hash(admin.password, 10));
      const response = await this.postAdmin(admin);
      if (!response)
        return res.status(400).json({
          message:
            'Ocurrio un error desconocido relacionado con la contraseña en el servicio postAdmin',
        });

      return res.status(201).json({
        message: `Usted es nuestro primer administrador!`,
        body: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar registrar el primer administrador',
        error,
      });
    }
  }

  /**
   * Método para crear un nuevo administrador
   * @param req Parametro de tipo Request
   * @param res Parametro de tipoe Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async createAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const admin: Admin & {
        confirmPassword: string;
        decoded: { id: number; roleAdmin: string; iat: number; exp: number, };
      } = req.body;

      if (admin.decoded.roleAdmin == 'Empleado')
        return res
          .status(404)
          .json({ message: 'Este usuario no tiene acceso a esta solicitud!' });

      const findEmail = await this.getAdminByEmail(admin.email);
      if (findEmail)
        return res.status(409).json({
          message: 'Ya existe un administrador registrado con este correo!',
        });

      const findUsername = await this.getAdminByUsername(admin.username);
      if (findUsername)
        return res.status(409).json({
          message: 'Ya existe un administrador registrado con este usuario!',
        });

      admin.password =
        admin.password && (await bcrypt.hash(admin.password, 10));
      const response = await this.postAdmin(admin);
      if (!response)
        return res.status(400).json({
          message:
            'Ocurrio un error desconocido relacionado con la contraseña en el servicio postAdmin',
        });

      const token = response.secretKey && jwt.sign({id: response.id, verifyAcc: true}, response.secretKey, {expiresIn: '1h'})

      token && NodemailerVerifyEmail(response.email, token)

      return res.status(201).json({
        message: `Un nuevo administrador de cargo ${response.roleAdmin} ha sido registrado! Verificar correo`,
        body: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar registrar un nuevo administrador',
        error,
      });
    }
  }

  /**
   * Método para actualizar datos personales de un administrador
   * @param req Parametro de tipo Request
   * @param res Parametro de tipoe Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async updateAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numérico" });

      const findUser = await this.getAdminById(Number(id));
      if (!findUser)
        return res.status(404).json({
          message: 'El administrador que intenta actualizar, no existe!',
        });

      const admin: Admin = req.body;

      const findEmail = await this.getAdminByEmail(admin.email);
      if (findEmail && findUser.email != admin.email)
        return res.status(409).json({
          message: 'Ya existe un administrador registrado con este correo!',
        });

      const response = await this.putAdmin(Number(id), admin);

      return res.status(200).json({
        message: 'Los datos del administrador han sido actualizados!',
        body: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar actualizar los datos del administrador',
        error,
      });
    }
  }

  /**
   * Método para modificar el estado de un administrador
   * @param req Parametro de tipo Request
   * @param res Parametro de tipoe Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async modifyStatusAdmin(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numérico" });

      const {
        decoded,
      }: {
        decoded: { id: number; roleAdmin: string; iat: number; exp: number };
      } = req.body;
      if (decoded.roleAdmin == 'Empleado')
        return res
          .status(404)
          .json({ message: 'Este usuario no tiene acceso a esta solicitud!' });

      const findUser = await this.getAdminById(Number(id));
      if (!findUser)
        return res.status(404).json({
          message: 'El administrador que intenta modificar, no existe!',
        });

      const { status }: { status?: 'Activo' | 'Suspendido' | 'Vacaciones' } =
        req.query;
      console.log(status);
      if (!status)
        return res.status(400).json({
          message: 'El estado no ha sido enviado o no es el correcto',
        });

      const response = await this.putStatusAdmin(Number(id), status);
      return res.status(200).json({ message: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar modificar el estado del administrador',
        error,
      });
    }
  }

  /**
   * Método para cambiar la contraseña de un administrador
   * @param req Parametro de tipo Request
   * @param res Parametro de tipoe Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async modifyPasswordAdmin(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const decoded: {id: number} = req.body.decoded

      const findPassword = await this.getAdminHashPassword(decoded.id);
      if (!findPassword)
        return res.status(404).json({
          message: 'El administrador que intenta modificar, no existe!',
        });

      const {
        oldPassword,
        newPassword,
        confirmPassword,
      }: { oldPassword: string; newPassword: string; confirmPassword: string } =
        req.body;

      if (newPassword !== confirmPassword)
        return res.status(403).json({
          message:
            'La nueva contraseña y su confirmación no coinciden, intente nuevamente!',
        });

      const compare = await bcrypt.compare(oldPassword, findPassword);
      if (!compare)
        return res.status(403).json({
          message:
            'La antigua contraseña no es la correcta, intente nuevamente!',
        });

      const hashPassword = await bcrypt.hash(newPassword, 10);
      const response = await this.putPasswordAdmin(decoded.id, hashPassword);

      return res.status(200).json({ message: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar modificar la contraseña del administrador',
        error,
      });
    }
  }

  /**
   * Método para restablecer la contraseña de un administrador
   * @param req Parametro de tipo Request
   * @param res Parametro de tipoe Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async restorePassword(req: Request, res: Response): Promise<Response> {
    try {
      const {
        newPassword,
        confirmPassword,
        decoded,
      }: {
        newPassword: string;
        confirmPassword: string;
        decoded: { id: number, verifyPass?: boolean };
      } = req.body;

      if (!decoded.verifyPass)
        return res
          .status(403)
          .json({ message: 'Token no valido para restablecer contraseña' });

      const findAdmin = await this.getAdminById(decoded.id);
      if (!findAdmin)
        return res.status(200).json({
          message: 'El administrador que intenta actualizar, no existe!',
        });

      if (newPassword !== confirmPassword)
        return res
          .status(409)
          .json({ message: 'Las contraseñas no coinciden' });

      const hashPassword = await bcrypt.hash(newPassword, 10);

      const response = await this.putPasswordAdmin(decoded.id, hashPassword);
      return res.status(200).json({ message: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar restablecer la contraseña',
        error,
      });
    }
  }

  /**
   * Método para verificar cuenta
   * @param req Parametro de tipo Request
   * @param res Parametro de tipoe Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async verifyAccount(req: Request, res: Response): Promise<Response> {
    try {
      const decoded: { id: number; verifyAcc?: boolean } = req.body.decoded;

      if (!decoded.verifyAcc)
        return res
          .status(403)
          .json({ message: 'Token no valido para verificar cuenta' });

      const findAdmin = await this.getAdminById(decoded.id);
      if (!findAdmin)
        return res.status(200).json({
          message: 'El administrador que intenta actualizar, no existe!',
        });

      if (findAdmin.isVerify)
        return res
          .status(200)
          .json({ message: 'Esta cuenta ya esta verificada!' });

      const response = await this.putVerifyAdmin(decoded.id);

      return res.status(200).json({ message: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al intentar verificar cuenta',
        error,
      });
    }
  }

  /**
   * Método para deshabilitar a un administrador
   * @param req Parametro de tipo Request
   * @param res Parametro de tipoe Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async trashAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!isNumeric(Number(id)))
        return res
          .status(400)
          .json({ message: "El parametro 'id' no es numérico" });

      const {
        decoded,
      }: {
        decoded: { id: number; roleAdmin: string; iat: number; exp: number };
      } = req.body;
      if (decoded.roleAdmin == 'Empleado')
        return res
          .status(404)
          .json({ message: 'Este usuario no tiene acceso a esta solicitud!' });

      const findUser = await this.getAdminById(Number(id));
      if (!findUser)
        return res.status(404).json({
          message: 'El administrador que intenta eliminar, no existe!',
        });

      const response = await this.deleteAdmin(Number(id));

      return res.status(200).json({ message: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:
          'Ocurrio un error desconocido al intentar eliminar al administrador',
        error,
      });
    }
  }

  /**
   * Método para autenticar a un administrador
   * @param req Parametro de tipo Request
   * @param res Parametro de tipoe Response
   * @returns Retorna la respuesta de la solicitud y su estado
   */
  public async authAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password }: { username: string; password: string } =
        req.body;

      const findAdmin = await this.getAdminByUsername(username);
      if (!findAdmin)
        return res
          .status(404)
          .json({ message: 'El nombre de usuario es incorrecto' });

      const compare =
        findAdmin.password &&
        (await bcrypt.compare(password, findAdmin.password));
      if (!compare)
        return res.status(400).json({ message: 'La contraseña es incorrecta' });

      const token =
        findAdmin.secretKey &&
        jwt.sign(
          { id: findAdmin.id, roleAdmin: findAdmin.roleAdmin },
          findAdmin.secretKey,
          {
            algorithm: 'HS512',
            expiresIn: '1d',
          }
        );

      return res.status(200).json({
        message: `Bienvenido, ${findAdmin.fullName}`,
        body: {
          token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Ocurrio un error desconocido al intentar autenticarse',
        error,
      });
    }
  }
}

export default AdminController;
