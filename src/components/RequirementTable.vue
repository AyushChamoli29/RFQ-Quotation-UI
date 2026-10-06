<script setup>
import { useRouter } from "vue-router";
import RequirementTableEntry from "./RequirementTableEntry.vue";
import { useRFQMainStore } from "@/store/RFQStoreMain.js";
import { useHistoryStore } from "@/store/auditHistory.js";
import { useAllocationStore } from "@/store/AllocationStore.js";
const rfq = useRFQMainStore();
const historyStore = useHistoryStore();
const allocationStore = useAllocationStore();
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
const categoryName = (id) => {
  for (const element of rfq.vendors) {
    if (element.id === id) {
      return element.type;
    }
  }
};
const allocateVendors = () => {
  const deadlineDate = new Date(rfq.rfqDeadline).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const deadlineTime = new Date(rfq.rfqDeadline).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  rfq.rfqStatus = "allocated";
  rfq.progress = 2;
  // go to vendor responses
  router.push({ name: "vendorResponses" });
  // this vendors allocated is an array of all those vendor id who have been allocated this is required for audit history
  const vendorsAllocated = [];
  for (const element of rfq.allocation) {
    for (const item of element.vendorList) {
      vendorsAllocated.push(item.vendorid);
    }
  }
  for (const vid of vendorsAllocated) {
    historyStore.historyEntry({
      actor: rfq.selectedActor.name,
      roleOrCompany: rfq.selectedActor.role,
      action: "RFQ invitation dispatched",
      category: categoryName(vid),
      vendor: rfq.vendorName(vid),
      detail: `${rfq.rfqDetails.rfq_no} sent to ${rfq.vendorName(vid)}, deadline ${deadlineDate}, ${deadlineTime}`,
    });
  }
  historyStore.historyEntry({
    actor: rfq.selectedActor.name,
    roleOrCompany: rfq.selectedActor.role,
    action: "RFQ dispatched",
    detail: `${rfq.rfqDetails.rfq_no} sent to ${vendorsAllocated.length} vendor(s) across ${rfq.categories.length} categories`,
  });
};
// this requirement is
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
