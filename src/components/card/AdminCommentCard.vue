<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { comment } = defineProps(["comment"]);
  const emit = defineEmits(["removeComment"]);

  const deleteComment = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/comment/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeComment", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateComment = async (comment) => {
    console.log("VALORI", comment.isModerator, comment.isAuthor);
    await axios({
      method: "put",
      url: `http://localhost:8080/api/comment/${comment.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        userID: comment.userID,
        courseID: comment.courseID,
        text: comment.text,
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
    <h2>{{ comment.id }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="comment.id" readonly />
      </div>
      <div class="form-group">
        <label for="userID">User Id:</label>
        <input type="text" :id="id" v-model="comment.userID" />
      </div>
      <div class="form-group">
        <label for="courseID">Course Id:</label>
        <input type="text" :id="id" v-model="comment.courseID" />
      </div>
      <div class="form-group">
        <label for="text">Text:</label>
        <input type="text" :id="id" v-model="comment.text" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateComment(comment)">Update</button>
      <button @click="deleteComment(comment.id)">Delete</button>
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
