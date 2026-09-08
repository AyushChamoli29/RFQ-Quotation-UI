<script setup>
import Navigation from "@/components/Navigation.vue";
import { defineProps } from "vue";
import { RouterView } from "vue-router";
const prop = defineProps({
  actor: String,
});
</script>

<template>
  <Navigation />
  <RouterView :actor="prop.actor" />
</template>
