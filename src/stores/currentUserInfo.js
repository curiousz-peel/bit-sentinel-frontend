import { defineStore } from "pinia";

export const useCurrentUserInfoStore = defineStore({
  id: "counter",
  state: () => ({
    id: null,
    isAuthor: false,
    isModerator: false,
    userName: null,
  }),
});
