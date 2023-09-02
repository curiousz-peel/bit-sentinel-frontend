<script setup>
  import { defineProps } from "vue";

  const { backgroundImagePath } = defineProps(["backgroundImagePath"]);
  const backgroundStyle = backgroundImagePath
    ? { "--background-image": `url(${backgroundImagePath})` }
    : {};
</script>

<template>
  <div class="hero" :style="backgroundStyle"></div>
</template>

<style scoped>
  .hero {
    height: 32vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-direction: column;
    /* background-image: url("../jpg/heroBackground1.jpg"); */
    border: 5px solid;
    border-left: 20px solid;
    border-color: #1a0b28;
    background-size: cover;
    --background-image: url("../jpg/heroBackground1.jpg");
    background-image: var(--background-image);
  }
  .hero img {
    position: absolute;
    height: 700px;
    opacity: 0.1;
  }
  .hero h1 {
    font-size: 100px;
    font-weight: bold;
  }
  .hero p {
    cursor: pointer;
  }
</style>
