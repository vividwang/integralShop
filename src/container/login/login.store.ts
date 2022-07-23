import create from "zustand";

export const useLoginStore = create((set) => ({
  login(username: string, pwd: string): boolean {
    if (username === 'admin' && pwd === '123456') {
      localStorage.setItem('USER', JSON.stringify({username, pwd,}));
      return true;
    } else {
      return false;
    }
  },  
}));
