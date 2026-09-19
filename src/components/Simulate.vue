<script setup>
import data from "@/data/mockData.json";
import { useHistoryStore } from "@/store/auditHistory";
import { useFlagsStore } from "@/store/flag";
import { useVendorStore } from "@/store/requirementsVendor";
const flags = useFlagsStore();
const historyStore = useHistoryStore();
const vendorsStore = useVendorStore();
const emit = defineEmits(["simulate-vendors"]);
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
const findVendorName = (id) => {
  for (const element of data.vendor_portal) {
    if (element.id === id) {
      return element.name;
    }
  }
};
const findActor = (id) => {
  for (const element of data.vendor_portal) {
    if (element.id === id) {
      return element.customer;
    }
  }
};
const simulateVendors = () => {
  flags.simulateFlag = true;
  flags.progress = 3;
  for (const element1 of vendorsStore.currentVendors) {
    for (const element2 of element1.VendorList) {
      if (element2.simulated === false) {
        element2.simulated = true;
      }
    }
  }
  for (let i = 0; i < vendorsStore.currentVendors.length; i++) {
    for (let j = 0; j < vendorsStore.currentVendors[i].VendorList.length; j++) {
      const vendorName = findVendorName(
        vendorsStore.currentVendors[i].VendorList[j].id,
      );
      historyStore.historyEntry({
        actor: findActor(vendorsStore.currentVendors[i].VendorList[j].id),
        roleOrCompany: vendorName,
        action: "Vendor portal accessed",
        category: vendorsStore.currentVendors[i].type,
        vendor: vendorName,
        detail: "Secure link opened(simulated)",
      });
      historyStore.historyEntry({
        actor: findActor(vendorsStore.currentVendors[i].VendorList[j].id),
        roleOrCompany: vendorName,
        action: "Vendor submitted quotation",
        category: vendorsStore.currentVendors[i].type,
        vendor: vendorName,
        detail: "line item(s) quoted",
      });
    }
  }
};
</script>

<template>
  <div
    class="flex flex-wrap justify-between bg-white p-5 rounded-xl shadow-sm shadow-slate-300"
  >
    <div>
      <p class="font-bold text-sm">Try the full loop quickly</p>
      <p class="text-slate-500 text-[13px] tracking-tight">
        Simulates realistic vendor submissions (including a decline, a partial
        quote, a late submission and a clarification) so you can jump straight
        to comparison, award and costing.
      </p>
    </div>
    <div
      class="text-white bg-[#4f4dc2] flex justify-center items-center px-4 text-[13px]/1 rounded-lg font-bold cursor-pointer"
      @click="simulateVendors"
    >
      Simulate vendor submissions
    </div>
  </div>
</template>
