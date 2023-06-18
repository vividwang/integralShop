import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

let store: any = (set) => ({
  user: {},
  login: async () => {
    const res = await fetch('/user/login', {
      method: 'POST',
    }).then(res => res.json());

    if (!res.code) {
      set({
        user: {
          id: ''
        }
      })
    } else {
      throw new Error(res.msg);
    }
  },
  logout: () => {

  },
})

store = devtools(store);
store = persist(store, { name: 'USER_SETTING' });

/**
 * 顶层Store保存用户信息，提供用户登录登出方法
 */
export const userStore = create(store);
