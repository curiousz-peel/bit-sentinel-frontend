<script setup>
  import { defineProps } from "vue";
  import { useRouter } from "vue-router";

  const props = defineProps({
    author: {
      type: Object,
      required: true,
    },
  });

  const router = useRouter();
  const goToCourses = (id) => {
    router.push(`/course/author/${id}`);
  };
</script>
<template>
  <div class="author-card" @click="goToCourses(props.author.ID)">
    <img src="../jpg/author-icon.png" alt="author image" class="author-image" />
    <div class="author-info">
      <div class="author-name">
        <h2>{{ author.firstName }}</h2>
        <h2>{{ author.lastName }}</h2>
      </div>
      <div class="author-topics">
        <span v-for="topic in author.topics" :key="topic" class="topic">
          {{ topic }}
        </span>
      </div>
      <div class="author-description">
        <div class="description">{{ author.description }}</div>
      </div>
      <div class="author-profession">
        <h3 class="profession">{{ author.profession }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .author-card {
    display: flex;
    gap: 30px;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #6a3993;
    cursor: pointer;
  }
  .author-card:hover {
    box-shadow: 0 0 10px 7px rgb(204, 204, 204, 0.5);
  }
  .author-image {
    width: 100px;
    height: 100px;
    border-radius: 60%;
    margin-left: 25px;
    background-color: rgb(204, 204, 204);
    object-fit: cover;
    align-self: center;
    outline: 8px solid rgba(204, 204, 204, 0.6);
  }
  .author-info {
    padding: 5px;
  }
  .author-name {
    font-size: 0.7rem;
    margin-bottom: 1px;
    color: rgb(252, 236, 219);
    display: flex;
    gap: 10px;
  }
  .author-topics {
    margin-bottom: 8px;
  }
  .topic {
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
  .description {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    color: #ccc;
  }
  .profession {
    font-size: 15px;
    font-weight: bold;
    margin-right: 4px;
    display: inline-block;
    background-color: rgb(252, 236, 219);
    color: #b430af;
    justify-self: center;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 25px;
    margin-bottom: 10px;
  }
</style>
