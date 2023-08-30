<script setup>
  import { defineProps } from "vue";

  const props = defineProps({
    course: {
      type: Object,
      required: true,
    },
  });
</script>

<template>
  <div class="course-card">
    <img :src="course.image" :alt="course.title" class="course-image" />
    <div class="course-info">
      <h2 class="course-title">{{ course.title }}</h2>
      <div class="course-tags">
        <span v-for="tag in course.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="course-rating">
        <div class="rating-score">{{ course.rating.score }} / 5</div>
        <div class="rating-count">{{ course.rating.count }} ratings</div>
      </div>
      <div class="subscription-container">
        <h3 class="subscription-tier">{{ course.subscriptionTier }}</h3>
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

<!-- <script setup>
  import { defineProps } from "vue";

  const { title, rating, subscription, tags } = defineProps([
    "title",
    "rating",
    "subscription",
    "tags",
    "img",
  ]);
</script>

<template>
  <main> -->
<!-- <div class="user-card">
      <div class="card-image">
        <img
          src="https://images.unsplash.com/photo-1693032521214-fb25014ac9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3432&q=80"
        />
      </div>
      <div class="card-content">
        <h2 class="title">Course</h2>
        <p class="tags">Lorem ipsum dolor sit amet.</p>
        <h2 class="rating">4.23/5</h2>
        <h4 class="users-rated">78</h4>
        <h3 class="subscription">Free</h3>
        <button>View</button>
      </div>
    </div> -->
<!-- <n-card title="">
      <template #cover>
        <img
          src="https://images.unsplash.com/photo-1693032521214-fb25014ac9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3432&q=80"
        />
      </template>
      <h3>Title</h3>
      <button class="view-button">View</button>
    </n-card>
  </main>
</template> -->

<!-- rgba(180, 48, 175, 0.5); -->

<!-- <style scoped>
  .n-card {
    height: 300px;
    width: 200px;
    display: flex;
    flex-direction: column;
  }

  .n-card:hover {
    box-shadow: 0 0 10px 7px rgba(180, 48, 175, 0.5);
  }

  img {
    height: 150px;
  }
</style> -->
