import { Response, Request, NextFunction } from 'express';

export const sessionAuth = {
  checkSession: (req: Request, res: Response, next: NextFunction): any => {
    if (!req.session.is_logined) {
      return res.json({ success: false, msg: '로그인이 필요합니다.' });
    } else {
      next();
    }
  },
};
