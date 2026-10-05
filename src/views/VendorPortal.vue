<script setup>
import data from "@/data/mockData.json";
import { ref, onMounted, computed, watch } from "vue";
import VendorPortalBox from "@/components/VendorPortalBox.vue";
import { useRFQMainStore } from "@/store/RFQStoreMain";
import { useAllocationStore } from "@/store/AllocationStore";
import { useHistoryStore } from "@/store/auditHistory";
const rfq = useRFQMainStore();
const allocationStore = useAllocationStore();
const historyStore = useHistoryStore();
function getvendorName(vid) {
  if (vid === "select a vendor") return "";

  const vendor = rfq.vendors.find((v) => v.id === vid);
  return vendor.name;
}
function getCategoryName(vid) {
  if (vid === "select a vendor") return "";

  const vendor = rfq.vendors.find((v) => v.id === vid);
  return vendor.type;
}
// watch(
//   [() => rfq.vendorSelected, () => rfq.rfqStatus],
//   ([newVendor, newStatus]) => {
//     console.log(newVendor);
//     console.log(newStatus);
//   },
//   { immediate: true },
// );
const isVendorAllocated = computed(() => {
  return allocationStore.vendorsSelected.has(rfq.vendorSelected);
});
const canShowVendorPortal = computed(() => {
  return (
    rfq.vendorSelected !== "select a vendor" &&
    rfq.rfqStatus !== "draft" &&
    isVendorAllocated.value
  );
});
watch(
  [() => rfq.vendorSelected, () => rfq.rfqStatus],
  ([newVendor, newStatus]) => {
    if (newVendor !== "select a vendor" && newStatus !== "draft") {
      historyStore.historyEntry({
        actor: rfq.selectedActor.name,
        roleOrCompany: rfq.selectedActor.role,
        action: "Vendor portal accessed",
        category: getCategoryName(newVendor),
        vendor: getvendorName(newVendor),
        detail: "Secure link opened",
      });
    }
  },
);
</script>

<template>
  <div
    class="flex flex-col"
    :class="rfq.rfqStatus !== 'draft' ? 'gap-0' : 'gap-5'"
  >
    <div
      class="flex bg-white p-5 mt-5 ml-2 rounded-xl gap-5 justify-start items-center outline outline-slate-200"
    >
      <div>
        <p class="text-xs font-[650]">Simulate secure vendor acess link for</p>
        <select
          class="text-[13px] outline outline-slate-200 p-2 rounded-lg mt-1"
          v-model="rfq.vendorSelected"
        >
          <option value="select a vendor">
            &mdash; Select a vendor &mdash;
          </option>
          <option v-for="item in rfq.vendors" :value="item.id">
            {{ item.name }} ({{ item.type }})
          </option>
        </select>
      </div>
      <div class="text-[11px] text-slate-500 w-122">
        In production each vendor receives a unique, expiring link — here you
        can switch identities to see exactly what each vendor sees.
      </div>
    </div>
    <div>
      <div
        v-if="rfq.vendorSelected === 'select a vendor'"
        class="h-40 w-full ml-2 p-5 flex flex-col gap-2 justify-center items-center bg-white outline outline-slate-200 rounded-lg"
      >
        <span class="text-4xl">🔗</span>
        <p class="font-semibold text-xl">
          Select a vendor to preview their portal
        </p>
      </div>
      <div
        v-else-if="!canShowVendorPortal"
        class="h-50 w-full ml-2 p-5 flex flex-col gap-2 justify-center items-center bg-white outline outline-slate-200 rounded-lg"
      >
        <span class="text-4xl">📭</span>
        <p class="font-bold text-xl">No active RFQ invitations</p>
        <p class="font-normal text-slate-500 text-base">
          {{ getvendorName(rfq.vendorSelected) }} has not been allocated to this
          RFQ, or the RFQ has not been dispatched yet.
        </p>
      </div>
      <div v-else>
        <VendorPortalBox :vendorid="rfq.vendorSelected" />
      </div>
    </div>
  </div>
</template>
