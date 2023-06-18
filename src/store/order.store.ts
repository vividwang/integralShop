import create from "zustand";
// @ts-ignore
import { request } from '@lib/request';

export const useState = create((set: Function, get: Function) => ({
  orders: [],
  detail: null,
  
  getAllOrders: async (pageIndex: number, pageSize: number) => {
    const res = await request(`/orders?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    
    if (res.code === 0) {
      set({
        orders: res.info.data
      });
    } else {
      return { msg: res.msg }
    }
  },
  
  getSpecificOrder: async (id: string) => {
    const res = await request(`/order?id=${id}`);

    if (res.code === 0) {
      set(state => state.detail = res.info.data);
    } else {
      return { msg: res.msg }
    }
  },
  
  deleteOrders: async (ids: string[]) => {
    const res = await request(`/order?id=${ids.join(',')}`, {
      method: 'DELETE'
    });
    
    if (res.code !== 0) {
      return { msg: res.msg }
    }
  }
}));