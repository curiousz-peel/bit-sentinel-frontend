<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { option } = defineProps(["option"]);
  const emit = defineEmits(["removeQuestion"]);

  const deleteQuestion = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/option/${id}`,
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

  const updateQuestion = async (option) => {
    console.log("VALORI", option.isModerator, option.isAuthor);
    await axios({
      method: "put",
      url: `http://localhost:8080/api/option/${option.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        questionID: option.questionID,
        isCorrect: option.isCorrect,
        text: option.text,
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
    <h2>{{ option.text }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="option.id" readonly />
      </div>
      <div class="form-group">
        <label for="questionID">Question Id:</label>
        <input type="text" :id="id" v-model="option.questionID" />
      </div>
      <div class="form-group">
        <label for="isCorrect">Is Correct:</label>
        <input type="text" :id="id" v-model="option.isCorrect" />
      </div>
      <div class="form-group">
        <label for="text">Text:</label>
        <input type="text" :id="id" v-model="option.text" />
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
