<script setup>
import data from "@/data/mockData.json";
import { RouterLink } from "vue-router";
import VendorResponsesBox from "@/components/VendorResponsesBox.vue";
import { useFlagsStore } from "@/store/flag";
const flags = useFlagsStore();
</script>

<template>
  <div
    v-if="!(flags.simulateFlag || flags.allocateFlag)"
    class="text-sm h-47 w-full p-5 flex flex-col gap-3 justify-center items-center bg-white outline outline-slate-200 rounded-lg"
  >
    <span class="text-4xl">📭</span>
    <p class="font-bold text-lg">RFQ not yet sent</p>
    <p class="font-normal text-slate-500 text-base/1">
      Allocate vendors and send the RFQ from the
      <span class="text-indigo-800 text-[13px] font-semibold"
        ><RouterLink to="/requirements"
          >Requirements & Allocation</RouterLink
        ></span
      >
      tab to start collecting responses.
    </p>
  </div>
  <div
    v-if="flags.simulateFlag || flags.allocateFlag"
    v-for="item in data.vendorPricing"
    class="bg-white rounded-xl h-max"
  >
    <VendorResponsesBox :data="item" />
  </div>
</template>
