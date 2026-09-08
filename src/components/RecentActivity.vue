<script setup>
import { computed } from "vue";
import { useHistoryStore } from "@/store/auditHistory";
const historyStore = useHistoryStore();
const recentHistory = computed(() => {
  return historyStore.history.filter((item, index) => {
    if (index < 6) {
      return item;
    }
  });
});
</script>

<template>
  <div class="bg-white p-5 rounded-xl shadow-sm shadow-slate-300">
    <div class="flex flex-wrap justify-between">
      <div class="flex flex-col gap-2">
        <p class="font-bold text-[13px] tracking-wider text-slate-500">
          RECENT ACTIVITY
        </p>
        <p
          v-if="!recentHistory.length"
          class="text-slate-500 text-xs tracking-tight"
        >
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
    <div v-if="recentHistory.length">
      <div
        v-for="value in recentHistory"
        class="border-t border-slate-200 py-2 text-xs"
      >
        <p class="font-[650]">{{ value.action }}</p>
        <p class="text-[#6b7090] text-[11.5px]">
          <span>{{ value.time }}</span> &middot;
          <span>{{ value.actor }} ({{ value.roleOrCompany }})</span
          ><span v-if="value.category"> &middot; </span>
          <span>{{ value.category }}</span>
          <span v-if="value.vendor"> &middot; </span>
          <span>{{ value.vendor }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
