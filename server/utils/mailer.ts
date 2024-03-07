import nodemailer, { Transporter } from 'nodemailer';
import { recoveryPasswordHtml } from './htmlString';

const USER_MAIL = process.env.USER_MAIL || 'user';
const PASS_MAIL = process.env.PASS_MAIL || '4003';

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USER_MAIL,
    pass: PASS_MAIL,
  },
});

export const sendPinCode = (
  correoDestinatario: string,
  description: string
): void => {
  const mailOptions = {
    from: '"Pin generado 💥" <devs.tubar@gmail.com>',
    to: correoDestinatario,
    subject: 'De parte de tuBar',
    text: `${description}\n\nSaludos`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo de agradecimiento:', error);
    } else {
      console.log('Correo de registro enviado con éxito:', info.response);
    }
  });
};
export const sendLinkToRecoveryPassword = (
  to: string,
  name: string,
  code: string
): void => {
  const mailOptions = {
    from: '"Recuperar contraseña 👻" <devs.tubar@gmail.com>',
    to,
    subject: 'Recuperar contraseña',
    html: recoveryPasswordHtml(name, code),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo :', error);
    } else {
      console.log(
        'Correo para restablece la contraseña enviado con éxito:',
        info.response
      );
    }
  });
};
