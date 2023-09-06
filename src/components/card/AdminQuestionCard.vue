<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { question } = defineProps(["question"]);
  const emit = defineEmits(["removeQuestion"]);

  const deleteQuestion = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/question/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeQuestion", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateQuestion = async (question) => {
    console.log("VALORI", question.isModerator, question.isAuthor);
    await axios({
      method: "put",
      url: `http://localhost:8080/api/question/${question.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        text: question.text,
        optionIds: question.optionIds,
        quizId: question.quizId,
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
    <h2>{{ question.text }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="question.id" readonly />
      </div>
      <div class="form-group">
        <label for="text">Text:</label>
        <input type="text" :id="id" v-model="question.text" />
      </div>
      <div class="form-group">
        <label for="optionIds">Option Ids:</label>
        <input type="text" :id="id" v-model="question.optionIds" />
      </div>
      <div class="form-group">
        <label for="quizId">Quiz Id:</label>
        <input type="text" :id="id" v-model="question.quizId" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateQuestion(quiz)">Update</button>
      <button @click="deleteQuestion(quiz.id)">Delete</button>
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
