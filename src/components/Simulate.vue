<script setup>
import data from "@/data/mockData.json";
import { ref } from "vue";
import { useHistoryStore } from "@/store/auditHistory";
import { useFlagsStore } from "@/store/flag";
import { useVendorStore } from "@/store/requirementsVendor";
const flags = useFlagsStore();
const historyStore = useHistoryStore();
const vendorsStore = useVendorStore();
const emit = defineEmits(["simulate-vendors"]);
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
const findQuotedLines = (vendor) => {
  let totalLines = ref(0);
  let quotedLines = ref(0);
  const vendorObj = data.vendor_portal.find((item) => {
    return item.name === vendor;
  });
  const objMain = data.vendorPricing.find((item) => {
    return item.category === vendorObj.type;
  });
  totalLines.value = objMain.vendorsPrices.length;
  for (const element of objMain.vendorsPrices) {
    for (const item of element.content) {
      if (item.name === vendor && item.information.status === "submitted") {
        quotedLines.value++;
      }
    }
  }
  return { total: totalLines.value, quoted: quotedLines.value };
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
      const { total, quoted } = findQuotedLines(vendorName);
      historyStore.historyEntry({
        actor: findActor(vendorsStore.currentVendors[i].VendorList[j].id),
        roleOrCompany: vendorName,
        action: "Vendor portal accessed",
        category: vendorsStore.currentVendors[i].type,
        vendor: vendorName,
        detail: "Secure link opened (simulated)",
      });
      historyStore.historyEntry({
        actor: findActor(vendorsStore.currentVendors[i].VendorList[j].id),
        roleOrCompany: vendorName,
        action: "Vendor submitted quotation",
        category: vendorsStore.currentVendors[i].type,
        vendor: vendorName,
        detail: `${quoted}/${total} line item(s) quoted`,
      });
    }
  }
  historyStore.historyEntry({
    actor: "Anurag Mehta",
    roleOrCompany: "SkyBridge Airlines",
    action: "Clarification question raised",
    category: "Flights",
    vendor: "SkyBridge Airlines",
    detail:
      "Please confirm whether the return sector is a same-day or next-day connection.",
  });
  historyStore.historyEntry({
    actor: "Priya Sharma",
    roleOrCompany: "RFQ / Procurement Manager",
    action: "Clarification answered",
    category: "Flights",
    vendor: "SkyBridge Airlines",
    detail:
      "Same-day connection required; onward departure not before 20:00 local time.",
  });
  historyStore.historyEntry({
    actor: "Priya Sharma",
    roleOrCompany: "RFQ / Procurement Manager",
    action: "Vendor submission simulated",
    detail:
      "Demo shortcut used to populate realistic responses, including a decline, a partial quote, a late submission and a clarification.",
  });
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
