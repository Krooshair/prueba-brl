# Documentación

Proyecto de un servicio backend para la empresa BRL Import. Esta cuenta con rest API's y se usaron varias librerías.

Además se usaron servicios terceros para agilizar y optimizar el servidor y la base de datos.

### Servicios y librerías principales

Mencionado anteriormente se usaron distintos servicios y librerías. Las cuales mencionaremos las principales:

- [Cloudinary](https://cloudinary.com)
- [Apis net](https://apis.net.pe)
- [JWT](https://jwt.io)
- [Prisma ORM](https://prisma.io)
- [Nodemailer](https://nodemailer.com)

Estos servicios tienen credenciales, las cuales deben ser colocadas dentro de un archivo `.env` en la raíz del proyecto.

```env
//PRISMA
DATABASE_URL="mysql://root@localhost:3306/db_brl_import"

//SERVER
HOST="localhost"
PORT="3000"

//CLOUDINARY
CLOUD_NAME="djniqyj9r"
PUBLIC_KEY="251242396164189"
SECRET_KEY="wQurnDJabhmt60q4zuQAw3wSVgE"
CLOUDINARY_URL=cloudinary://251242396164189:wQurnDJabhmt60q4zuQAw3wSVgE@djniqyj9r

//NODEMAILER
ACCOUNT_EMAIL="eddybermudez200103@gmail.com"
PASS_APPLICATION="blpz ethr twrv cvin"

//CONSULTA DNI O RUC
TOKEN_QUERY="apis-token-9306.hFHZhGjKRcfzN7C-3gr6qhat6bw1ahbk"
```

### Funcionalidad
La función principal del proyecto es gestionar de una forma avanzada y limpia, una empresa de importaciones la cual se siente muy desoradenada.

Con este proyecto ayudaremos a que pueda mantener el orden interno de sus finanzas y productos.

Su funciones principales son:
- Registrar el personal de la empresa
- Registrar los productos y el modelo de negocio de la empresa
- Tener un historial de clientes
- Guardar información de proveedores
- Gestionar stock con lector de barras
- Guardar comprobantes de pago en compra y venta de productos
- Obtener reportes de ventas anuales en graficos y/o excel's
- Y otros mas...

### Endpoints
Dentro del proyecto, en la raiz, encontrarás una carpeta llamada `/dev_resource` y dentro habra un archivo `.json` el cual es un archivo de importación para la herramienta postman.

### ¿Cómo iniciar el proyecto?
Antes de todos, debes tener instalado `Node Js` en sus version 20 en adelante. Ademas debes de tener un servidor de base de datos `MySQL`.

Para esto ya debiste haber clonado el proyecto en tu maquina local. Este proyecto fue desarrollado con el lenguaje de programación `TypeScript` y el framework `Express`. 

#### Primer paso
Instalar las dependencias desde la CLI o linea de comandos
```bash
npm install
```

#### Segundo paso
Realizar una migracion de los modelos de prisma desde la CLI o linea de comandos
```bash
npx prisma migrate dev --name "init"
```
Para esto ya debes tener tu servidor de MySQL, de lo contrario la conexion a la base de datos y la migración no se realizaran.

#### Tercer paso

Iniciar el servidor de express
```bash
npm run dev
```

#### Ultimo paso
Para realizar acciones dentro del servidor, primero debes crear el superusuario.

Para crearlo debes ingresar al postman con la importacion de endpoints hecha, luego seguir la ruta `/BRL-IMPORT/Administrador/Crear primer administrador` y darle al boton Enviar o Send.

Con esto ya tendras un superusuario con las credenciales:

```json
"username": "krooshair"
"password": "Admin&20"
```

### Permisos de usuarios
Algunas acciones dentro del proyecto requeriran de la autenticacion de un usuario. Para esto primero debes de autenticarte con el superusuario u otro usuario que tengas.

Para autenticarse, debe serguir la ruta `/BRL-IMPORT/Administrador/Autenticar administrador` y colocar las credenciales del superusuario creado anteriormente o el usuario de tu preferencia.

Y luego, le dara al boton Enviar o Send, y este te devolvera una respuesta como esta:

```json
{
    "message": "Bienvenido, Fabian Bermudez",
    "body": {
        "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUFkbWluIjoiR2VyZW50ZSIsImlhdCI6MTcyMDEwMjUzMywiZXhwIjoxNzIwMTg4OTMzfQ.pYpR6M9lAVe4zbI_SAMGfcuNHzGrnML_gvVomF9nUdOvOXWj2NrPgOy7egPjGNLwLkYdZSG5FcFA5l3jW48G3Q"
    }
}
```

Despues de que te devuelva la respuesta, debes copiar el token e ir a la sección Entorno o Environments en donde debes crear una variable llamada `TOKEN` y en su valor colocar el token anteriormente copiado.

Con esta ya tendras acceso a todas las acciones del proyecto. 

Ojo que todo usuario no tiene los mismos permisos, si deseas usar todas las acciones, debes autenticarte con el superusuario.

### Final de Documentación

Con esta documentación, ya puedes empezar a usar el proyecto y seguir agregando mas funcionalidades a este gran proyecto y futuro servicio de la empresa TGH Techonology Solution

Visita la pagina de la empresa y sus redes sociales
- [Pagina Web](https://tghtechnologysolution.com/)
- [Facebook](https://www.facebook.com/TGHTechnologySolution)
- [Instagram](https://www.instagram.com/tghtechnologysolution?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==)
- [TikTok](https://www.tiktok.com/@tghtechnology.solution?is_from_webapp=1&sender_device=pc)

Muchas gracias.
