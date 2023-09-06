<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { type } = defineProps(["type"]);
  const emit = defineEmits(["removeType"]);

  const deleteType = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/type/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeType", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateType = async (type) => {
    console.log("VALORI", type.isModerator, type.isAuthor);
    await axios({
      method: "put",
      url: `http://localhost:8080/api/type/${type.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        type: type.type,
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
    <h2>{{ type.id }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="type.id" readonly />
      </div>
      <div class="form-group">
        <label for="type">Type:</label>
        <input type="text" :id="id" v-model="type.type" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateType(type)">Update</button>
      <button @click="deleteType(type.id)">Delete</button>
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
