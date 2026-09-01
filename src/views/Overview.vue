<script setup>
import CategoryTable from "@/components/CategoryTable.vue";
import OverviewCard from "@/components/OverviewCard.vue";
import OverviewSummaryCard from "@/components/OverviewSummaryCard.vue";
import RecentActivity from "@/components/RecentActivity.vue";
import Simulate from "@/components/Simulate.vue";
import { ref } from "vue";
const simulateVendorsFlag = ref(false);
const simulateVendors = () => {
  simulateVendorsFlag.value = true;
};
</script>

<template>
  <OverviewCard :show="simulateVendorsFlag" />
  <OverviewSummaryCard />
  <CategoryTable :show="simulateVendorsFlag" />
  <Simulate @simulate-vendors="simulateVendors" />
  <RecentActivity :show="simulateVendorsFlag" />
</template>
