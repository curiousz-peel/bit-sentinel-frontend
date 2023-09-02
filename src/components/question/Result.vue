<script setup>
  import { defineProps } from "vue";
  import { RouterLink } from "vue-router";
  const { quizQuestions, correctAnswers } = defineProps([
    "quizQuestions",
    "correctAnswers",
  ]);
</script>

<template>
  <div class="result">
    <p>Score</p>
    <h1>{{ correctAnswers }}/{{ quizQuestions }}</h1>
    <RouterLink to="/">Go Back</RouterLink>
  </div>
</template>

<style scoped>
  .result {
    text-align: center;
    padding: 100px 0;
  }

  p {
    font-size: 25px;
  }

  h1 {
    font-size: 45px;
  }
</style>
