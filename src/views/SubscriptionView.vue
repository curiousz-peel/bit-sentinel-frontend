<script setup>
  import axios from "axios";
  import { ref, onBeforeMount } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import Hero from "../components/hero/Hero.vue";
  import SubscriptionCard from "../components/card/SubscriptionCard.vue";

  const router = useRouter();
  const route = useRoute();

  const loggedIn = ref(localStorage.getItem("bitSentinelToken"));
  const userName = localStorage.getItem("userName");
  const currentSubscription = ref(null);
  const subscriptions = ref(null);
  const user = ref(null);

  const isLowerTier = (price) => {
    return currentSubscription.value.price >= price;
  };

  onBeforeMount(async () => {
    await axios({
      method: "get",
      url: `http://localhost:8080/api/user/name/${userName}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        user.value = response.data.data;
      })
      .catch(function (error) {
        alert(error.response.data.data);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });

    await axios({
      method: "get",
      url: `http://localhost:8080/api/plan/user/${user.value.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        currentSubscription.value = response.data.data;
      })
      .catch(function (error) {
        alert(error.response.data.data);
        if (error.response.data.data === "Token is expired") {
          router.push("/auth");
        }
      });

    await axios({
      method: "get",
      url: `http://localhost:8080/api/subscription`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bitSentinelToken")}`,
      },
    })
      .then(function (response) {
        subscriptions.value = response.data.data;
        console.log(subscriptions.value);
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
  <main v-if="loggedIn">
    <div>
      <Hero></Hero>
      <div class="subscription-page">
        <div class="subscription-padding">
          <h1 class="subscription-section">.subscriptions</h1>
          <div class="subscription-container">
            <SubscriptionCard
              v-for="subscription in subscriptions"
              :key="subscription.ID"
              :subscription="subscription"
              :isLowerTier="isLowerTier(subscription.price)"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
  <main v-else>
    {{ router.push("/auth") }}
  </main>
</template>

<style scoped>
  .subscription-page {
    background-color: #341052;
    width: 100vw;
    border: 5px solid;
    border-top: none;
    border-color: #1a0b28;
    min-height: 100vh;
    margin-left: 15px;
    padding-bottom: 40px;
  }
  .subscription-padding {
    padding-top: 10px;
    padding-left: 25px;
  }
  .subscription-section {
    padding-bottom: 10px;
    padding-left: 20px;
    font-size: 45px;
    color: rgb(252, 236, 219);
    text-shadow: -2px 2px 2px #834db0, 2px 2px 2px #834db0, 2px -2px 2px #834db0,
      -2px -2px 2px #834db0;
  }
  .subscription-container {
    display: grid;
    grid-template-columns: 375px 375px 375px;
    grid-template-rows: minmax(150px, 1fr);
    column-gap: 15px;
    row-gap: 20px;
    padding-bottom: 0;
  }
  @media screen and (min-width: 800px) {
    .subscription-container {
      grid-template-columns: 375px 375px 375px;
    }
  }
</style>
