<script setup>
import Navigation from "@/components/Navigation.vue";
import { ref } from "vue";
import { RouterView } from "vue-router";
const simulateVendorsFlag = ref(false);
const simulateVendor = () => {
  simulateVendorsFlag.value = true;
};
const allocateVendorFlag = ref(false);
const allocateVendor = () => {
  allocateVendorFlag.value = true;
};
</script>

<template>
  <Navigation :show="simulateVendorsFlag" />
  <RouterView
    @simulate-vendor="simulateVendor"
    :show="simulateVendorsFlag"
    @allocate-vendor="allocateVendor"
    :allocate="allocateVendorFlag"
  />
</template>
