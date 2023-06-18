import create from "zustand";
// @ts-ignore
import { request } from '@lib/request';

const status = [{
  name: 'pity',
  value: '🥺',
}, {
  name: 'upset',
  value: '😔',
}, {
  name: 'proud',
  value: '😎',
}, {
  name: 'not-happy',
  value: '🙃'
}, {
  name: 'happy',
  value: '🤩'
}];

export const useStore = create((set: Function, get: Function) => ({
  userInfo: {
    username: '',
    status: '',
    coin: 0,
  }, 
  setUserInfo: (
    params: {
      userName?: string,
      status?: string,
    }
  ) => set(state => {
    Object.keys(params).forEach(key => {
      if (params.status) {
        const ele = status.find(item => item.name === params.status);
   
        state.userInfo[key] = ele.value;
      } else {
        state.userInfo[key] = params[key];
      }
    })
  }),
  
  getUserInfo: async (): Promise<any> => {
    const data = JSON.parse(localStorage.getItem('INTEGRAL_SHOP_USER_INFO'));
    const res = await request(`/user?id=${data.id}`);
    
    if (res.code === 0) {
      set({
        userInfo: Object.assign({}, get().userInfo, {
          username: res.info.data.username,
          coin: res.info.data.coin,
        })
      })
    }
  },
  
  getCoins: async (userId: string, coin?: number): Promise<any> => {
    const res = await request(`/user/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: userId, coin })
    });
    
     if (res.code === 0) {
       
       console.warn('res: ', res.info.data);
      set({
        userInfo: Object.assign({}, get().userInfo, {
          coin: res.info.data.coin,
        })
      })
     }
  },

  // todo
  // need to judge whether do the action in one day.
  getNewIntegral: () => set(state => {
    
  }),

  clearUser: () => set(state => {
    state.userInfo = {};
    localStorage.removeItem('USER');
  }),

  logout: () => set(state => {
    state.clearUser();
  })
}))