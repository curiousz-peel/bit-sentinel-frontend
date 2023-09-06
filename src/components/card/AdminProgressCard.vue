<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { progress } = defineProps(["progress"]);
  const emit = defineEmits(["removeProgress"]);

  const deleteProgress = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/progress/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeProgress", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateProgress = async (progress) => {
    console.log("VALORI", progress.isModerator, progress.isAuthor);
    await axios({
      method: "put",
      url: `http://localhost:8080/api/progress/${progress.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        completed: progress.completed,
        progress: progress.progress,
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
    <h2>{{ progress.id }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="progress.id" readonly />
      </div>
      <div class="form-group">
        <label for="completed">Completed:</label>
        <input type="text" :id="id" v-model="progress.completed" />
      </div>
      <div class="form-group">
        <label for="progress">Progress:</label>
        <input type="text" :id="id" v-model="progress.progress" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateProgress(progress)">Update</button>
      <button @click="deleteProgress(progress.id)">Delete</button>
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
