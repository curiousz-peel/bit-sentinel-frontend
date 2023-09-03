<script setup>
  import axios from "axios";
  import { defineProps, onBeforeMount, ref } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const props = defineProps({
    course: {
      type: Object,
      required: true,
    },
  });

  const goToCourse = (id) => {
    router.push(`/course/${id}`);
  };

  const courseRatings = ref(null);
  onBeforeMount(async () => {
    await axios({
      method: "get",
      url: `http://localhost:8080/api/rating/course/${props.course.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        courseRatings.value = response.data.data;
      })
      .catch(function (error) {
        alert(error.response.data.data);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  });
</script>

<template>
  <div class="course-card" @click="goToCourse(props.course.id)">
    <img
      src="https://images.unsplash.com/photo-1693032521214-fb25014ac9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3432&q=80"
      :alt="course.title"
      class="course-image"
    />
    <div class="course-info">
      <h2 class="course-title">{{ course.title }}</h2>
      <div class="course-tags">
        <span v-for="tag in course.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="course-rating">
        <div class="rating-score">{{ parseInt(props.course.rating) }} / 5</div>
        <div class="rating-count">
          {{ courseRatings ? courseRatings.length : 0 }}
          {{
            courseRatings && courseRatings.length !== 1 ? "ratings" : "rating"
          }}
        </div>
      </div>
      <div class="subscription-container">
        <h3 class="subscription-tier">
          {{ course.subscriptions.at(0) }}
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .course-card {
    display: flex;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #6a3993;
    cursor: pointer;
  }
  .course-card:hover {
    box-shadow: 0 0 10px 7px rgba(180, 48, 175, 0.5);
  }
  .course-image {
    width: 150px;
    height: 200x;
    object-fit: cover;
  }
  .course-info {
    padding: 5px;
  }
  .course-title {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 1px;
    color: rgb(252, 236, 219);
  }
  .course-tags {
    margin-bottom: 8px;
  }
  .tag {
    display: inline-block;
    color: rgb(252, 236, 219);
    margin-right: 4px;
    margin-top: 3px;
    padding: 4px 8px;
    background-color: #b430af;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
  }
  .course-rating {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  .rating-score {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 4px;
    color: rgb(252, 236, 219);
  }
  .rating-count {
    font-size: 0.8rem;
    font-weight: bold;
    background-color: rgb(252, 236, 219);
    border-radius: 8px;
    padding: 0 2px 0 2px;
    color: #b430af;
    margin-left: 4px;
  }
  .subscription-container {
    display: flex;
    align-items: center;
  }
  .subscription-tier {
    font-size: 1rem;
    padding: 2px 5px 2px 5px;
    font-weight: bolder;
    background-color: #341052;
    border-radius: 8px;
    color: #b430af;
  }
</style>
