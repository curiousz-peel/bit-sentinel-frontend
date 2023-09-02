<script setup>
  import axios from "axios";
  import { ref, onBeforeMount } from "vue";
  import { useRouter } from "vue-router";
  import Hero from "../components/hero/Hero.vue";
  import CourseCard from "../components/card/CourseCard.vue";

  const router = useRouter();
  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));

  const courses = ref(null);

  onBeforeMount(async () => {
    await axios({
      method: "get",
      url: `http://localhost:8080/api/course/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        courses.value = response.data.data;
        console.log(courses.value);
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  });
</script>

<template>
  <main v-if="loggedIn">
    <div>
      <Hero></Hero>
      <div class="courses">
        <div class="all-courses">
          <h1 class="courses-section-first">.all_courses</h1>
          <div class="courses-container">
            <CourseCard
              v-for="course in courses"
              :key="course.title"
              :course="course"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
  <main v-else>
    {{ router.push("/auth") }}
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
