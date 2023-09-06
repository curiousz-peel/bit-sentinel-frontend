<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { media } = defineProps(["media"]);
  const emit = defineEmits(["removeMedia"]);

  const deleteMedia = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/media/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeMedia", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateMedia = async (media) => {
    console.log("VALORI", media.isModerator, media.isAuthor);
    await axios({
      method: "put",
      url: `http://localhost:8080/api/media/${media.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        lessonID: media.lessonID,
        filePath: media.filePath,
        fileTypeName: media.fileTypeName,
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
    <h2>{{ media.id }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="media.id" readonly />
      </div>
      <div class="form-group">
        <label for="lessonID">Lesson Id:</label>
        <input type="text" :id="id" v-model="media.lessonID" />
      </div>
      <div class="form-group">
        <label for="filePath">File Path:</label>
        <input type="text" :id="id" v-model="media.filePath" />
      </div>
      <div class="form-group">
        <label for="fileTypeName">File Type:</label>
        <input type="text" :id="id" v-model="media.fileTypeName" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateMedia(media)">Update</button>
      <button @click="deleteMedia(media.id)">Delete</button>
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
