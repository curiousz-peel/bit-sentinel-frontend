<script setup>
  import Hero from "../components/hero/Hero.vue";
  import CourseCard from "../components/card/CourseCard.vue";
  import { courses } from "./sampleData";
  import { ref, computed, defineProps } from "vue";

  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));
  const isLoggedIn = computed(() => {
    return localStorage.getItem("bitSentinelToken");
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
      <div class="rating-subscription-and-lessons">
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
    </div>
  </main>
  <main v-else>
    <h1>not authorized</h1>
  </main>
</template>

<!-- color: #fcecdb;
background-color: #6a3993;
font-size: large;
font-weight: bold;
width: 100%;
cursor: pointer;
text-decoration: none;
}

.sidebar-nav-button:hover {
background-color: rgb(252, 236, 219);
color: #b430af;
} -->

<style scoped>
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

  .rating-subscription-and-lessons {
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
    display: inline-block; /* Add this property */
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
