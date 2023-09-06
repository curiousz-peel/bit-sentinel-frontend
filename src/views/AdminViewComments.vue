<script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import Hero from "../components/hero/Hero.vue";
  import backButton from "../components/button/backButton.vue";
  import AdminCommentCard from "../components/card/AdminCommentCard.vue";

  const router = useRouter();

  const comments = ref([]);
  const loadedComments = ref(false);

  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));

  onMounted(async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("bitSentinelToken")}`;

    await axios({
      method: "get",
      url: `http://localhost:8080/api/comment`,
    })
      .then(function (response) {
        comments.value = response.data.data;
        console.log(response);
        loadedComments.value = true;
      })
      .catch(function (error) {
        alert(error.response.data.data);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  });
  const removeComment = (id) => {
    comments.value = comments.value.filter((n) => n.id != id);
  };
</script>

<template>
  <main v-if="loggedIn">
    <div class="background">
      <Hero></Hero>
      <div v-if="loadedComments" class="comment-cards">
        <div class="margins">
          <h1 class="comment-cards-section-first">.admin_view_comments</h1>
          <div class="container">
            <ul v-if="loadedComments">
              <TransitionGroup name="comments">
                <li v-for="comment in comments" :key="comment.id">
                  <AdminCommentCard
                    @removeComment="removeComment"
                    :comment="comment"
                  ></AdminCommentCard>
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
  .comment-cards {
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
  .comment-cards-section-first {
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
  .comments-enter-from {
    opacity: 0;
    transform: scale(0.5);
  }
  .comments-enter-to {
    opacity: 1;
    transform: scale(1);
  }
  .comments-enter-active {
    transition: all 0.5s ease;
  }
  .comments-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  .comments-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }
  .comments-leave-active {
    transition: all 0.5s ease;
    position: absolute;
  }
  .comments-move {
    transition: all 0.5s ease;
  }
</style>
