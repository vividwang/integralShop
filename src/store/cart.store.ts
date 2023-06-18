import create from "zustand";
// @ts-ignore
import { request } from '@lib/request';

export const useStore = create((set: Function, get: Function) => ({
  goods: {
    data: [],
    total: 0,
  },
  cart: [],
  count: 0,
  price: 0,
  isFinished: false,

  getCart: () => set(async state => {
    return state.cart;
  }),

  getGoods: async (page: number, pageSize: number) => {
    const res = await request(`/goods/all?pageIndex=${page}&pageSize=${pageSize}`);

    if (res.code === 0) {
      set(state => state.goods = {
        data: res.info.data,
        total: res.total
      });
    }
  },

  doCompute: () => set(state => {
    state.count = state.cart.reduce((accu, cur) => accu + cur.count, 0);
    state.price = state.cart.reduce((accu, cur) => accu + cur.count * cur.price, 0);
  }),

  addCart: (item: { id: string }) => set(state => {
    if (state.cart.some(v => v.id === item.id)) {
      const index = state.cart.findIndex(ele => ele.id === item.id);
    
      state.cart = [...state.cart.slice(0, index),
        Object.assign({}, state.cart[index], {count: ++state.cart[index].count}),
        ...state.cart.slice(index + 1)];

      console.warn('data: ', state.cart);
    } else {
      state.cart.push(Object.assign(item, { count: 1 }));
    }

    state.doCompute();
  }),

  removeCategory: (item: { id: string }) => set(state => {
    const index = state.cart.findIndex(ele => ele.id === item.id);

    state.cart.splice(index, 1);
  }),

  removeItem: (item: {id: string}) => set(state => {
    const index = state.cart.findIndex(ele => ele.id === item.id);

    if (state.cart[index].count <= 1) {
      state.cart.splice(index, 1);
    } else {
      --state.cart[index].count;
    }

    state.doCompute();
  }),

  /*
    settle
  */
  doSettle: async () => {
    const data = JSON.parse(localStorage.getItem('INTEGRAL_SHOP_USER_INFO'));

    const res = await request('/order/settle', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: data.id,
        price: get().price,
        goods: get().cart
      }),
    });

    console.warn('res: ', res);
    if (res.code === 0) {
      set(state => {
          state.isFinished = true;
      })
    } else {
      set(state => {
        state.isFinished = false;
      })
    }
  }
}))