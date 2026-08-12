<script setup>
import CategoryTable from "@/components/CategoryTable.vue";
import OverviewCard from "@/components/OverviewCard.vue";
import OverviewSummaryCard from "@/components/OverviewSummaryCard.vue";
import RecentActivity from "@/components/RecentActivity.vue";
import Simulate from "@/components/Simulate.vue";
</script>

<template>
  <OverviewCard />
  <OverviewSummaryCard />
  <CategoryTable />
  <Simulate />
  <RecentActivity />
</template>