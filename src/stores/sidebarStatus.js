import { defineStore } from "pinia";

const SIDEBAR_WIDTH = 202;
const SIDEBAR_WIDTH_COLLAPSED = 38;

export const sidebarStatusStore = defineStore("sidebarStatus", {
  state: () => {
    return {
      collapsed: false,
    };
  },
  actions: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
    getWidth() {
      return `${this.collapsed ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED}px`;
    },
    notCollapsed() {
      return this.collapsed;
    },
  },
});
