<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { quiz } = defineProps(["quiz"]);
  const emit = defineEmits(["removeQuiz"]);

  const deleteQuiz = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/quiz/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeQuiz", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateQuiz = async (quiz) => {
    console.log("VALORI", quiz.isModerator, quiz.isAuthor);
    await axios({
      method: "put",
      url: `http://localhost:8080/api/quiz/${quiz.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        title: quiz.title,
        description: quiz.description,
        questionIDs: quiz.questionIDs,
        courseId: quiz.courseId,
        lessonId: quiz.lessonId,
      },
    }).catch(function (error) {
      alert(error.response.data.data);
      if (error.response.data.data === "Token is expired") {
        router.push("/auth");
      }
    });
  };
</script>

<template>
  <div>
    <h2>{{ quiz.title }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="quiz.id" readonly />
      </div>
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" :id="id" v-model="quiz.title" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" :id="id" v-model="quiz.description" />
      </div>
      <div class="form-group">
        <label for="questionIDs">Question Ids:</label>
        <input type="text" :id="id" v-model="questionIDs.text" />
      </div>

      <div class="form-group">
        <label for="courseId">Course Id:</label>
        <input type="text" :id="id" v-model="courseId.text" />
      </div>
      <div class="form-group">
        <label for="lessonId">Lesson Id:</label>
        <input type="text" :id="id" v-model="lessonId.text" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateQuiz(quiz)">Update</button>
      <button @click="deleteQuiz(quiz.id)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  button {
    cursor: pointer;
  }
</style>
