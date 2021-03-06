/* eslint-disable no-console */
import { Op } from 'sequelize';
import UserService from '../services/user.service';
import Send from '../utils/res.utils';
import AuthHelper from '../utils/auth.utils';

const UserMiddleware = {
  verifyToken(req, res, next) {
    const token = AuthHelper.getToken(req);
    AuthHelper.decodeToken(token, async (error, data) => {
      if (error) return Send(res, 400, error.message);
      const user = data ? await UserService.getUser({ email: data.email }) : '';
      req.data = data;
      req.user = user.dataValues;
      next();
    });
  },

  decodeToken(req, res, next) {
    const token = AuthHelper.getToken(req);
    AuthHelper.decodeToken(token, async (error, data) => {
      if (error) return Send(res, 400, error.message);
      req.data = data;
      next();
    });
  },

  async checkForTokenData(req, res, next) {
    const user = await UserService.getUser({ email: req.data.email });
    if (user) return Send(res, 409, 'email address already in use');
    next();
  },

  async checkuserExist(req, res, next) {
    if (req.body.email) {
      const user = await UserService.getUser({ email: req.body.email });
      if (user) return Send(res, 409, 'email address already in use');
      return next();
    }
    if (req.body.telephone) {
      const user = await UserService.getUser({ telephone: req.body.telephone });
      if (user) return Send(res, 409, 'email address already in use');
      return next();
    }
  },

  async getUserDetails(req, res, next) {
    const { email, password } = req.body;
    const user = await UserService.getUser({ email });
    if (user && AuthHelper.comparePassword(password, user.password)) {
      req.user = user;
      return next();
    }
    return Send(res, 400, 'Invalid login details');
  },

  async checkRole(req, res, next) {
    if (req.user && req.user.roleId === 3) {
      return Send(res, 401, 'Not allowed to perform this operation');
    }
    next();
  },

  async checkAdminRole(req, res, next) {
    if (req.user && req.user.roleId !== 1) {
      return Send(res, 401, 'Not allowed to perform this operation');
    }
    next();
  },

  async checkIfOwner(req, res, next) {
    if (req.user.id !== JSON.parse(req.params.id) && req.user.roleId !== 1) {
      return Send(res, 401, 'Not allowed to perform this operation');
    }
    next();
  },

  async checkCoExist(req, res, next) {
    const user = await UserService.getUser({ company: req.body.company });
    if (user) return Send(res, 409, 'Company name already registered');
    next();
  },

  async getCoByUser(req, res, next) {
    const user = await UserService.getUser({ company: req.params.co });
    if (!user) return Send(res, 404, 'company website not found');
    req.user = user;
    next();
  },

  async getUserById(req, res, next) {
    const user = await UserService.getUser({ id: req.user.id });
    if (!user) return Send(res, 404, 'user not found');
    next();
  },

  async getUserbyEmail(req, res, next) {
    const user = await UserService.getUser({ email: req.body.email });
    if (!user) return Send(res, 404, 'user not found');
    next();
  },

  connect(req, res, next) {
    const { io } = req;
    io.on('connection', async socket => {
      console.log('conected');
      return socket.on('disconnect', async () => {
        console.log('disconne');
      });
    });
    next();
  }
};

export default UserMiddleware;
