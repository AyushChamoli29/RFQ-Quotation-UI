<script setup>
import CategoryTable from "@/components/CategoryTable.vue";
import OverviewCard from "@/components/OverviewCard.vue";
import OverviewSummaryCard from "@/components/OverviewSummaryCard.vue";
import RecentActivity from "@/components/RecentActivity.vue";
import Simulate from "@/components/Simulate.vue";
import { defineEmits } from "vue";
const emit = defineEmits(["simulate-vendor"]);
const simulateVendors = () => {
  emit("simulate-vendor");
};
</script>

<template>
  <OverviewCard />
  <OverviewSummaryCard />
  <CategoryTable />
  <Simulate @simulate-vendors="simulateVendors" />
  <RecentActivity />
</template>
