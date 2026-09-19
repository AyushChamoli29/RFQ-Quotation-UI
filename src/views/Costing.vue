<script setup>
import { computed } from "vue";
import CostingBox from "@/components/CostingBox.vue";
import { RouterLink } from "vue-router";
import { useHistoryStore } from "@/store/auditHistory";
import { useAwardedStore } from "@/store/awardedLines";
import { useFlagsStore } from "@/store/flag";
const Flag = useFlagsStore();
const awardedStore = useAwardedStore();
const historyStore = useHistoryStore();
const grandBase = computed(() => {
  let ans = 0;
  for (const element of Object.values(awardedStore.awardedLines)) {
    ans += element.base;
  }
  return ans;
});
const grandProfit = computed(() => {
  let ans = 0;
  for (const element of Object.values(awardedStore.awardedLines)) {
    ans += element.profit;
  }
  return ans;
});
const grandFinal = computed(() => {
  let ans = 0;
  for (const element of Object.values(awardedStore.awardedLines)) {
    ans += element.final;
  }
  return Number(ans).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
});
const showCosting = () => {
  if (awardedStore.awarded.length > 0) {
    Flag.costingFlag = true;
    Flag.progress = 6;
    awardedStore.costVersions++;
  } else {
    alert(
      "No awarded line items yet — select vendors in Vendor Responses first.",
    );
  }
  historyStore.historyEntry({
    actor: Flag.selectedActor.name,
    roleOrCompany: Flag.selectedActor.role,
    action: "Costing version applied",
    detail: `Costing v${awardedStore.costVersions} created from ${awardedStore.awarded.length} awarded line item(s) - final amount ${grandFinal.value}`,
  });
};
const currentDate = new Date().toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const currentTime = new Date().toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
console.log(historyStore.history);
</script>

<template>
  <div
    class="flex flex-wrap justify-between items-center p-5 px-7 bg-white rounded-xl outline outline-slate-200"
  >
    <div class="flex flex-col">
      <p class="text-[13px] text-[#6b7090] tracking-wider font-bold">
        COSTING VERSIONS
      </p>
      <div class="flex flex-wrap">
        <span
          v-if="awardedStore.costVersions === 0"
          class="p-1 px-2 w-max rounded-lg text-[11px] font-bold bg-[#eef0f8] text-[#6b7090]"
          >No versions yet</span
        >
        <span
          v-for="value in awardedStore.costVersions"
          class="p-1 px-2 w-max rounded-lg text-[11px] font-bold bg-[#eeecfb] text-[#3f3ba6] mr-2 mb-2"
          :class="
            value === awardedStore.costVersions
              ? 'bg-[#eeecfb] text-[#3f3ba6]'
              : 'bg-[#eef0f8] text-[#6b7090]'
          "
          >v{{ value }} &middot; {{ currentDate }}, {{ currentTime }}
        </span>
      </div>
      <p class="text-xs font-normal text-[#b46a06] mt-1 mb-1">
        ⚠ {{ 24 - awardedStore.awarded.length }} line item(s) still have no
        awarded vendor and will be excluded.
      </p>
    </div>
    <div class="flex gap-2">
      <div
        class="py-2 px-4 flex justify-center items-center text-[13px] font-[650] text-[#3a3f58] w-max outline outline-slate-200 rounded-lg cursor-pointer hover:bg-slate-200"
      >
        Download costing (CSV)
      </div>
      <div
        class="flex justify-center items-center py-2 px-5 text-xs bg-[#4d3fc9] text-white font-bold tracking-wide w-max rounded-lg cursor-pointer"
        @click="showCosting"
      >
        Apply awarded rates to costing
      </div>
    </div>
  </div>
  <div
    v-if="!Flag.costingFlag"
    class="flex flex-col h-47 gap-1 justify-center items-center bg-white rounded-xl outline outline-slate-200 p-5 px-7"
  >
    <span class="text-4xl">🧮</span>
    <p class="font-bold text-lg mt-2">No costing applied yet</p>
    <p class="text-slate-500">
      Award vendors in the
      <span class="text-indigo-800 font-bold text-xs"
        ><RouterLink to="vendorResponses">Vendor Responses</RouterLink></span
      >
      tab, then apply awarded rates to costing
    </p>
  </div>
  <div v-if="Flag.costingFlag">
    <div
      v-for="[key, value] in Object.entries(awardedStore.awardedLines)"
      class="mb-5"
      :key="key"
    >
      <CostingBox :category="key" :content="value" />
    </div>
    <div
      class="flex justify-end items-center gap-20 py-5 pr-5 mt-5 bg-white rounded-xl text-[13px] text-[#6b7090] font-mono"
    >
      <div>
        Grand base
        <span class="text-black font-bold">{{
          Number(grandBase).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
          })
        }}</span>
      </div>
      <div>
        Grand profit
        <span class="text-[#0d8f7a] font-bold">{{
          Number(grandProfit).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
          })
        }}</span>
      </div>
      <div>
        Final amount
        <span class="text-[#3f3ba6] font-bold text-base">{{ grandFinal }}</span>
      </div>
    </div>
  </div>
</template>
