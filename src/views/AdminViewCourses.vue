<script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import Hero from "../components/hero/Hero.vue";
  import backButton from "../components/button/backButton.vue";
  import AdminCourseCard from "../components/card/AdminCourseCard.vue";

  const router = useRouter();

  const courses = ref([]);
  const loadedCourses = ref(false);

  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));

  onMounted(async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("bitSentinelToken")}`;

    await axios({
      method: "get",
      url: `http://localhost:8080/api/course`,
    })
      .then(function (response) {
        courses.value = response.data.data;
        console.log(response);
        loadedCourses.value = true;
      })
      .catch(function (error) {
        alert(error.response.data.data);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  });
  const removeCourse = (id) => {
    courses.value = courses.value.filter((n) => n.id != id);
  };
</script>

<template>
  <main v-if="loggedIn">
    <div class="background">
      <Hero></Hero>
      <div v-if="loadedCourses" class="course-cards">
        <div class="margins">
          <h1 class="course-cards-section-first">.admin_view_courses</h1>
          <div class="container">
            <ul v-if="loadedCourses">
              <TransitionGroup name="courses">
                <li v-for="course in courses" :key="course.id">
                  <AdminCourseCard
                    @removeCourse="removeCourse"
                    :course="course"
                  ></AdminCourseCard>
                </li>
              </TransitionGroup>
            </ul>
            <backButton />
          </div>
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </main>
  <main v-else>
    {{ router.push("/") }}
  </main>
</template>

<style scoped>
  .margins {
    margin-left: 15px;
  }
  .background {
    background-color: #341052;
    width: 100%;
    height: 100%;
  }
  .course-cards {
    background-color: #341052;
    background-size: auto;
    height: 100%;
    width: 100%;
    border: 5px solid;
    border-top: none;
    border-color: #1a0b28;
    margin-left: 15px;
    padding-bottom: 40px;
  }
  .course-cards-section-first {
    padding-bottom: 10px;
    padding-left: 20px;
    font-size: 45px;
    color: rgb(252, 236, 219);
    text-shadow: -2px 2px 2px #834db0, 2px 2px 2px #834db0, 2px -2px 2px #834db0,
      -2px -2px 2px #834db0;
  }
  main {
    background-size: cover;
  }
  button {
    font-size: 15px;
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
  .container {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    padding: 10px;
  }
  .container input {
    width: 100%;
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.13);
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: 1px 1px 20px rgba(255, 255, 255, 0.3);
  }
  ul {
    list-style: none;
    margin-left: -20px;
    padding: 0px;
    background-color: #341052;
    padding-left: 60px;
  }
  li {
    list-style: none;
    width: 80vw;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 10px;
    background-color: #834db0;
    color: whitesmoke;
    text-align: center;
    cursor: pointer;
  }
  .courses-enter-from {
    opacity: 0;
    transform: scale(0.5);
  }
  .courses-enter-to {
    opacity: 1;
    transform: scale(1);
  }
  .courses-enter-active {
    transition: all 0.5s ease;
  }
  .courses-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  .courses-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }
  .courses-leave-active {
    transition: all 0.5s ease;
    position: absolute;
  }
  .courses-move {
    transition: all 0.5s ease;
  }
</style>
