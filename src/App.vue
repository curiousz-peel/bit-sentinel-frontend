<script setup>
  import Nav from "./components/Nav.vue";
  import { sidebarStatusStore } from "./stores/sidebarStatus";
  const { collapsed, notCollapsed, getWidth, toggleSidebar } =
    sidebarStatusStore();
</script>

<template>
  <main>
    <Nav />
    <div :style="{ 'margin-left': getWidth() }"></div>
  </main>
</template>

<style scoped></style>
