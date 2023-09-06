<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { rating } = defineProps(["rating"]);
  const emit = defineEmits(["removeRating"]);

  const deleteRating = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/rating/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeRating", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateRating = async (rating) => {
    console.log("VALORI", rating.isModerator, rating.isAuthor);
    await axios({
      method: "put",
      url: `http://localhost:8080/api/rating/${rating.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        userID: rating.userID,
        courseID: rating.courseID,
        rating: rating.rating,
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
    <h2>{{ rating.id }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="rating.id" readonly />
      </div>
      <div class="form-group">
        <label for="userID">User Id:</label>
        <input type="text" :id="id" v-model="rating.userID" />
      </div>
      <div class="form-group">
        <label for="courseID">courseID:</label>
        <input type="text" :id="id" v-model="rating.courseID" />
      </div>
      <div class="form-group">
        <label for="rating">Rating:</label>
        <input type="text" :id="id" v-model="rating.rating" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateRating(rating)">Update</button>
      <button @click="deleteRating(rating.id)">Delete</button>
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
