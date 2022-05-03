import { UserStorage } from './UserStorage';

interface Body {
  id: string;
  psword: string;
  confirmPsword: string;
  emailAdress: string;
}

export class User {
  public body: Body;
  constructor(body: Body) {
    this.body = body;
  }

  async login() {
    const body = this.body;
    try {
      const user = await UserStorage.GetUserInfo(body.id);
      if (user) {
        if (user.userid) {
          if (user.userid === body.id) {
            if (user.psword === body.psword) {
              return { success: true, data: user };
            }
            return { success: false, msg: '비밀번호가 틀립니다.' };
          }
        }
      }
      return { success: false, msg: '아이디를 확인해주세요.' };
    } catch (err) {
      return { success: false, msg: '로그인 오류', err };
    }
  }

  async register() {
    const body: Body = this.body;
    const userid: string = body.id;
    const psword: string = body.psword;
    const email: string = body.emailAdress;
    if (body.psword === body.confirmPsword) {
      try {
        await UserStorage.SaveUserInfo(userid, psword, email);
        return { success: true, msg: '회원가입 성공' };
      } catch (err) {
        return { success: false, msg: '아이디가 이미 존재합니다.', err };
      }
    }
    return { success: false, msg: '2차 비밀번호를 확인하십시오.' };
  }

  async finder() {
    const body = this.body;
    const id: string = body.id;
    const user = await UserStorage.GetUserInfo(id);
    if (user.userid) {
      if (user.userid === body.id && user.email === body.emailAdress) {
        return { success: true, msg: `비밀번호는 ${user.psword}입니다.` };
      }
      return { success: false, msg: '이메일을 확인해주세요.' };
    }
    return { success: false, msg: '아이디를 확인해주세요.' };
  }
}
