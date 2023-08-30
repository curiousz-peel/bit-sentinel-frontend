<template>
  <div class="hero"></div>
</template>

<style scoped>
  .hero {
    height: 32vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-direction: column;
    background-image: url("../jpg/heroBackground1.jpg");
    border: 5px solid;
    border-left: 20px solid;
    border-color: #1a0b28;
    background-size: cover;
  }
  .hero img {
    position: absolute;
    height: 700px;
    opacity: 0.1;
  }
  .hero h1 {
    font-size: 100px;
    font-weight: bold;
  }
  .hero p {
    cursor: pointer;
  }
</style>
