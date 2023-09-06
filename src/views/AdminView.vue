<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import Hero from "../components/hero/Hero.vue";

  const router = useRouter();

  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));

  const goToUsers = () => {
    router.push("/playground/users");
  };
  const goToAuthors = () => {
    router.push("/playground/authors");
  };
  const goToCourses = () => {
    router.push("/playground/courses");
  };
  const goToQuizzes = () => {
    router.push("/playground/quizzes");
  };
  const goToSubscriptions = () => {
    router.push("/playground/subscriptions");
  };
  const goToRatings = () => {
    router.push("/playground/ratings");
  };
  const goToMedia = () => {
    router.push("/playground/medias");
  };
  const goToEnrollments = () => {
    router.push("/playground/enrollments");
  };
  const goToLessons = () => {
    router.push("/playground/lessons");
  };
  const goToComments = () => {
    router.push("/playground/comments");
  };
  const goToQuestions = () => {
    router.push("/playground/questions");
  };
  const goToOptions = () => {
    router.push("/playground/options");
  };
  const goToPlans = () => {
    router.push("/playground/plans");
  };
  const goToProgress = () => {
    router.push("/playground/progress");
  };
  const goToMediaTypes = () => {
    router.push("/playground/types");
  };
</script>

<template>
  <main v-if="loggedIn">
    <div>
      <Hero></Hero>
      <div class="courses">
        <div class="all-courses">
          <h1 class="courses-section-first">.admin_view</h1>
          <div class="commands-container">
            <button @click="goToUsers">USERS</button>
            <button @click="goToAuthors">AUTHORS</button>
            <button @click="goToCourses">COURSES</button>
            <button @click="goToLessons">LESSONS</button>
            <button @click="goToComments">COMMENTS</button>
            <button @click="goToQuizzes">QUIZZES</button>
            <button @click="goToQuestions">QUESTIONS</button>
            <button @click="goToOptions">OPTIONS</button>
            <button @click="goToSubscriptions">SUBSCRIPTIONS</button>
            <button @click="goToPlans">PLANS</button>
            <button @click="goToRatings">RATINGS</button>
            <button @click="goToProgress">PROGRESS</button>
            <button @click="goToMedia">MEDIA/TYPES</button>
            <button @click="goToMediaTypes">TYPES</button>
            <button @click="goToEnrollments">ENROLLMENTS</button>
          </div>
        </div>
      </div>
    </div>
  </main>
  <main v-else>
    {{ router.push("/") }}
  </main>
</template>

<style scoped>
  .courses {
    background-color: #341052;
    width: 100vw;
    border: 5px solid;
    border-top: none;
    border-color: #1a0b28;
    min-height: 100vh;
    margin-left: 15px;
    padding-bottom: 40px;
  }
  .all-courses {
    padding-top: 10px;
    padding-left: 25px;
  }
  .courses-section-first {
    padding-bottom: 10px;
    padding-left: 20px;
    font-size: 45px;
    color: rgb(252, 236, 219);
    text-shadow: -2px 2px 2px #834db0, 2px 2px 2px #834db0, 2px -2px 2px #834db0,
      -2px -2px 2px #834db0;
  }
  .commands-container {
    margin-left: 30px;
    display: grid;
    grid-template-columns: 250px 250px 250px 250px;
    grid-template-rows: 250px 250px 250px 250px;
    column-gap: 30px;
    row-gap: 30px;
    padding-bottom: 0;
  }

  button {
    font-size: 20px;
    font-weight: bolder;
    text-align: center;
    color: rgb(252, 236, 219);
    background-color: #6c4292;
    border: none;
    border-radius: 12px;
    cursor: pointer;
  }
  button:hover {
    box-shadow: 3px 3px 5px #b497ce;
    border: solid #b497ce;
    border-radius: 10px;
  }
  button:active {
    background-color: #9b5dd4;
  }
</style>
