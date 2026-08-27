<script setup>
import data from "@/data/mockData.json";
import RequirementTableEntry from "./RequirementTableEntry.vue";
const array = data.requirementTable;
</script>

<template>
  <div class="bg-white py-5 rounded-xl">
    <div class="flex items-center justify-between px-4 mb-3">
      <div class="text-[13px] text-[#6b7090] tracking-wide font-bold px-3">
        REQUIREMENT LINE ITEMS & VENDOR ALLOCATION
      </div>
      <div class="bg-[#4d3fc9] text-white font-bold text-[13px] p-2 rounded-lg">
        Send RFQ to allocated vendors(12)
      </div>
    </div>
    <div
      v-for="[key, value] in Object.entries(array)"
      class="border-t border-slate-200 p-1"
    >
      <RequirementTableEntry :name="key" :value="value" />
    </div>
  </div>
</template>
