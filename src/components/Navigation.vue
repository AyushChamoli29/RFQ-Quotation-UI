<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const flag = ref("overview");
const goToOverview = () => {
  flag.value = "overview";
  router.push({
    name: "overview",
  });
};
</script>

<template>
  <div
    class="flex flex-wrap gap-9 bg-white text-slate-500 text-sm font-semibold justify-start items-center mt-5 px-6 py-4 rounded-xl shadow-sm shadow-slate-300"
  >
    <div
      class="cursor-pointer"
      @click="goToOverview"
      :class="{ 'text-[#373593]': flag === 'overview' }"
    >
      Overview
    </div>
    <div class="cursor-pointer">Requirements & Allocation</div>
    <div class="cursor-pointer">Vendor Responses</div>
    <div class="cursor-pointer">Costing</div>
    <div class="cursor-pointer">Corporate Quotation</div>
    <div class="cursor-pointer">Audit History</div>
  </div>
</template>
