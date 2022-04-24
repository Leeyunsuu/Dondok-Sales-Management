import { Request, Response } from 'express';
import { logger } from '../../config/logger';
// import session from 'express-session';

//Models
import { User } from '../../models/User';

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

    // sales: async (req: Request, res: Response) => {
    //   //생각중인 것 table schema month, days, sales, userId(one to many)
    //   const salesInfo = new Sales(req, res);
    //   const response = await salesInfo.inputSales();
    //   return res.json(response);
    // },
  },
  // get: {
  //   monthInfo: async (req: Request, res: Response) => {
  //     const salesInfo = new Sales(req, res);
  //     const response = await salesInfo.table();
  //     const salesOfMonth = await salesInfo.processSalesData(response.data);
  //     response.total = salesOfMonth;
  //     if (response.success) return res.json(response);
  //     else {
  //       if (response.err) logger.error(`${response.err}`);
  //     }
  //   },
  //   dayInfo: async (req: Request, res: Response) => {
  //     const salesInfo = new Sales(req, res);
  //     const response = await salesInfo.dayInfo();
  //     if (response.success) {
  //       res.render('home/input', {
  //         user: req.session.userName,
  //         data: response.data,
  //       });
  //     } else {
  //       if (response.err) logger.error(`${response.err}`);
  //     }
  //   },
  // },
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
