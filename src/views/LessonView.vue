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
    <!-- <div>
      <Hero :backgroundImagePath="'../src/components/jpg/lesson1.jpg'" />
    </div> -->
    <div class="course-container">
      <h1 class="lesson-title">Lesson Title Here</h1>
      <video
        width="1000"
        height="1000"
        controls="controls"
        class="course-video"
        playsinline
        autoplay
        muted
        loop
      >
        <source src="../assets/courseVideos/01_video.mp4" type="video/mp4" />
      </video>
      <div class="document">
        <embed
          src="../src/assets/coursePDFs/01_pdf.pdf"
          width="1000"
          height="600"
        />
      </div>
      <div class="content-and-tags">
        <div class="lesson-content">
          <h1 class="lesson-description">
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
      <div class="button-container">
        <!-- @click="page--" -->
        <button>&lt</button>
        <!-- @click="page++" -->
        <button>></button>
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
  .document {
    margin-bottom: 40px;
  }
  .quiz-header {
    color: #fcecdb;
    margin-bottom: 10px;
  }
  .course-video {
    margin-bottom: 40px;
    border-radius: 20px;
    box-shadow: 2px 2px 5px #1a0b28;
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
  }
  .content-and-tags {
    display: flex;
    gap: 50px;
  }
  .course-container {
    display: flex;
    flex-direction: column;
    margin-left: 24px;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    background-color: #48404f;
  }
  .lesson-content {
    max-width: 800px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
  }

  .lesson-title {
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
    margin-bottom: 45px;
  }

  .lesson-description {
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
