
import UserService from '../services/user.service';
import Response from '../utils/res.utils';
import AuthHelper from '../utils/auth.utils';

const UserMiddleware = {
  verifyToken(req, res, next) {
    const token = AuthHelper.getToken(req);
    AuthHelper.decodeToken(token, (error, data) => {
      error ? Response(res, 400, error.message) : (req.body.email = data.email, next());
    });
  },

  async checkuserExist(req, res, next) {
    const user = await UserService.getUser({ email: req.body.email });
    if (user) Response(res, 409, 'email address already in use');
    return next();
  },

  async getUserDetails(req, res, next) {
    const { email, password } = req.body;
    const user = await UserService.getUser({ email });
    if (user && AuthHelper.comparePassword(password, user.password)) {
      req.user = user; return next();
    }
    return Response(res, 409, 'Invalid login details');
  },
};

export default UserMiddleware;
