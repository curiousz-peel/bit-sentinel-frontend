<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { subscription } = defineProps(["subscription"]);
  const emit = defineEmits(["removeSubscription"]);

  const deleteSubscription = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/subscription/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removeSubscription", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updateSubscription = async (subscription) => {
    console.log("VALORI", subscription.isModerator, subscription.isAuthor);
    await axios({
      method: "put",
      url: `http://localhost:8080/api/subscription/${subscription.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        type: subscription.type,
        duration: subscription.duration,
        price: subscription.price,
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
    <h2>{{ subscription.type }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="subscription.id" readonly />
      </div>
      <div class="form-group">
        <label for="type">Type:</label>
        <input type="text" :id="id" v-model="subscription.type" />
      </div>
      <div class="form-group">
        <label for="duration">Duration:</label>
        <input type="text" :id="id" v-model="subscription.duration" />
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="text" :id="id" v-model="subscription.price" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updateSubscription(subscription)">Update</button>
      <button @click="deleteSubscription(subscription.id)">Delete</button>
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
