<script setup>
  import { computed } from "vue";
  import { RouterView, useRoute } from "vue-router";
  import Nav from "./components/sidebar/Nav.vue";
  import { sidebarStatusStore } from "./stores/sidebarStatus";

  const { getWidth } = sidebarStatusStore();

  const route = useRoute();
  const ifNoNavPages = () => {
    return route.fullPath === "/auth";
  };
</script>

<template>
  <main>
    <Nav v-if="!ifNoNavPages()" />
    <div
      v-if="!ifNoNavPages()"
      :class="{ contentSlideRight: getWidth() === `202px` }"
      :style="{ 'margin-left': getWidth() }"
    >
      <RouterView />
    </div>
    <div v-else>
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
  .contentSlideRight {
    transition: margin-left 0.27s ease-out;
  }
</style>
