<script setup>
  import Nav from "../components/sidebar/Nav.vue";
  import Hero from "../components/hero/Hero.vue";
  import { sidebarStatusStore } from "../stores/sidebarStatus";

  const { getWidth } = sidebarStatusStore();
</script>

<template>
  <main>
    <Nav />
    <div
      :class="{ contentSlideRight: getWidth() === `202px` }"
      :style="{ 'margin-left': getWidth() }"
    >
      <Hero></Hero>
    </div>
  </main>
</template>

<style scoped>
  .contentSlideRight {
    transition: margin-left 0.27s ease-out;
  }
</style>
