<script setup>
import { computed } from "vue";
import { useFlagsStore } from "@/store/flag";
import { useVendorStore } from "@/store/requirementsVendor";
import { useAwardedStore } from "@/store/awardedLines";
const flag = useFlagsStore();
const awardedStore = useAwardedStore();
const vendorsStore = useVendorStore();
console.log(vendorsStore.vendorsSelected);
const responded = computed(() => {
  let ans = 0;
  for (const element of vendorsStore.vendorsSelected) {
    if (element.status !== "declined") {
      ans++;
    }
  }
  return ans;
});
const declined = computed(() => {
  let ans = 0;
  for (const element of vendorsStore.vendorsSelected) {
    if (element.status === "declined") {
      ans++;
    }
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
</script>

<template>
  <div class="flex flex-wrap gap-5">
    <div
      class="bg-white py-4 p-3 pl-5 h-25 w-75 rounded-lg flex flex-col justify-between outline outline-slate-200"
    >
      <p class="text-slate-500 text-xs font-semibold">REQUIREMENT LINES</p>
      <p class="font-semibold text-xl font-mono">24</p>
      <p class="text-slate-500 text-xs">across 6 categories</p>
    </div>
    <div
      class="bg-white py-4 p-3 pl-5 h-25 w-75 rounded-lg flex flex-col justify-between outline outline-slate-200"
    >
      <p class="text-slate-500 text-xs font-semibold">VENDORS INVITED</p>
      <p class="font-semibold text-xl font-mono">
        {{ vendorsStore.vendorsSelected.size }}
      </p>
      <p class="text-slate-500 text-xs">of 12 in vendor master</p>
    </div>
    <div
      class="bg-white py-4 p-3 pl-5 h-25 w-75 rounded-lg flex flex-col justify-between outline outline-slate-200"
    >
      <p class="text-slate-500 text-xs font-semibold">RESPONDED</p>
      <p class="font-semibold text-2xl font-mono">
        {{ flag.progress >= 3 ? responded : 0 }}
      </p>
      <p class="text-slate-500 text-xs">
        {{ flag.progress >= 3 ? declined : 0 }} declined
      </p>
    </div>
    <div
      class="bg-white py-4 p-3 pl-5 h-25 w-75 rounded-lg flex flex-col justify-between outline outline-slate-200"
    >
      <p class="text-slate-500 text-xs font-semibold">
        FINAL QUOTATION (LATEST)
      </p>
      <p class="font-semibold text-xl font-mono">
        {{ flag.progress >= 6 ? grandFinal : "&mdash;" }}
      </p>
      <p class="text-slate-500 text-xs">
        {{
          flag.progress >= 6
            ? "Costing v" + awardedStore.costVersions
            : "not yet applied"
        }}
      </p>
    </div>
  </div>
</template>
