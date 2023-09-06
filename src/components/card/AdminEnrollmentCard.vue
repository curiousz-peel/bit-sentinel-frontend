<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { enrollment } = defineProps(["enrollment"]);
  const emit = defineEmits(["removeEnrollment"]);

  const deleteEnrollment = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/enrollment/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeEnrollment", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateEnrollment = async (enrollment) => {
    console.log("VALORI", enrollment.isModerator, enrollment.isAuthor);
    await axios({
      method: "put",
      url: `http://localhost:8080/api/enrollment/${enrollment.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        userID: enrollment.userID,
        courseID: enrollment.courseID,
        progressID: enrollment.progressID,
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
    <h2>{{ enrollment.id }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="enrollment.id" readonly />
      </div>
      <div class="form-group">
        <label for="userID">User Id:</label>
        <input type="text" :id="id" v-model="enrollment.userID" />
      </div>
      <div class="form-group">
        <label for="courseID">Course Id:</label>
        <input type="text" :id="id" v-model="enrollment.courseID" />
      </div>
      <div class="form-group">
        <label for="progressID">Progress Id:</label>
        <input type="text" :id="id" v-model="enrollment.progressID" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateEnrollment(enrollment)">Update</button>
      <button @click="deleteEnrollment(enrollment.id)">Delete</button>
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
