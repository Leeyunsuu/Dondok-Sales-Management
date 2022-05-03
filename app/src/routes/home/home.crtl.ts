import { Request, Response } from 'express';
import { logger } from '../../config/logger';
// import session from 'express-session';
import requestIp from 'request-ip';

//Models
import { User } from '../../models/User';
import { Sales } from '../../models/sales';

declare module 'express-session' {
  interface SessionData {
    userId: number;
    userName: string;
    is_logined: boolean;
  }
}

const output = {
  home: (req: Request, res: Response) => {
    res.render('home/index');
  },

  login: (req: Request, res: Response) => {
    res.render('home/login');
  },

  finder: (req: Request, res: Response) => {
    res.render('home/finder');
  },

  table: (req: Request, res: Response) => {
    res.render('home/table', {
      user: req.session.userName,
    });
  },
};

const process = {
  post: {
    login: async (req: Request, res: Response) => {
      const user = new User(req.body); //constructer(body)로 전달
      const response = await user.login(); //함수 실행
      if (response.success) {
        req.session.userId = response.data?.id;
        req.session.userName = response.data?.userid;
        req.session.is_logined = true;
        req.session.save(() => {
          return res.json(response);
        });
      } else {
        if (response.err) logger.error(`${response.err}`);
        return res.json(response);
      }
    },

    register: async (req: Request, res: Response) => {
      const user = new User(req.body); //constructer(body)로 전달
      const response = await user.register(); //함수 실행
      if (response.err) logger.error(`${response.err}`);
      return res.json(response);
    },

    finder: async (req: Request, res: Response) => {
      const userInfo = new User(req.body);
      const response = await userInfo.finder();
      return res.json(response);
    },

    sales: async (req: Request, res: Response) => {
      //생각중인 것 table schema month, days, sales, userId(one to many)
      const salesInfo = new Sales(
        req.session.userId,
        req.body.year,
        req.body.month,
        req.body.days,
        req.body.sales
      );
      const response = await salesInfo.inputSales();
      return res.json(response);
    },
  },
  get: {
    monthInfo: async (
      req: Request<{ year: number; month: number }>,
      res: Response
    ) => {
      const salesInfo = new Sales(
        req.session.userId,
        req.params.year,
        req.params.month
      );
      const response = await salesInfo.monthInfo();
      // console.log(response);
      if (response.success) {
        const salesOfMonth = Sales.processSalesData_Month(response.data);
        const salesOfWeek = Sales.processSalesData_Weeks(
          req.params.year,
          req.params.month,
          response.data
        );
        // console.log(salesOfMonth);
        // console.log(salesOfWeek);
        return res.json({
          success: response.success,
          data: response.data,
          total: salesOfMonth,
          week: salesOfWeek,
        });
      } else {
        if (response.err) logger.error(`${response.err}`);
      }
      return res.json(response);
    },
    dayInfo: async (
      req: Request<{ year: number; month: number; days: number }>,
      res: Response
    ) => {
      console.log(req.params);
      const salesInfo = new Sales(
        req.session.userId,
        req.params.year,
        req.params.month,
        req.params.days
      );
      const response = await salesInfo.dayInfo();
      console.log(response);
      if (response.success) {
        res.render('home/input', {
          user: req.session.userName,
          data: response.data,
        });
      } else {
        if (response.err) logger.error(`${response.err}`);
      }
    },
  },
  put: {
    sales: async (req: Request, res: Response) => {
      const salesInfo = new Sales(
        req.session.userId,
        req.body.year,
        req.body.month,
        req.body.days,
        req.body.sales
      );
      const response = await salesInfo.updateSales();
      if (response.err) logger.error(`${response.err}`);
      return res.json(response);
    },
  },
  test: async (req: Request, res: Response) => {
    logger.info(`${requestIp.getClientIp(req)}`);
    return res.json('error');
  },
};

const auth = {
  logout: (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) logger.error(`${err}`);
      res.redirect('/login');
    });
  },
};

export { output, process, auth };
