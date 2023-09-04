<script setup>
  import { defineProps } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const goBack = () => {
    router.push("/playground/");
  };
</script>

<template>
  <div class="button-container">
    <div class="center">
      <button @click="goBack">Back</button>
    </div>
  </div>
</template>

<style scoped>
  .center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .button-container {
    width: 100%;
    padding: 30px;
    margin-left: -50px;
    height: 20vh;
    position: relative;
    text-align: center;
    background-color: #341052;
  }

  button {
    width: fit-content;
    margin-left: -110px;
    width: 200px;
    height: 40px;
    font-size: 20px;
    font-weight: 15px;
    background-color: rgb(115, 52, 198);
    color: antiquewhite;
  }
</style>
