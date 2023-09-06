<template>
  <div>
    <h2>{{ author.ID }}</h2>
    <form>
      <div class="form-group">
        <label for="userId">User ID:</label>
        <input type="text" :id="userId" v-model="author.userId" readonly />
      </div>
      <div class="form-group">
        <label for="profession">Profession:</label>
        <input type="text" :id="profession" v-model="author.profession" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea :id="description" v-model="author.description"></textarea>
      </div>
      <div class="form-group">
        <label for="topics">Topics:</label>
        <input type="text" :id="topics" v-model="author.topics" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateAuthor(author)">Update</button>
      <button @click="deleteAuthor(author.ID)">Delete</button>
    </div>
  </div>
</template>

<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { author } = defineProps(["author"]);
  const emit = defineEmits(["removeAuthor"]);

  console.log(author);

  const deleteAuthor = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/author/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeAuthor", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateAuthor = async (author) => {
    await axios({
      method: "put",
      url: `http://localhost:8080/api/author/${author.ID}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        userId: author.userId,
        profession: author.profession,
        description: author.description,
        topics: author.topics,
      },
    }).catch(function (error) {
      alert(error.response.data.data);
      if (error.response.data.data === "Token is expired") {
        router.push("/auth");
      }
    });
  };
</script>

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
