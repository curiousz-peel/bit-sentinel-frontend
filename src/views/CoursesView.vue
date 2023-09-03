<script setup>
  import axios from "axios";
  import { ref, onBeforeMount, watch } from "vue";
  import { useRouter } from "vue-router";
  import Hero from "../components/hero/Hero.vue";
  import CourseCard from "../components/card/CourseCard.vue";

  const router = useRouter();
  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));

  const coursesSearch = ref("");
  const search = ref("");
  var courses;

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
        courses = response.data.data;
        coursesSearch.value = courses;
      })
      .catch(function (error) {
        alert(error.response.data.data);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  });

  watch(search, () => {
    if (search.value === "") {
      coursesSearch.value = courses;
    } else {
      coursesSearch.value = courses.filter((course) =>
        course.title.toLowerCase().includes(search.value.toLowerCase())
      );
    }
  });
</script>

<template>
  <main v-if="loggedIn">
    <div>
      <Hero></Hero>
      <div class="courses">
        <div class="search-bar-container">
          <input
            class="search-bar"
            v-model.trim="search"
            type="text"
            placeholder="Search Courses..."
          />
        </div>
        <div class="all-courses">
          <h1 class="courses-section-first">.all_courses</h1>
          <div class="courses-container">
            <CourseCard
              v-for="(course, index) in coursesSearch"
              :key="course.title"
              :course="course"
              :data-index="index"
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
  .search-bar-container {
    width: 100vw;
    height: 90px;
    text-align: center;
    padding-bottom: 10px;
    position: relative;
  }
  .search-bar {
    position: absolute;
    bottom: 0;
    margin-left: -300px;
    bottom: 10px;
    width: 400px;
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
    background-color: #834db0;
    color: #fcecdb;
    border-radius: 12px;
    border-color: rgba(252, 236, 219, 0.8);
    border: 1px solid;
    /* border-style: none; */
  }

  input::placeholder {
    font-weight: bold;
    opacity: 0.5;
    color: #fcecdb;
  }
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
    color: #fcecdb;
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
