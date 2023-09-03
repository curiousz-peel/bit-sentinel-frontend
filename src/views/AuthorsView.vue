<script setup>
  import axios from "axios";
  import { ref, onBeforeMount } from "vue";
  import { useRouter } from "vue-router";
  import Hero from "../components/hero/Hero.vue";
  import AuthorCard from "../components/card/AuthorCard.vue";

  const router = useRouter();
  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));

  const authors = ref(null);

  onBeforeMount(async () => {
    await axios({
      method: "get",
      url: `http://localhost:8080/api/author/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        authors.value = response.data.data;
        console.log(authors.value);
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
      <div class="author-page">
        <div class="authors-padding">
          <h1 class="authors-section">.authors</h1>
          <div class="authors-container">
            <AuthorCard
              v-for="author in authors"
              :key="author.ID"
              :author="author"
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
    .authors-container {
      grid-template-columns: 375px 375px 375px;
    }
  }
</style>
