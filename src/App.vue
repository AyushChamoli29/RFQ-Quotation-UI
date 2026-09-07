<script setup>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
import { ref } from "vue";
const selectedActorName = ref("Priya Sharma");
const selectedActor = (actor) => {
  selectedActorName.value = actor;
};
</script>

<template>
  <Header @selected-actor="selectedActor" />
  <br /><br /><br />
  <div class="flex flex-col gap-6 mt-1 mb-5 px-31">
    <RouterView :actor="selectedActorName" />
    <br />
    <Footer />
  </div>
</template>

<style scoped></style>
