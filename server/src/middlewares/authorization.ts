// rolesMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { extractTokenPayload } from '../Util/helpers';

export const checkAuthorization = (role: string) => (req: Request, res: Response, next: NextFunction) => {
   const payload = extractTokenPayload(req)
  if  ( payload.permissions && payload.permissions.includes(role)) {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};
