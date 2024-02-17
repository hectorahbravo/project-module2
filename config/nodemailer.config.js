const nodemailer = require("nodemailer");

// Create a transporter
module.exports.transporter = nodemailer.createTransport({
  service: "gmail", // Use your preferred email service
  auth: {
    user: process.env.NODEMAILER_EMAIL, // Your email
    pass: process.env.NODEMAILER_PASSWORD, // Your email account password or app-specific password
  },
});

// Create email template
module.exports.createEmailTemplate = (user) => {
  return `
  <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Activación de Correo - Gustopolis</title>
<style>
  /* Estilos generales */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f8f8;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
  }
  h1, p {
    text-align: center;
  }
  a {
    color: #4285f4;
    text-decoration: none;
  }
  /* Estilos específicos para dispositivos móviles */
  @media screen and (max-width: 480px) {
    .container {
      padding: 10px;
    }
  }
</style>
</head>
<body>
<div class="container">
  <h1>Bienvenido a Gustopolis</h1>
  <p>¡Gracias por unirte a nuestra comunidad de amantes de la cocina!</p>
  <p>Por favor, haz clic en el siguiente enlace para activar tu cuenta:</p>
  <p><a href="${process.env.HOST}/activate/${user.activationToken}">Activar mi cuenta</a></p>
  <p>Si tienes algún problema con el enlace de arriba, cópialo y pégalo en la barra de direcciones de tu navegador.</p>
  <p>¡Esperamos que disfrutes explorando nuestras deliciosas recetas!</p>
  <p>Saludos,<br>El equipo de Gustopolis</p>
</div>
</body>
</html>
`;
};
