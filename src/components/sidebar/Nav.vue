<script setup>
  import { useRouter } from "vue-router";
  import { computed, onBeforeUpdate } from "vue";
  import NavLink from "./NavLink.vue";
  import { sidebarStatusStore } from "../../stores/sidebarStatus";
  const { notCollapsed, getWidth, toggleSidebar } = sidebarStatusStore();
  import { useLoggedInStore } from "../../stores/loggedInStatus";
  const { setLoggedInFalse, isLoggedIn } = useLoggedInStore();

  const router = useRouter();
  const logOutUser = () => {
    router.push("/auth");
    setLoggedInFalse();
    localStorage.removeItem("bitSentinelToken");
    localStorage.removeItem("id");
    localStorage.removeItem("isAuthor");
    localStorage.removeItem("isModerator");
    localStorage.removeItem("userName");
  };

  let isAuthor = localStorage.getItem("isAuthor") === "true";
  let isModerator = localStorage.getItem("isModerator") === "true";

  onBeforeUpdate(() => {
    isAuthor = localStorage.getItem("isAuthor") === "true";
    isModerator = localStorage.getItem("isModerator") === "true";
  });

  let isContributor = computed(() => {
    return isAuthor || isModerator;
  });
  console.log(isAuthor);
  console.log(isModerator);
  console.log("contributor", isContributor.value);
</script>

<template>
  <div class="sidebar" :style="{ width: getWidth() }">
    <div class="combo-container" :style="{ width: getWidth() }">
      <div class="brand-combo">
        <img
          class="logo"
          :class="{ 'mini-logo': !notCollapsed() }"
          src="../svg/bitSentinelIcon.svg"
          alt="bitSentinel"
        />
        <Transition name="fade">
          <span v-if="notCollapsed()" class="brand-name">
            <h1 class="bit">bit</h1>
            <h1 class="sentinel">Sentinel</h1>
          </span>
        </Transition>
      </div>
    </div>

    <div class="options" :class="{ 'options-wide': notCollapsed() }">
      <NavLink to-path="/" icon-path="fa-solid fa-house">Home</NavLink>
      <NavLink to-path="/courses" icon-path="fa-solid fa-book">Courses</NavLink>
      <NavLink to-path="/library" icon-path="fa-solid fa-book-open-reader"
        >Library</NavLink
      >
      <NavLink to-path="/authors" icon-path="fa-solid fa-pen-nib"
        >Authors</NavLink
      >
      <NavLink to-path="/subscription" icon-path="fa-solid fa-wallet"
        >Subscription</NavLink
      >
      <NavLink
        to-path="/purchases"
        icon-path="fa-solid fa-cart-shopping"
        class="unavailable"
        >Purchases</NavLink
      >
      <NavLink
        to-path="/playground"
        icon-path="fa-solid fa-screwdriver-wrench"
        :class="{ disabled: !isContributor }"
        >Playground</NavLink
      >
    </div>

    <span
      class="logout-icon"
      :class="{ 'shift-logout': notCollapsed() }"
      @click="logOutUser"
    >
      <font-awesome-icon
        icon="fa-solid fa-door-open"
        size="xl"
        style="color: #fcecdb"
      />
    </span>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': notCollapsed() }"
      @click="toggleSidebar"
    >
      <font-awesome-icon
        icon="fa-solid fa-square-caret-right"
        size="xl"
        style="color: #fcecdb"
      />
    </span>
  </div>
</template>

<style scoped>
  .logout-icon {
    position: absolute;
    bottom: 3em;
    margin-left: 0.2em;
    transition: 0.3s linear;
    align-self: center;
    cursor: pointer;
  }

  .shift-logout {
    transform: translateX(75px);
    transition: 0.2s linear;
  }

  .combo-container {
    background-color: #341052;
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    padding: 0.5em;
    transition: 0.3s ease;
    border: 5px solid;
    border-color: #1a0b28;
    border-bottom: 5px solid #1a0b28;
  }
  .bit {
    margin-left: 12px;
    margin-bottom: -26px;
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

  .options {
    margin-top: 4.9em;
    transition: 0.3s linear;
  }
  .options-wide {
    transform: translateY(49px);
  }

  .sidebar {
    background-color: #6a3993;
    float: left;
    position: fixed;
    z-index: 6;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    transition: 0.3s ease;
    border: 5px solid;
    border-color: rgb(26, 11, 40);
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
    cursor: pointer;
  }

  .rotate-180 {
    transform: translateX(75px) rotate(180deg);
    transition: 0.2s linear;
  }
</style>
