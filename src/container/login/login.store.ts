import create from "zustand";
import * as crypt from "crypto-js";
import { config } from "../../config";
// @ts-ignore
import { request } from '@lib/request';

enum Status {
  failed = 0,
  success = 1,
}

interface LoginStatus {
  status: Status,
  msg: string,
}

export const useLoginStore = create((set: Function, get: Function) => ({
  login: async (email: string, password: string): Promise<LoginStatus>  => {
    const pwd = crypt.AES.encrypt(password, config.secret).toString();

    const res = await request("/user/login", { method: "POST", body: JSON.stringify({ email, password: pwd })});

    if (res.code === 0) {
      localStorage.setItem('INTEGRAL_SHOP_USER_INFO', JSON.stringify({username: res.info.data.username, id: res.info.data.id, token: res.info.data.token,}))

      return {
        status: Status.success,
        msg: ''
      }
    } else {
      return {
        status: Status.failed,
        msg: res.msg,
      }
    }
  },

  // login(username: string, pwd: string): boolean {
  //   request(`/user/login`)
  //   if (username === 'admin' && pwd === '123456') {
  //     localStorage.setItem('INTEGRAL_SHOP_USER_INFO', JSON.stringify({username, pwd,}));
  //     return true;
  //   } else {
  //     return false;
  //   }
  // },
}));
