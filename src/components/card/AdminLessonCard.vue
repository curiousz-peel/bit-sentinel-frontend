<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";
  import router from "vue-router";

  const { lesson } = defineProps(["lesson"]);
  const emit = defineEmits(["removeLesson"]);

  const deleteLesson = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/lesson/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeLesson", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateLesson = async (lesson) => {
    await axios({
      method: "put",
      url: `http://localhost:8080/api/lesson/${lesson.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        title: lesson.title,
        order: lesson.order,
        courseId: lesson.courseId,
        summary: lesson.summary,
        contentIds: lesson.contentIds,
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
    <h2>{{ lesson.title }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="lesson.id" readonly />
      </div>
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" :id="title" v-model="lesson.title" />
      </div>
      <div class="form-group">
        <label for="order">Order:</label>
        <input type="text" :id="order" v-model="lesson.order" />
      </div>
      <div class="form-group">
        <label for="courseId">Course ID:</label>
        <input type="text" :id="courseId" v-model="lesson.courseId" />
      </div>
      <div class="form-group">
        <label for="summary">Summary:</label>
        <textarea :id="summary" v-model="lesson.summary"></textarea>
      </div>
      <div class="form-group">
        <label for="contentIds">Content IDs:</label>
        <input type="text" :id="contentIds" v-model="lesson.contentIds" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateLesson(lesson)">Update</button>
      <button @click="deleteLesson(lesson.id)">Delete</button>
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
