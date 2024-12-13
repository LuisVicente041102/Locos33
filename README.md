# LifeFit

## Descripción general del repositorio

**Nutri-Vida** es una plataforma integral diseñada para la gestión de dietas y métricas de salud. El proyecto permite a los usuarios y nutriólogos crear, guardar y gestionar dietas personalizadas para pacientes, calculando métricas como el índice de masa corporal (IMC), calorías diarias y otras variables relacionadas con la salud. Además, permite a los nutriólogos ver y modificar las dietas de sus pacientes y generar informes en formato PDF.

El proyecto también incluye un sistema de notificaciones para recordar a los pacientes sobre sus dietas y citas, implementado con **Twilio** para el envío de mensajes de WhatsApp o SMS.

---

## Propósito dentro del proyecto global

Este repositorio forma parte de una aplicación más amplia para la gestión de la salud y bienestar de los pacientes. Su propósito principal es ofrecer una interfaz tanto para usuarios individuales como para nutriólogos, permitiendo lo siguiente:

- **Gestión de Dietas:** Crear y almacenar dietas personalizadas, tanto para usuarios individuales como para pacientes.
- **Cálculo de Métricas de Salud:** Calcular automáticamente el IMC, calorías diarias, y otros parámetros de salud.
- **Generación de PDFs:** Crear reportes en formato PDF con la información de las dietas y las métricas de los pacientes.
- **Notificaciones de WhatsApp/SMS:** Enviar recordatorios a los pacientes sobre sus dietas y citas a través de Twilio.

---

## Instrucciones de instalación, configuración y ejecución

### 1. **Clonar el repositorio**

Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tuusuario/nutri-vida.git

```

### 2. Instalación del backend

Requisitos previos:
Node.js: v14.x o superior.
MySQL: v5.7 o superior.
Navega a la carpeta del backend e instala las dependencias necesarias:

```bash
cd nutri-vida-backend
npm install
```

### 3. Instalación del frontend

Requisitos previos:
Node.js: v14.x o superior.
Navega a la carpeta del frontend e instala las dependencias necesarias:

```bash
cd nutri-vida-frontend
npm install
```

### 4. Configuración del archivo .env

Dentro de la carpeta nutri-vida-backend, crea un archivo .env y agrega las siguientes variables de entorno:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tucontraseña
DB_NAME=nutriividadb
JWT_SECRET=secret_key
TWILIO_ACCOUNT_SID=tu_twilio_account_sid
TWILIO_AUTH_TOKEN=tu_twilio_auth_token
TWILIO_PHONE_NUMBER=whatsapp:+14155238886

```

Asegúrate de reemplazar los valores de tucontraseña, tu_twilio_account_sid, tu_twilio_auth_token con tus credenciales reales.

### 5. Crear la base de datos

Usando MySQL, crea la base de datos especificada en el archivo .env:

```bash
mysql -u root -p
CREATE DATABASE nutriividadb;


```

Luego, ejecuta las migraciones para configurar las tablas necesarias:

```bash
cd nutri-vida-backend
npx sequelize-cli db:migrate
```

### 6. Ejecutar la aplicación

Para iniciar el backend, corre el siguiente comando:

```bash
cd nutri-vida-backend
npm start
```

Y para el frontend, usa:

```bash
cd nutri-vida-frontend
npm start
```

### Dependencias necesarias

## Backend

Node.js: v14.x o superior.
Express: v4.17.1
MySQL: v5.7 o superior (o cualquier otra base de datos compatible con Sequelize).
Sequelize: v6.6.5
dotenv: v8.2.0
Twilio: v3.68.0 (para el envío de notificaciones)
jsonwebtoken: v8.5.1

## Frontend

React: v17.x
Tailwind CSS: v2.x (para los estilos)
Axios: v0.21.1 (para las peticiones HTTP)
React Router: v5.x (para el enrutamiento)

### Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -am 'Agregada nueva funcionalidad').
Haz push de tus cambios (git push origin feature/nueva-funcionalidad).
Abre un pull request.

### Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.

```bash

Este `README.md` contiene toda la información que solicitaste, desde la descripción del proyecto hasta los pasos detallados para la instalación, configuración y ejecución de la aplicación, incluyendo dependencias y cómo contribuir. Puedes copiar este texto en el archivo `README.md` de tu repositorio para compartirlo con otros desarrolladores o usuarios que deseen instalar el proyecto.

```
