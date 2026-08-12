<script setup>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header />
  <br /><br /><br />
  <div class="flex flex-col gap-5 mt-1 bg-white px-19">
    <Navigation />
    <RouterView />
  </div>
  <br /><br /><br />
  <Footer />
  <br /><br /><br />
</template>

<style scoped></style>
