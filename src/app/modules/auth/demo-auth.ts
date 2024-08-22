import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiErrors';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.secret as Secret
      );

      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
