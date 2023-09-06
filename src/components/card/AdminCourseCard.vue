<template>
  <div>
    <h2>{{ course.id + " " + course.title }}</h2>
    <form>
      <div class="form-group">
        <label for="id">Course Title:</label>
        <input type="text" :id="title" v-model="course.title" readonly />
      </div>
      <div class="form-group">
        <label for="profession">Description:</label>
        <textarea type="text" :id="description" v-model="course.descriptiom" />
      </div>
      <div class="form-group">
        <label for="authorsIds">Authors IDs:</label>
        <textarea :id="authorsIds" v-model="course.authorIds"></textarea>
      </div>
      <div class="form-group">
        <label for="subscriptions">Subscriptions:</label>
        <input type="text" :id="subscriptions" v-model="course.subscriptions" />
      </div>
      <div class="form-group">
        <label for="tags">Tags:</label>
        <input type="text" :id="tags" v-model="course.tags" />
      </div>
      <div class="form-group">
        <label for="rating">Rating:</label>
        <input type="text" :id="rating" v-model="course.rating" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateCourse(course)">Update</button>
      <button @click="deleteCourse(course.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { course } = defineProps(["course"]);
  const emit = defineEmits(["removeCourse"]);

  console.log(course);

  const deleteCourse = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/course/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeCourse", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateCourse = async (course) => {
    await axios({
      method: "put",
      url: `http://localhost:8080/api/course/${course.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        title: course.title,
        description: course.description,
        authorIds: course.authorIds,
        tags: course.tags,
        subscriptions: course.subscriptions,
        rating: course.rating,
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
