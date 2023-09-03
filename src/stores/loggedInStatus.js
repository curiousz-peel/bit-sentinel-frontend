import { defineStore } from "pinia";

export const useLoggedInStore = defineStore("loggedInStore", {
  state: () => {
    return {
      loggedIn: false,
    };
  },
  getters: {
    isLoggedInStatus: (state) => state.loggedIn,
  },
  actions: {
    setLoggedInTrue() {
      this.loggedIn = true;
    },
    setLoggedInFalse() {
      this.loggedIn = false;
    },
    isLoggedIn() {
      return this.loggedIn;
    },
  },
});
