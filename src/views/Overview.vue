<script setup>
import CategoryTable from "@/components/CategoryTable.vue";
import OverviewCard from "@/components/OverviewCard.vue";
import OverviewSummaryCard from "@/components/OverviewSummaryCard.vue";
import RecentActivity from "@/components/RecentActivity.vue";
import Simulate from "@/components/Simulate.vue";
import { defineEmits, defineProps } from "vue";
const emit = defineEmits(["simulate-vendor"]);
const simulateVendors = () => {
  emit("simulate-vendor");
};
const prop = defineProps({
  show: Boolean,
});
</script>

<template>
  <OverviewCard :show="prop.show" />
  <OverviewSummaryCard />
  <CategoryTable :show="prop.show" />
  <Simulate @simulate-vendors="simulateVendors" />
  <RecentActivity :show="prop.show" />
</template>
