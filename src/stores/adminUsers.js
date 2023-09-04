import { defineStore } from "pinia";

export const useAdminUsersStore = defineStore({
  id: "adminUsers",
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers() {
      return this.users;
    },
  },
  actions: {
    deleteUser(id) {
      this.users = this.users.filter((user) => user.id != id);
    },
    setUsers(users) {
      this.users = users;
    },
  },
});
