<script setup>
  import { defineProps, defineEmits } from "vue";

  const { question } = defineProps(["question"]);
  const emit = defineEmits(["selectOption"]);
  const emitSelectedOption = (isCorrect) => {
    emit("selectOption", isCorrect);
  };
</script>

<template>
  <div class="question-container">
    <h1 class="question">{{ question.text }}?</h1>
  </div>
  <div class="options-container">
    <div
      v-for="option in question.options"
      class="option"
      @click="emitSelectedOption(option.isCorrect)"
    >
      <p class="option-label">{{ option.label }}</p>
      <div class="option-value">
        <p>{{ option.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .question-container {
    margin-top: 20px;
  }

  .question {
    margin-top: -10px;
    font-size: 30px;
    margin-bottom: 15px;
    margin-left: 20px;
  }

  .option {
    display: flex;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .option-label {
    background-color: rgb(184, 23, 23);
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    width: 50px;
    height: 50px;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(242, 238, 245);
  }

  .option-value {
    height: 50px;
    width: 100%;
    border-radius: 5px;
    margin-left: -10px;
    font-size: 25px;
    justify-content: center;
    justify-self: center;
    align-content: center;
    background-color: rgba(184, 23, 23, 0.8);
    padding: 0 20px;
    color: rgb(255, 255, 255);
  }
</style>
