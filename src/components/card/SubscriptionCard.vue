<script setup>
  import { defineProps } from "vue";

  const props = defineProps({
    subscription: {
      type: Object,
      required: true,
    },
  });
</script>

<template>
  <div class="subscription-card">
    <img
      src="../jpg/bronze_coin.png"
      alt="subscription image"
      class="subscription-image"
    />
    <div class="subscription-info">
      <div class="subscription-type">
        <h2>{{ subscription.type }}</h2>
      </div>

      <div class="subscription-price">
        <h1 class="price">{{ subscription.price }}</h1>
        <h1 class="currency">RON</h1>
      </div>

      <div class="subscription-duration">
        <h3 class="duration">{{ subscription.duration }} days</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .subscription-card {
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

  .subscription-card:hover {
    box-shadow: 0 0 10px 7px rgb(204, 204, 204, 0.5);
  }

  .subscription-image {
    width: 200px;
    height: 200px;
    border-radius: 30%;
    margin-left: 25px;
    object-fit: cover;
    align-self: center;
  }

  .subscription-info {
    padding: 5px;
    margin-left: -50px;
  }

  .subscription-type {
    font-size: 1.2rem;
    margin-bottom: 1px;
    color: rgb(252, 236, 219);
    display: flex;
  }

  .subscription-price {
    display: flex;
    align-items: baseline;
    margin-bottom: 8px;
    margin-left: -22px;
    background-color: rgba(252, 236, 219, 0.92);
    padding: 0px 5px 0px 5px;
    border-radius: 12%;
  }

  .subscription-duration {
    margin-left: 20px;
  }

  .price {
    font-size: 3rem;
    color: #b430af;
  }

  .duration {
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
</style>
