<script setup>
  import Hero from "../components/hero/Hero.vue";
  import CourseCard from "../components/card/CourseCard.vue";
  import { courses } from "./sampleData";
  import { ref, computed } from "vue";

  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));
  const isLoggedIn = computed(() => {
    return localStorage.getItem("bitSentinelToken");
  });
</script>

<template>
  <main v-if="loggedIn">
    <div>
      <Hero></Hero>
      <div class="courses">
        <div class="all-courses">
          <h1 class="courses-section-first">.my_courses</h1>
          <div class="courses-container">
            <CourseCard
              v-for="course in courses"
              :key="course.title"
              :course="course"
            />
          </div>
        </div>
        <!-- <KeepAlive>
        <CourseCards></CourseCards>
      </KeepAlive> -->
      </div>
    </div>
  </main>
  <main v-else>
    <h1>not authorized</h1>
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
  .courses-section {
    padding-top: 25px;
    padding-bottom: 10px;
    padding-left: 20px;
    font-size: 45px;
    color: rgb(252, 236, 219);
    text-shadow: -2px 2px 2px #834db0, 2px 2px 2px #834db0, 2px -2px 2px #834db0,
      -2px -2px 2px #834db0;
  }

  .courses-prodigies {
    padding-bottom: 10px;
    padding-top: 25px;
    padding-left: 20px;
    color: rgb(252, 236, 219);
    text-shadow: rgb(180, 48, 175) 1px 0 10px, rgb(180, 48, 175) 1px 0 15px,
      rgb(180, 48, 175) 1px 0 25px, rgb(180, 48, 175) 1px 0 40px,
      rgb(180, 48, 175) 1px 0 52px;
    font-size: 30px;
  }

  .courses-foundations {
    padding-bottom: 10px;
    padding-top: 25px;
    padding-left: 20px;
    font-size: 30px;
    color: rgb(180, 48, 175);
    text-shadow: rgb(106, 57, 147) 1px 0 10px, rgb(106, 57, 147) 1px 0 15px,
      rgb(106, 57, 147) 1px 0 25px, rgb(106, 57, 147) 1px 0 40px,
      rgb(106, 57, 147) 1px 0 52px;
  }

  .courses-container {
    display: grid;
    grid-template-columns: 375px 375px 375px;
    grid-template-rows: minmax(150px, 1fr);
    column-gap: 15px;
    row-gap: 20px;
    padding-bottom: 0;
  }

  @media screen and (min-width: 800px) {
    .courses-container {
      grid-template-columns: 375px 375px 375px;
    }
  }
</style>
