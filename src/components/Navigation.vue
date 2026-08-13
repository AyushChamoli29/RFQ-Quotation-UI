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
    class="flex flex-wrap gap-1 bg-white text-slate-500 text-sm/6 font-semibold justify-start items-center mt-5 p-1 rounded-xl shadow-sm shadow-slate-300"
  >
    <div
      class="cursor-pointer"
      @click="goToOverview"
      :class="{ 'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]': flag === 'overview' }"
    >
      Overview
    </div>
    <div class="cursor-pointer p-2 px-4">Requirements & Allocation</div>
    <div class="cursor-pointer p-2 px-4">Vendor Responses</div>
    <div class="cursor-pointer p-2 px-4">Costing</div>
    <div class="cursor-pointer p-2 px-4">Corporate Quotation</div>
    <div class="cursor-pointer p-2 px-4">Audit History</div>
  </div>
</template>
