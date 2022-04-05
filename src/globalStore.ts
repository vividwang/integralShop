import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';


let store: any = (set) => ({
  user: {},
  login: () => {

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
