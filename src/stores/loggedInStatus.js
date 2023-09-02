import { defineStore } from "pinia";

export const loggedInStore = defineStore("loggedInStore", {
  state: () => {
    return {
      loggedIn: false,
    };
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
