import create from "zustand";

export const useStore = create((set) => ({
  count: 0,
  cart: [],


  addCart: (item: { id: string }) => {
    console.warn('item: ', item);
    // if (this.cart.some(item => item.id === item.id)) {
    //   const index = this.cart.findIndex(ele => ele.id === item.id);
    //
    //   this.cart = [...this.cart.slice(0, index),
    //     Object.assign(this.cart[index], {count: this.cart[index].count ? this.cart[index].count++ : 1}),
    //     ...this.cart.slice(index + 1)];
    // } else {
    //   this.cart.push(item)
    // }
  },

  removeCart: (item: { id: string }) => {
    if (this.cart.some(item => item.id === item.id)) {

    }
  }
}))
