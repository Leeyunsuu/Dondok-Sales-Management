import { Response, Request, NextFunction } from 'express';

export const sessionAuth = {
  checkSession: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.is_logined) {
      return res.json({ success: false, msg: '로그인이 필요합니다.' });
    } else {
      next();
    }
  },
};
