<script setup>
import data from "@/data/mockData.json";
import { useRouter } from "vue-router";
import RequirementTableEntry from "./RequirementTableEntry.vue";
import { useRFQMainStore } from "@/store/RFQStoreMain.js";
// import { useHistoryStore } from "@/store/auditHistory.js";
import { useFlagsStore } from "@/store/flag";
// import { useVendorStore } from "@/store/requirementsVendor.js";
import { useAllocationStore } from "@/store/AllocationStore.js";
const rfq = useRFQMainStore();
// const historyStore = useHistoryStore();
const flags = useFlagsStore();
const allocationStore = useAllocationStore();
// const vendorsStore = useVendorStore();
const router = useRouter();
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
// const findVendorName = (id) => {
//   for (const element of data.vendor_portal) {
//     if (element.id === id) {
//       return element.name;
//     }
//   }
// };
const allocateVendors = () => {
  // flags.allocateFlag = true;
  rfq.rfqStatus = "allocated";
  router.push({ name: "vendorResponses" });
  // for (let i = 0; i < vendorsStore.currentVendors.length; i++) {
  //   for (let j = 0; j < vendorsStore.currentVendors[i].VendorList.length; j++) {
  //     const vendorName = findVendorName(
  //       vendorsStore.currentVendors[i].VendorList[j].id,
  //     );
  //     const existing = historyStore.history.find((item) => {
  //       return (
  //         item.vendor === vendorName &&
  //         item.action === "RFQ invitation dispatched"
  //       );
  //     });
  //     if (existing) {
  //       existing.category = `${existing.category}, ${vendorsStore.currentVendors[i].type}`;
  //     } else {
  //       historyStore.historyEntry({
  //         actor: flags.selectedActor.name,
  //         roleOrCompany: flags.selectedActor.role,
  //         action: "RFQ invitation dispatched",
  //         category: vendorsStore.currentVendors[i].type,
  //         vendor: vendorName,
  //         detail: `RFQ-2026-0142 sent to ${findVendorName(vendorsStore.currentVendors[i].VendorList[j].id)}, deadline 20 Jun 2026, 06:00 pm`,
  //       });
  //     }
  //   }
  // }
  // historyStore.historyEntry({
  //   actor: flags.selectedActor.name,
  //   roleOrCompany: flags.selectedActor.role,
  //   action: "RFQ dispatched",
  //   detail: `RFQ-2026-0142 sent to ${vendorsStore.totalVendors} vendor(s) across 6 categories`,
  // });
};
const requirement = rfq.requirements.reduce((acc, cur) => {
  if (!acc[cur.categoryId]) {
    acc[cur.categoryId] = [];
    acc[cur.categoryId].push(cur);
  } else if (acc[cur.categoryId]) {
    acc[cur.categoryId].push(cur);
  }
  return acc;
}, {});
</script>

<template>
  <div class="bg-white py-5 rounded-xl">
    <div class="flex items-center justify-between px-4 mb-3">
      <div class="text-[13px] text-[#6b7090] tracking-wide font-bold px-3">
        REQUIREMENT LINE ITEMS & VENDOR ALLOCATION
      </div>
      <button
        v-if="rfq.rfqStatus === 'draft'"
        class="bg-[#4d3fc9] text-white font-bold text-[13px] p-2 rounded-lg"
        :class="
          allocationStore.totalVendors === 0
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer'
        "
        :disabled="allocationStore.totalVendors === 0"
        @click="allocateVendors"
      >
        Send RFQ to allocated vendors({{ allocationStore.totalVendors }})
      </button>
      <div
        v-if="rfq.rfqStatus !== 'draft'"
        class="text-[11px] bg-[#e1f6f1] text-[#0d8f7a] p-1 rounded-xl font-bold"
      >
        RFQ sent {{ currentDate }}, {{ currentTime }}
      </div>
    </div>
    <div
      v-for="[key, value] in Object.entries(requirement)"
      class="border-t border-slate-200 p-1"
    >
      <RequirementTableEntry :id="key" :value="value" />
    </div>
  </div>
</template>
