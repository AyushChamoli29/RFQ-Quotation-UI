<script setup>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header />
  <br /><br /><br />
  <div class="flex flex-col gap-6 mt-1 mb-5 px-31">
    <RouterView />
    <br>
    <Footer />
  </div>
</template>

<style scoped></style>
