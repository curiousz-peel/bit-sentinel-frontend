<script setup>
  import axios from "axios";
  import { defineEmits, defineProps } from "vue";

  const { plan } = defineProps(["plan"]);
  const emit = defineEmits(["removePlan"]);

  const deletePlan = async (id) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/plan/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        emit("removePlan", id);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });
  };

  const updatePlan = async (plan) => {
    console.log("VALORI", plan.isModerator, plan.isAuthor);
    await axios({
      method: "put",
      url: `http://localhost:8080/api/plan/${plan.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
      data: {
        userID: plan.userID,
        subscriptionID: plan.subscriptionID,
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
    <h2>{{ plan.id }}</h2>
    <form>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" :id="id" v-model="plan.id" readonly />
      </div>
      <div class="form-group">
        <label for="userID">User Id:</label>
        <input type="text" :id="id" v-model="plan.userID" />
      </div>
      <div class="form-group">
        <label for="subscriptionID">SubscriptionID:</label>
        <input type="text" :id="id" v-model="plan.SubscriptionID" />
      </div>
    </form>
    <div class="button-container">
      <button @click="updatePlan(plan)">Update</button>
      <button @click="deletePlan(plan.id)">Delete</button>
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
