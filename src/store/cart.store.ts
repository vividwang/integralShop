import create from "zustand";

export const useStore = create((set: Function) => ({
  cart: [],
  count: 0,
  price: 0,

  getCart: () => set(async state => {
    return state.cart;
  }),

  addCart: (item: { id: string }) => set(state => {
    if (state.cart.some(v => v.id === item.id)) {
      const index = state.cart.findIndex(ele => ele.id === item.id);
    
      state.cart = [...state.cart.slice(0, index),
        Object.assign({}, state.cart[index], {count: ++state.cart[index].count}),
        ...state.cart.slice(index + 1)];
    } else {
      state.cart.push(Object.assign(item, { count: 1 }));
    }

    state.count = state.cart.reduce((accu, cur) => accu + cur.count, 0);
    state.price = state.cart.reduce((accu, cur) => accu + cur.count * cur.price, 0)
  }),
  removeItem: (item: { id: string }) => set(state => {
    const index = state.cart.findIndex(ele => ele.id === item.id);

    state.cart.splice(index, 1);
  }),
}))