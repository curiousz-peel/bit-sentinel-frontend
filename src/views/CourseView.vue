<script setup>
  import axios from "axios";
  import Hero from "../components/hero/Hero.vue";
  import { ref, onBeforeMount, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute();
  const router = useRouter();

  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));
  const userName = localStorage.getItem("userName");
  const courseId = parseInt(route.params.id);

  const course = ref(null);
  const user = ref(null);
  const subscription = ref(null);
  const lessons = ref([]);
  const quizzes = ref([]);

  let authors = [];
  let promises = [];

  const loadedCourse = ref(false);
  const loadedUser = ref(false);
  const loadedSubscription = ref(false);
  const loadedLessons = ref(false);
  const loadQuizzes = ref(false);

  const goToTag = (tagValue) => {
    router.push(`/course/tag/${tagValue}`);
  };

  const goToLesson = (lessonValue) => {
    router.push(`/lesson/${lessonValue}`);
  };

  const goToQuiz = (quizValue) => {
    router.push(`/quiz/${quizValue}`);
  };

  const rateCourse = (rating) => {
    console.log("RATE COURSE", rating);
  };

  onBeforeMount(async () => {
    await axios({
      method: "get",
      url: `http://localhost:8080/api/quiz/course/${courseId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        quizzes.value = response.data.data;
        console.log(quizzes.value);
        loadQuizzes.value = true;
      })
      .catch(function (error) {
        alert(error.response.data.data);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });

    await axios({
      method: "get",
      url: `http://localhost:8080/api/lesson/course/${courseId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        lessons.value = response.data.data;
        console.log(lessons.value);
        loadedLessons.value = true;
      })
      .catch(function (error) {
        alert(error.response.data.data);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });

    await axios({
      method: "get",
      url: `http://localhost:8080/api/course/${courseId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        course.value = response.data.data;
        console.log(course.value);
        loadedCourse.value = true;
      })
      .catch(function (error) {
        alert(error.response.data.data);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });

    for (const idx in course.value.authorIds) {
      promises.push(
        axios
          .get(
            `http://localhost:8080/api/author/${course.value.authorIds[idx]}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(
                  "bitSentinelToken"
                )}`,
              },
            }
          )
          .then((response) => {
            authors.push(
              response.data.data.firstName + " " + response.data.data.firstName
            );
          })
      );
    }
    Promise.all(promises).then(() => console.log(authors));

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
        console.log(user.value);
        loadedUser.value = true;
      })
      .catch(function (error) {
        alert(error.response.data.data);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });

    await axios({
      method: "get",
      url: `http://localhost:8080/api/plan/user/${user.value.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        subscription.value = response.data.data;
        console.log(subscription.value);
        loadedSubscription.value = true;
      })
      .catch(function (error) {
        alert(error.response.data.data);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  });

  const hasAccess = () => {
    return course.value.subscriptions.includes(
      subscription.value.subscriptionType
    );
  };
</script>

<template>
  <main v-if="loggedIn">
    <div>
      <Hero :backgroundImagePath="'../src/components/jpg/course1.jpg'" />
    </div>
    <div
      v-if="
        loadedCourse &&
        loadedSubscription &&
        loadedUser &&
        loadedLessons &&
        loadQuizzes
      "
    >
      <div class="course-container">
        <h1 class="course-title">{{ course.title }}</h1>
        <h2 class="course-authors">{{ authors.join(",") }}</h2>
        <div class="content-and-tags">
          <div class="course-tags">
            <h2 class="tags-rating-header">.tags:</h2>
            <ul>
              <li class="tag" v-for="tag in course.tags" @click="goToTag(tag)">
                {{ tag }}
              </li>
            </ul>
          </div>
          <div class="course-content">
            <h1 class="course-description">
              {{ course.description }}
            </h1>
          </div>
        </div>
        <div class="rating-subscription">
          <h2 class="tags-rating-header">.rating:</h2>
          <div class="course-rating">
            <h2 class="rating">{{ course.rating }}</h2>
            <h2 class="out-of-rating">/5</h2>
          </div>
          <div v-if="hasAccess" class="rating-buttons">
            <button @click="rateCourse(1)" class="rating-button">1</button>
            <button @click="rateCourse(2)" class="rating-button">2</button>
            <button @click="rateCourse(3)" class="rating-button">3</button>
            <button @click="rateCourse(4)" class="rating-button">4</button>
            <button @click="rateCourse(5)" class="rating-button">5</button>
          </div>
          <div class="subscription">
            <h2 class="tags-rating-header">.tier:</h2>
            <div v-for="tier in course.subscriptions">
              <h2 class="subscription-tier">{{ tier }}</h2>
            </div>
          </div>
        </div>
        <div class="lessons-quizzes">
          <h1 class="lesson-header">Lessons</h1>
          <ul class="lesson-list">
            <li
              class="lesson"
              v-for="lesson in lessons"
              @click="goToLesson(lesson)"
            >
              {{ lesson.title }}
            </li>
          </ul>
          <h1 class="quiz-header">Quizzes</h1>
          <ul class="quiz-list">
            <li
              class="quizz"
              v-for="quiz in quizzes"
              @click="goToQuiz(quiz.id)"
            >
              {{ quiz.title }}.
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>LOADING...</h1>
    </div>
  </main>
  <main v-else>
    {{ router.push("/auth") }}
  </main>
</template>

<style scoped>
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
    margin-top: -370px;
    margin-left: 90px;
  }
  .rating-buttons {
    display: flex;
    gap: 6px;
    margin-left: 40px;
    margin-bottom: 60px;
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
    padding: 0 70em 0 3em;
  }
  .tags-rating-header {
    color: white;
    margin-bottom: 8px;
    text-align: center;
    text-shadow: 3px 3px #b430af;
    font-size: 35px;
  }
  .course-tags .tags-rating-header {
    margin-left: 120px;
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
    margin-left: 45px;
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
    cursor: pointer;
    margin-left: 120px;
  }
  .tag:hover {
    background-color: #b430af;
    color: #fcecdb;
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
    margin-left: 20px;
    text-shadow: 2px 3px 5px #1a0b28;
  }
  .subscription-tier {
    font-size: 25px;
    background-color: #b430af;
    color: #fff;
    padding: 0 10px;
    text-align: center;
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
