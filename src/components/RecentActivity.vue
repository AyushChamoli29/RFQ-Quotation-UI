<script setup>
import { defineProps } from "vue";
import data from "@/data/mockData.json";
const prop = defineProps({
  show: Boolean,
});
const simulatedVendors = data.recentActivity;
const currentDate = new Date().toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const currentTime = new Date().toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
});
</script>

<template>
  <div class="bg-white p-5 rounded-xl shadow-sm shadow-slate-300">
    <div class="flex flex-wrap justify-between">
      <div class="flex flex-col gap-2">
        <p class="font-bold text-[13px] tracking-wider text-slate-500">
          RECENT ACTIVITY
        </p>
        <p v-if="!prop.show" class="text-slate-500 text-xs tracking-tight">
          No activity recorded yet &mdash; allocate a vendor send the RFQ to see
          it appear here
        </p>
      </div>
      <RouterLink to="/auditHistory">
        <div
          class="bg-white text-[#3936be] p-2 text-[13px] font-bold cursor-pointer tracking-tight"
        >
          View full audit history <span>→</span>
        </div>
      </RouterLink>
    </div>
    <div v-if="prop.show">
      <div
        v-for="[key, value] in Object.entries(simulatedVendors)"
        class="border-t border-slate-200 py-2 text-xs"
      >
        <p class="font-[650]">{{ key }}</p>
        <p class="text-[#6b7090] text-[11.5px]">
          <span>{{ currentDate }}, {{ currentTime }}</span> &middot;
          <span>{{ value }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
