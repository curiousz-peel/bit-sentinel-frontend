<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { user } = defineProps(["user"]);
  const emit = defineEmits(["removeUser"]);

  const deleteUser = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/user/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeUser", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateUser = async (user) => {
    await axios({
      method: "put",
      url: `http://localhost:8080/api/user/${user.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        userName: user.userName,
        password: user.password,
        isAuthor: user.isAuthor,
        isModerator: user.isModerator,
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
    <h2>{{ user.userName }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="user.id" readonly />
      </div>
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" :id="id" v-model="user.firstName" />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" :id="id" v-model="user.lastName" />
      </div>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" :id="id" v-model="user.userName" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" :id="id" v-model="user.email" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="text" :id="id" v-model="user.password" />
      </div>
      <div class="form-group">
        <label for="isModerator">Is Moderator:</label>
        <input type="checkbox" :id="id" v-model="user.isModerator" />
      </div>
      <div class="form-group">
        <label for="isAdmin">Is Admin:</label>
        <input type="checkbox" :id="id" v-model="user.isAdmin" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateUser(user)">Update</button>
      <button @click="deleteUser(user.id)">Delete</button>
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
