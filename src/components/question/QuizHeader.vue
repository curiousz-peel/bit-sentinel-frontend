<script setup>
  import { defineProps } from "vue";

  const { quizProgress, barPercentage } = defineProps([
    "quizProgress",
    "barPercentage",
  ]);
</script>

<template>
  <header>
    <h4>Question {{ quizProgress }}</h4>
    <div class="bar">
      <div class="completion" :style="{ width: barPercentage }"></div>
    </div>
  </header>
</template>

<style scoped>
  header {
    margin-top: 20px;
  }

  header h4 {
    font-size: 25px;
    margin-left: 30px;
  }

  .bar {
    width: 300px;
    height: 30px;
    border: 3px solid #a31b3f;
    border-radius: 20px;
  }

  .completion {
    height: 100%;
    width: 0%;
    border-radius: 20px;
    background-color: #bf617a;
  }
</style>
