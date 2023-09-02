<script setup>
  import axios from "axios";
  import { useRouter } from "vue-router";
  import { ref, onMounted } from "vue";
  import { loggedInStore } from "../stores/loggedInStatus";
  const { setLoggedInTrue, isLoggedIn } = loggedInStore();

  const showAuth = ref(false);
  const isLogin = ref(true);

  const router = useRouter();

  const toggleIsLogin = () => {
    isLogin.value = !isLogin.value;
  };

  const userName = ref("");
  const userPass = ref("");
  const email = ref("");
  const firstName = ref("");
  const lastName = ref("");

  const loginUser = async () => {
    await axios({
      method: "post",
      url: `http://localhost:8080/api/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userName: userName.value,
        password: userPass.value,
      },
    })
      .then(function (response) {
        localStorage.setItem("bitSentinelToken", response.data.data);
        setLoggedInTrue();
        router.push("/");
      })
      .catch(function (error) {
        alert(error.response.data.data);
      });
  };

  const signupUser = async () => {
    console.log("PASS", userPass.value);
    await axios({
      method: "post",
      url: `http://localhost:8080/api/auth/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userName: userName.value,
        password: userPass.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
      },
    })
      .then(function (response) {
        localStorage.setItem("bitSentinelToken", response.data.data);
        setLoggedInTrue();
        console.log(isLoggedIn());
        router.push("/");
      })
      .catch(function (error) {
        alert(error.response.data.data);
      });
  };

  onMounted(() => {
    showAuth.value = true;
  });
</script>
<template>
  <main>
    <div class="auth-screen">
      <Transition name="fade">
        <div v-if="showAuth" class="auth-container">
          <div v-if="isLogin" class="auth-option">
            <h1 class="auth-primary-login">.login</h1>
            <h2 @click="toggleIsLogin" class="auth-secondary-signup">
              .signup
            </h2>
          </div>
          <div v-else class="auth-option">
            <h1 class="auth-primary-signup">.signup</h1>
            <h2 @click="toggleIsLogin" class="auth-secondary-login">.login</h2>
          </div>
          <div
            class="auth"
            v-bind:style="isLogin ? { bottom: '270px' } : { bottom: '50px' }"
          ></div>
          <div v-if="isLogin" class="auth-form">
            <form @submit.prevent="loginUser">
              <label for="userName">user:</label>
              <input v-model="userName" type="text" name="userName" required />
              <label for="password">password:</label>
              <input
                v-model="userPass"
                type="password"
                name="password"
                required
              />
              <input type="submit" value="submit" />
            </form>
          </div>
          <div v-else class="auth-form">
            <form @submit.prevent="signupUser">
              <label for="fname">first_name:</label>
              <input v-model="firstName" type="text" name="uname" required />
              <label for="lname">last_name:</label>
              <input v-model="lastName" type="text" name="lname" required />
              <label for="mail">mail:</label>
              <input v-model="email" type="text" name="mail" required />
              <label for="uname">user:</label>
              <input v-model="userName" type="text" name="uname" required />
              <label for="pass">password:</label>
              <input v-model="userPass" type="password" name="pass" required />
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
      </Transition>
    </div>
  </main>
</template>

<style scoped>
  label {
    font-weight: bold;
    font-size: 15px;
    color: #ff0475;
    text-shadow: -2px 2px 2px #fcecdb, 2px 2px 2px #fcecdb, 2px -2px 2px #fcecdb,
      -2px -2px 2px #fcecdb;
  }
  input[type="text"] {
    width: 100%;
    padding: 12px 12px;
    margin: 2px 0;
    display: inline-block;
    border: 3px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type="password"] {
    width: 100%;
    padding: 12px 12px;
    margin: 2px 0;
    display: inline-block;
    border: 3px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type="text"]:focus {
    border: 4px solid #6a3993;
  }

  input[type="password"]:focus {
    border: 4px solid #6a3993;
  }

  input[type="submit"] {
    width: 100%;
    background-color: #6a3993;
    font-weight: bold;
    font-size: 21px;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    margin-top: 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #7c4ba4;
  }

  .auth-form {
    z-index: 1;
    position: relative;
    margin-left: 85px;
    margin-top: 6px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  .auth-primary-login {
    color: #fcecdb;
    font-size: 50px;
    background-color: #b430af;
    border-radius: 25px;
    padding: 0px 10px 0px 10px;
    margin-top: 25px;
    margin-left: 95px;
    margin-right: 72px;
    z-index: 2;
    position: relative;
  }

  .auth-secondary-login {
    padding: 0 10px 0 10px;
    margin-top: -10px;
    border-radius: 25px;
    color: #ff0475;
    background-color: #fcecdb;
    margin-left: 220px;
    z-index: 3;
    position: relative;
    cursor: pointer;
  }
  .auth-primary-signup {
    color: #fcecdb;
    font-size: 50px;
    background-color: #b430af;
    border-radius: 25px;
    padding: 0px 10px 0px 10px;
    margin-top: 25px;
    margin-left: 85px;
    z-index: 2;
    position: relative; /* Add this line */
  }

  .auth-secondary-signup {
    padding: 0 10px 0 10px;
    margin-top: -13px;
    border-radius: 25px;
    color: #ff0475;
    background-color: #fcecdb;
    margin-left: 185px;
    margin-right: 25px;
    z-index: 3;
    position: relative;
    cursor: pointer;
  }
  .auth-screen {
    width: 100vw;
    height: 100vh;
    background-image: url("../components/jpg/auth.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
  }
  .auth-container {
    margin-top: 100px;
    margin-right: 550px;
    position: relative;
  }
  .auth {
    top: 0;
    bottom: 100px;
    width: 360px;
    margin-left: 15px;
    position: absolute;
    border-radius: 25px;
    background-color: rgba(255, 255, 255, 0.65);
    z-index: 1;
  }

  .fade-enter-active {
    transition: opacity 1s ease-in;
  }

  .fade-enter-from {
    opacity: 0;
  }
</style>
