<script setup>
  import Hero from "../components/hero/Hero.vue";
  import AuthorCard from "../components/card/AuthorCard.vue";
  import { authors } from "./authorData";
</script>

<template>
  <main>
    <div>
      <Hero></Hero>
      <div class="author-page">
        <div class="authors-padding">
          <h1 class="authors-section">.authors</h1>
          <div class="authors-container">
            <AuthorCard
              v-for="author in authors"
              :key="author.Id"
              :author="author"
            />
          </div>
        </div>
        <!-- <KeepAlive>
        <CourseCards></CourseCards>
      </KeepAlive> -->
      </div>
    </div>
  </main>
</template>

<style scoped>
  .author-page {
    background-color: #341052;
    width: 100vw;
    border: 5px solid;
    border-top: none;
    border-color: #1a0b28;
    min-height: 100vh;
    margin-left: 15px;
    padding-bottom: 40px;
  }
  .authors-padding {
    padding-top: 10px;
    padding-left: 25px;
  }

  .authors-section {
    padding-bottom: 10px;
    padding-left: 20px;
    font-size: 45px;
    color: rgb(252, 236, 219);
    text-shadow: -2px 2px 2px #834db0, 2px 2px 2px #834db0, 2px -2px 2px #834db0,
      -2px -2px 2px #834db0;
  }

  .authors-container {
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
