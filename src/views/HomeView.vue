<script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import CourseCard from "../components/card/CourseCard.vue";
  import Hero from "../components/hero/Hero.vue";

  const router = useRouter();
  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));

  const recentCourses = ref(null);
  const bestRatedCourses = ref(null);
  const fundamentalCourses = ref(null);

  const userName = localStorage.getItem("userName");
  const user = ref(null);
  const loadedUser = ref(false);

  onMounted(async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("bitSentinelToken")}`;

    await axios
      .all([
        axios.get(`http://localhost:8080/api/course/recent`),
        axios.get(`http://localhost:8080/api/course/rating`),
        axios.get(`http://localhost:8080/api/course/fundamental`),
      ])
      .then(
        axios.spread((recent, bestRated, fundamental) => {
          recentCourses.value = recent.data.data;
          bestRatedCourses.value = bestRated.data.data;
          fundamentalCourses.value = fundamental.data.data;
        })
      );

    await axios({
      method: "get",
      url: `http://localhost:8080/api/user/name/${userName}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        user.value = response.data.data;
        localStorage.setItem("isAuthor", response.data.data.isAuthor);
        localStorage.setItem("isModerator", response.data.data.isModerator);
        localStorage.setItem("id", response.data.data.id);
        loadedUser.value = true;
      })
      .catch(function (error) {
        alert(error.response.data.data);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  });
</script>

<template>
  <main v-if="loggedIn">
    <div>
      <Hero></Hero>
      <div class="home">
        <div class="home-courses">
          <h1 class="courses-section-first">.newcomers</h1>
          <div class="courses-container">
            <CourseCard
              v-for="course in recentCourses"
              :key="course.title"
              :course="course"
            />
          </div>
          <h1 class="courses-section">.prodigies</h1>
          <div class="courses-container">
            <CourseCard
              v-for="course in bestRatedCourses"
              :key="course.title"
              :course="course"
            />
          </div>
          <h1 class="courses-section">.pillars</h1>
          <div class="courses-container">
            <CourseCard
              v-for="course in fundamentalCourses"
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
  .home {
    background-color: #341052;
    width: 100vw;
    border: 5px solid;
    border-top: none;
    border-color: #1a0b28;
    min-height: 100vh;
    margin-left: 15px;
    padding-bottom: 40px;
  }
  .home-courses {
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
