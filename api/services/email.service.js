import EmailTemp from '../utils/email.templates/verify';
import AuthHelper from '../utils/auth.utils';

const EmailService = {
  verifyUser(req) {
    const title = 'Email Verification';
    return {
      from: process.env.SENDER,
      subject: title,
      html: EmailTemp(
        title,
        `${req.protocol}://localhost:8080/register/${AuthHelper.createToken(
          req.body.email
        )}`,
        'Click the button below to verify your email address'
      )
    };
  },

  sendResetEmail(req) {
    return {
      from: process.env.SENDER,
      subject: 'Password Reset',
      html: EmailTemp(
        'Password Reset',
        `${req.protocol}://localhost:8080/reset-password/${AuthHelper.createToken(
          req.body.email
        )}`,
        'Click the button below to reset your password'
      )
    };
  }
};

export default EmailService;
