<script setup>
  import { computed, defineProps } from "vue";
  import { useRoute, RouterLink } from "vue-router";
  import { sidebarStatusStore } from "../../stores/sidebarStatus";
  const { notCollapsed } = sidebarStatusStore();
  import { ref } from "vue";

  const route = useRoute();
  const { toPath, iconPath } = defineProps(["toPath", "iconPath"]);
  const isCurrentPath = computed(() => route.path === toPath);
</script>

<template>
  <RouterLink :to="toPath" class="link" :class="{ active: isCurrentPath }">
    <font-awesome-icon
      v-if="iconPath !== 'fa-solid fa-screwdriver-wrench'"
      class="side-bar-icon"
      :icon="iconPath"
      size="xl"
      style="color: #fcecdb"
    />
    <font-awesome-icon
      v-else
      icon="fa-solid fa-screwdriver-wrench"
      class="side-bar-icon"
      :icon="iconPath"
      size="xl"
      style="color: #fcecdb"
    />
    <Transition name="fade">
      <div class="text" v-if="notCollapsed()">
        <slot />
      </div>
    </Transition>
  </RouterLink>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .link {
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;

    margin: 0.1em 0;
    margin-bottom: 7px;
    padding: 0.4em;
    border-radius: 0.25em;
    height: 1.5em;

    color: white;
    text-decoration: none;
  }
  .text {
    font-weight: 600;
    padding-left: 20px;
    font-size: 20px;
    justify-content: center;
    align-content: center;
  }
  .link:hover {
    background-color: #b430af;
  }
  .link.active {
    background-color: #341052;
  }
  .link .side-bar-icon {
    flex-shrink: 0;
    width: 30px;
    margin-right: 10px;
  }
  .link.disabled {
    pointer-events: none;
    opacity: 0;
    background-color: rgb(196, 196, 196);
    cursor: not-allowed;
  }
  .link.unavailable {
    background-color: rgb(196, 196, 196);
    opacity: 0.9;
    cursor: not-allowed;
    pointer-events: none;
  }
</style>
