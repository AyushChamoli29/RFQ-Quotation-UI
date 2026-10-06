<script setup>
import { computed } from "vue";
import { useRFQMainStore } from "@/store/RFQStoreMain";
import { useAllocationStore } from "@/store/AllocationStore";
import { useAwardedStore } from "@/store/awardedLines";
const rfq = useRFQMainStore();
const allocationStore = useAllocationStore();
const awardedStore = useAwardedStore();
// this is the calculation for responded which is the number of vendors who gave quotation
const responded = computed(() => {
  let ans = 0;
  for (const category of rfq.allocation) {
    for (const vendor of category.vendorList) {
      if (
        vendor.status === "submitted" ||
        vendor.status === "partially submitted"
      ) {
        ans++;
      }
    }
  }
  return ans;
});
// this is the calculation for declined which is the number of vendors who declined quotation
const declined = computed(() => {
  let ans = 0;
  for (const category of rfq.allocation) {
    for (const vendor of category.vendorList) {
      if (vendor.status === "declined") {
        ans++;
      }
    }
  }
  return ans;
});
// this is the total cost of all awarded vendors for chosen requirement lines
const grandFinal = computed(() => {
  let ans = 0;
  for (const element of Object.values(rfq.costingSnapshot)) {
    ans += element.total;
  }
  return ans;
});
</script>

<template>
  <div class="flex flex-wrap gap-5">
    <div
      class="bg-white py-4 p-3 pl-5 h-25 w-75 rounded-lg flex flex-col justify-between outline outline-slate-200"
    >
      <p class="text-slate-500 text-xs font-semibold">REQUIREMENT LINES</p>
      <p class="font-semibold text-xl font-mono">
        {{ rfq.requirements.length }}
      </p>
      <p class="text-slate-500 text-xs">
        across {{ rfq.categories.length }} categories
      </p>
    </div>
    <div
      class="bg-white py-4 p-3 pl-5 h-25 w-75 rounded-lg flex flex-col justify-between outline outline-slate-200"
    >
      <p class="text-slate-500 text-xs font-semibold">VENDORS INVITED</p>
      <p class="font-semibold text-xl font-mono">
        {{ allocationStore.vendorsSelected.size }}
      </p>
      <p class="text-slate-500 text-xs">
        of {{ rfq.vendors.length }} in vendor master
      </p>
    </div>
    <div
      class="bg-white py-4 p-3 pl-5 h-25 w-75 rounded-lg flex flex-col justify-between outline outline-slate-200"
    >
      <p class="text-slate-500 text-xs font-semibold">RESPONDED</p>
      <p class="font-semibold text-2xl font-mono">
        {{ responded }}
      </p>
      <p class="text-slate-500 text-xs">{{ declined }} declined</p>
    </div>
    <div
      class="bg-white py-4 p-3 pl-5 h-25 w-75 rounded-lg flex flex-col justify-between outline outline-slate-200"
    >
      <p class="text-slate-500 text-xs font-semibold">
        FINAL QUOTATION (LATEST)
      </p>
      <p class="font-semibold text-xl font-mono">
        {{
          grandFinal >= 1
            ? Number(grandFinal).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              })
            : "&mdash;"
        }}
      </p>
      <p class="text-slate-500 text-xs">
        {{
          grandFinal >= 1
            ? "Costing v" + awardedStore.costVersions
            : "not yet applied"
        }}
      </p>
    </div>
  </div>
</template>
