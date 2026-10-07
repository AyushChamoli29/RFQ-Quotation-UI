<script setup>
import { computed, watch } from "vue";
import VendorPortalBox from "@/components/VendorPortalBox.vue";
import { useRFQMainStore } from "@/store/RFQStoreMain";
import { useAllocationStore } from "@/store/AllocationStore";
import { useHistoryStore } from "@/store/auditHistory";
const rfq = useRFQMainStore();
const allocationStore = useAllocationStore();
const historyStore = useHistoryStore();
// returns vendor name of the input vendor id
function getvendorName(vid) {
  if (vid === "select a vendor") return "";

  const vendor = rfq.vendors.find((v) => v.id === vid);
  return vendor.name;
}
// returns category name of the input vendor id
function getCategoryName(vid) {
  if (vid === "select a vendor") return "";

  const vendor = rfq.vendors.find((v) => v.id === vid);
  return vendor.type;
}
// it also return boolean value that if a vendor is allocated or not
const isVendorAllocated = computed(() => {
  return allocationStore.vendorsSelected.has(rfq.vendorSelectedInPortal);
});
// this return boolean value if vendor is selected, rfq status is draft and the vendor is allocated
const canShowVendorPortal = computed(() => {
  return (
    rfq.vendorSelectedInPortal !== "select a vendor" &&
    rfq.rfqStatus !== "draft" &&
    isVendorAllocated.value
  );
});
// this is basically used for adding entry in audit history if the selected vendor is changed and the rfq status should not be draft
watch(
  [() => rfq.vendorSelectedInPortal, () => rfq.rfqStatus],
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
          v-model="rfq.vendorSelectedInPortal"
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
        v-if="rfq.vendorSelectedInPortal === 'select a vendor'"
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
          {{ rfq.vendorName(rfq.vendorSelectedInPortal) }} has not been
          allocated to this RFQ, or the RFQ has not been dispatched yet.
        </p>
      </div>
      <div v-else>
        <VendorPortalBox :vendorid="rfq.vendorSelectedInPortal" />
      </div>
    </div>
  </div>
</template>
