<script setup>
  import { RouterLink } from "vue-router";
  import { sidebarStatusStore } from "../stores/sidebarStatus";
  const { collapsed, notCollapsed, getWidth, toggleSidebar } =
    sidebarStatusStore();
</script>

<template>
  <div class="sidebar" :style="{ width: getWidth() }">
    <div class="brand-combo">
      <img
        class="logo"
        :class="{ 'mini-logo': !notCollapsed() }"
        src="./svg/bitSentinelIcon.svg"
        alt="bitSentinel"
      />
      <Transition name="fade">
        <span v-if="notCollapsed()" class="brand-name">
          <h1 class="bit">bit</h1>
          <h1 class="sentinel">Sentinel</h1>
        </span>
      </Transition>
    </div>
    <!-- <button class="sidebar-nav-button">Home</button>
      <button class="sidebar-nav-button">Courses</button>
      <button class="sidebar-nav-button">Library</button>
      <button class="sidebar-nav-button">Subscription</button>
      <button class="sidebar-nav-button">Support</button> -->
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': notCollapsed() }"
      @click="toggleSidebar"
    >
      <font-awesome-icon
        icon="fa-solid fa-square-caret-right"
        size="2xl"
        style="color: #fcecdb"
      />
    </span>
  </div>
</template>

<style scoped>
  .bit {
    margin-left: 12px;
    margin-bottom: -26px;
    /* font-size: x-large; */
    font-size: 38px;
  }
  .brand-combo {
    display: flex;
    align-items: center;
  }
  .brand-name {
    color: #fcecdb;
    font-weight: bolder;
    margin-left: 3px;
    margin: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .sidebar {
    background-color: #6a3993;
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    transition: 0.3s ease;
  }

  .sidebar-nav-button {
    padding: 6px;
    margin: 4px;
    border: none;
    color: #fcecdb;
    background-color: #6a3993;
    font-size: large;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    text-decoration: none;
  }

  .sidebar-nav-button:hover {
    background-color: rgb(252, 236, 219);
    color: #b430af;
  }

  .logo {
    width: 90px;
    height: 90px;
    align-self: left;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: #b430af;
    border-radius: 50%;
    margin-top: 5px;
    transition: 0.3s linear;
  }

  .mini-logo {
    width: 40px;
    height: 40px;
    transition: 0.3s linear;
  }

  .collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;
    transition: 0.3s linear;
    align-self: center;
  }

  .rotate-180 {
    transform: translateX(75px) rotate(180deg);
    transition: 0.2s linear;
  }
</style>
