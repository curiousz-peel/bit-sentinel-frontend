<script setup>
  import Hero from "../components/hero/Hero.vue";
  import Question from "../components/question/Question.vue";
  import QuizHeader from "../components/question/QuizHeader.vue";
  import Result from "../components/question/Result.vue";
  import { useRoute } from "vue-router";
  import { ref, watch, computed, defineProps } from "vue";
  import quizzes from "./quizzes.json";

  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));
  const route = useRoute();
  const courseId = parseInt(route.params.id);
  const isLoggedIn = computed(() => {
    return localStorage.getItem("bitSentinelToken");
  });

  const currentQuestionIndex = ref(0);
  const quizId = parseInt(route.params.id);
  const quiz = quizzes.find((q) => q.id === quizId);
  const correctAnswers = ref(0);
  const showResults = ref(false);

  const quizProgress = computed(
    () => `${currentQuestionIndex.value}/${quiz.questions.length}`
  );
  const barPercentage = computed(
    () => `${(currentQuestionIndex.value / quiz.questions.length) * 100}%`
  );

  const onOptionSelected = (isCorrect) => {
    if (isCorrect) {
      correctAnswers.value++;
    }
    if (quiz.questions.length - 1 === currentQuestionIndex.value) {
      showResults.value = true;
    }
    currentQuestionIndex.value++;
  };
</script>

<template>
  <main v-if="loggedIn">
    <div class="quiz-container">
      <h1 class="quiz-title">Quiz Title Here</h1>
      <div class="quiz-content">
        <h1 class="quiz-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
          doloremque illum cumque. Autem quod totam, iure consectetur eaque
          error magni facere nihil aliquid beatae, excepturi dolorum, sit odio
          cupiditate nisi. Quasi dignissimos placeat tempore adipisci excepturi
          beatae, sapiente ullam magnam quidem minus suscipit, eos iste dicta
          sed sunt soluta esse assumenda eius similique doloribus saepe sequi
          velit reiciendis. Omnis, aliquam temporibus eum voluptates, similique
          at beatae odit, recusandae necessitatibus fuga eligendi tempora
          explicabo quibusdam. Velit, aliquam accusamus! Magni excepturi dolore
          odit ratione non soluta aspernatur. Quidem dolores dolorem pariatur
          debitis vero veniam, aspernatur corrupti nam porro consequatur
          inventore itaque esse?
        </h1>
      </div>
      <div class="quiz-component">
        <QuizHeader
          :quizProgress="quizProgress"
          :barPercentage="barPercentage"
        />
        <div>
          <Question
            v-if="!showResults"
            :question="quiz.questions[currentQuestionIndex]"
            @selectOption="onOptionSelected"
          />
          <Result
            v-else
            :quizQuestions="quiz.questions.length"
            :correctAnswers="correctAnswers"
          />
        </div>
      </div>
      <div class="button-container">
        <!-- @click="page--" -->
        <button>&lt</button>
        <!-- @click="page++" -->
        <button>></button>
      </div>
    </div>
  </main>
  <main v-else>
    <h1>not authorized</h1>
  </main>
</template>

<style scoped>
  .quiz-component {
    margin-top: 20px;
    background-color: #fcecdb;
    width: 60vw;
    padding: 0 20px 5px 20px;
    border-radius: 5px;
  }
  .quiz-container {
    display: flex;
    flex-direction: column;
    margin-left: 24px;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    background-color: #a31b3f;
  }
  .quiz-content {
    max-width: 800px;
    margin: 20px auto;
    background-color: #fcecdb;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
  }
  .quiz-title {
    font-size: 46px;
    font-weight: bold;
    margin: 0;
    margin-top: 20px;
    text-align: center;
    justify-self: center;
    background-color: #fcecdb;
    color: #1a0b28;
    padding: 0px 15px 0px 15px;
    border-radius: 10px;
    display: inline-block;
    margin-bottom: 20px;
  }
  .quiz-description {
    font-size: 20px;
    font-weight: 500;
  }
  .button-container {
    display: flex;
    gap: 12px;
    justify-content: center;
    padding-top: 30px;
    margin-bottom: 50px;
  }
  .button-container button {
    border: none;
    font-weight: bolder;
    font-size: 20px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin: 0 5px;
    cursor: pointer;
    background-color: #fcecdb;
  }
  .button-container button:hover {
    background-color: #1a0b28;
    color: #fcecdb;
  }
</style>
