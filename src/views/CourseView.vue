<script setup>
  import Hero from "../components/hero/Hero.vue";
  import CourseCard from "../components/card/CourseCard.vue";
  import { courses } from "./sampleData";
  import { ref, computed, defineProps } from "vue";
  import { useRoute } from "vue-router";

  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));
  const isLoggedIn = computed(() => {
    return localStorage.getItem("bitSentinelToken");

    const route = useRoute();
    const courseId = parseInt(route.params.id);
  });
</script>

<template>
  <main v-if="loggedIn">
    <div>
      <Hero :backgroundImagePath="'../src/components/jpg/course1.jpg'" />
    </div>
    <div class="course-container">
      <h1 class="course-title">Course Title Here</h1>
      <h2 class="course-authors">John Doe, Mary Who</h2>
      <div class="content-and-tags">
        <div class="course-tags">
          <h2 class="tags-rating-header">.tags:</h2>
          <ul>
            <li class="tag">Web Development</li>
            <li class="tag">JavaScript</li>
            <li class="tag">Front-end</li>
          </ul>
        </div>
        <div class="course-content">
          <h1 class="course-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            doloremque illum cumque. Autem quod totam, iure consectetur eaque
            error magni facere nihil aliquid beatae, excepturi dolorum, sit odio
            cupiditate nisi. Quasi dignissimos placeat tempore adipisci
            excepturi beatae, sapiente ullam magnam quidem minus suscipit, eos
            iste dicta sed sunt soluta esse assumenda eius similique doloribus
            saepe sequi velit reiciendis. Omnis, aliquam temporibus eum
            voluptates, similique at beatae odit, recusandae necessitatibus fuga
            eligendi tempora explicabo quibusdam. Velit, aliquam accusamus!
            Magni excepturi dolore odit ratione non soluta aspernatur. Quidem
            dolores dolorem pariatur debitis vero veniam, aspernatur corrupti
            nam porro consequatur inventore itaque esse?
          </h1>
        </div>
      </div>
      <div class="rating-subscription">
        <h2 class="tags-rating-header">.rating:</h2>
        <div class="course-rating">
          <h2 class="rating">3.5</h2>
          <h2 class="out-of-rating">/5</h2>
        </div>
        <div class="rating-buttons">
          <button class="rating-button">1</button>
          <button class="rating-button">2</button>
          <button class="rating-button">3</button>
          <button class="rating-button">4</button>
          <button class="rating-button">5</button>
        </div>
        <div class="subscription">
          <h2 class="tags-rating-header">.tier:</h2>
          <h2 class="subscription-tier">Premium</h2>
        </div>
      </div>
      <div class="lessons-quizzes">
        <h1 class="lesson-header">Lessons</h1>
        <ul class="lesson-list">
          <li class="lesson">Lorem ipsum dolor sit.</li>
          <li class="lesson">Lorem ipsum dolor sit amet consectetur.</li>
          <li class="lesson">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </li>
          <li class="lesson">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, ex.
          </li>
          <li class="lesson">Lorem ipsum dolor sit amet consectetur.</li>
          <li class="lesson">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </li>
        </ul>
        <h1 class="quiz-header">Quizzes</h1>
        <ul class="quiz-list">
          <li class="quizz">Lorem ipsum dolor sit.</li>
          <li class="quizz">Lorem ipsum dolor sit amet consectetur.</li>
          <li class="quizz">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </li>
          <li class="quizz">Lorem ipsum dolor sit amet consectetur.</li>
          <li class="quizz">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </li>
        </ul>
      </div>
    </div>
  </main>
  <main v-else>
    <h1>not authorized</h1>
  </main>
</template>

<style scoped>
  /* .tag {
    list-style-type: none;
    font-size: 20px;
    color: #b430af;
    font-weight: bolder;
    background-color: #fcecdb;
    padding: 2px 5px 2px 5px;
    text-align: center;
    border-radius: 5px;
  }

  li.tag:not(:last-child) {
    margin-bottom: 15px;
  } */
  .quiz-header {
    color: #fcecdb;
    margin-bottom: 10px;
  }
  .lesson-header {
    color: #fcecdb;
    margin-bottom: 10px;
  }
  .quiz-list {
    list-style-type: none;
    display: flex;
    flex-direction: column;
  }
  .quizz {
    font-size: 20px;
    font-weight: bolder;
    display: inline-block;
    background-color: rgb(190, 140, 229);
    color: #1a0b28;
    padding: 2px 7px 2px 7px;
    border-radius: 3px;
    line-height: 30px;
    cursor: pointer;
  }
  .quizz:hover {
    background-color: rgb(130, 57, 186);
  }
  .lesson-list {
    list-style-type: none;
    display: flex;
    flex-direction: column;
  }
  .lesson {
    font-size: 20px;
    font-weight: bolder;
    display: inline-block;
    padding: 2px 7px 2px 7px;
    border-radius: 3px;
    background-color: #be2e5e;
    line-height: 30px;
    color: #fcecdb;
    cursor: pointer;
  }

  .lesson:hover {
    background-color: #9a1944;
  }

  li.quizz:not(:last-child) {
    margin-bottom: 15px;
  }

  li.lesson {
    margin-bottom: 15px;
  }

  .lessons-quizzes {
    width: 50vw;
    height: 100vh;
    justify-content: center;
    text-align: center;
    z-index: 2;
    margin-bottom: 40px;
    margin-top: -300px;
    margin-left: 90px;
  }
  .rating-buttons {
    display: flex;
    gap: 6px;
    margin-left: 40px;
    margin-bottom: 20px;
  }
  .rating-button {
    font-size: 30px;
    padding: 2px 8px;
    border-radius: 3px;
    background-color: #1a0b28;
    color: #fff;
    border: none;
    font-weight: bold;
  }

  .rating-button:hover {
    background-color: #762eb9;
  }

  .rating-subscription {
    display: inline-block;
    padding: 0 70em 0 0;
  }

  .tags-rating-header {
    color: white;
    margin-bottom: 8px;
    text-align: center;
    text-shadow: 3px 3px #b430af;
    font-size: 35px;
  }
  .content-and-tags {
    display: flex;
    gap: 50px;
    margin-left: -150px;
  }
  .course-container {
    display: flex;
    flex-direction: column;
    margin-left: 24px;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    background-color: #594866;
  }
  .course-content {
    max-width: 800px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
  }

  .course-title {
    font-size: 46px;
    font-weight: bold;
    margin: 0;
    margin-top: 20px;
    text-align: center;
    justify-self: center;
    background-color: #1a0b28;
    color: #fcecdb;
    padding: 0px 15px 0px 15px;
    border-radius: 25px;
    display: inline-block;
  }
  .course-authors {
    background-color: #b430af;
    color: #fcecdb;
    padding: 0px 3px 0px 3px;
    margin-bottom: 15px;
    border-radius: 8px;
    z-index: 2;
    margin-top: -7px;
    margin-left: 78px;
  }

  .course-description {
    font-size: 20px;
  }

  .course-tags {
    display: inline-block;
    font-size: 14px;
    margin: 10px 0;
  }

  .tag {
    list-style-type: none;
    font-size: 20px;
    color: #b430af;
    font-weight: bolder;
    background-color: #fcecdb;
    padding: 2px 5px 2px 5px;
    text-align: center;
    border-radius: 5px;
  }

  li.tag:not(:last-child) {
    margin-bottom: 15px;
  }

  .course-rating {
    display: flex;
    gap: 5px;
    align-items: center;
    font-size: 25px;
    color: #1a0b28;
    font-weight: bolder;
    margin-top: -28px;
    margin-left: 70px;
  }
  .rating {
    font-size: 55px;
    color: #fff;
    text-shadow: 2px 3px 5px #1a0b28;
  }

  .subscription-tier {
    font-size: 25px;
    background-color: #b430af;
    color: #fff;
    padding: 0 10px;
    margin-bottom: 20px;
    margin-right: 80px;
    border-radius: 3px;
    margin-left: 70px;
  }

  .subscription {
    display: flex;
    flex-direction: column;
  }
</style>
