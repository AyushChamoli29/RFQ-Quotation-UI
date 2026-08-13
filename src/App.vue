<script setup>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import { ref } from "vue";
const flag=ref('')
const showVendor=(tab)=>{
  flag.value=tab;
}
</script>

<template>
  <Header @show-vendor="showVendor" />
  <br /><br /><br />
  <div class="flex flex-col gap-6 mt-1 px-31">
    <div v-if="flag!=='vendor'"><Navigation /></div>
    <RouterView />
    <br>
    <Footer />
    <br><br>
  </div>
</template>

<style scoped></style>
