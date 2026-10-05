<script setup>
import data from "@/data/mockData.json";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useHistoryStore } from "@/store/auditHistory";
import { useFlagsStore } from "@/store/flag";
import { useVendorStore } from "@/store/requirementsVendor";
import { useAllocationStore } from "@/store/AllocationStore";
import VendorResponses from "@/views/VendorResponses.vue";
import { useRFQMainStore } from "@/store/RFQStoreMain";
const rfq = useRFQMainStore();
const flags = useFlagsStore();
const router = useRouter();
const historyStore = useHistoryStore();
const vendorsStore = useVendorStore();
const allocationStore = useAllocationStore();
const emit = defineEmits(["simulate-vendors"]);
const vendorName = (id) => {
  for (const element of rfq.vendors) {
    if (element.id === id) {
      return element.name;
    }
  }
};
const categoryName = (id) => {
  for (const element of rfq.vendors) {
    if (element.id === id) {
      return element.type;
    }
  }
};
const findQuotedLines = (vendorid) => {
  let totalLines = 0;
  let quotedLines = 0;
  const vendor = computed(() => {
    for (const element of Object.keys(rfq.workingQuotation)) {
      if (element === vendorid) {
        return rfq.workingQuotation[element] || {};
      }
    }
  });
  for (const value of Object.values(vendor.value)) {
    if (value?.price !== null) {
      quotedLines++;
    }
    totalLines++;
  }
  return { quoted: quotedLines, total: totalLines };
};
const simulateVendors = () => {
  flags.simulateFlag = true;
  flags.progress = 3;
  rfq.rfqStatus = "simulated";
  for (const categoryObj of rfq.categories) {
    rfq.extractQuotation(categoryObj.id);
  }
  for (const [vendorid, quotation] of Object.entries(rfq.workingQuotation)) {
    let hasNull = false;
    let hasValue = false;

    for (const id of Object.keys(quotation)) {
      if (quotation[id].price === null) {
        hasNull = true;
      } else {
        hasValue = true;
      }
    }

    let finalStatus = "";

    if (hasValue && hasNull) {
      finalStatus = "partially submitted"; //  mixed case
    } else if (hasValue) {
      finalStatus = "submitted"; // all filled
    } else {
      finalStatus = "declined"; // all null
    }

    for (const element of rfq.allocation) {
      for (const item of element.vendorList) {
        if (item.vendorid === vendorid) {
          item.status = finalStatus;
        }
      }
    }
  }
  router.push({ name: "vendorResponses" });
  const vendorsAllocated = ref([]);
  for (const element of rfq.allocation) {
    for (const item of element.vendorList) {
      if (
        item.status === "submitted" ||
        item.status === "partially submitted" ||
        item.status === "declined"
      ) {
        vendorsAllocated.value.push(item.vendorid);
      }
    }
  }
  for (const vid of vendorsAllocated.value) {
    historyStore.historyEntry({
      actor: rfq.selectedActor.name,
      roleOrCompany: rfq.selectedActor.role,
      action: "Vendor portal accessed",
      category: categoryName(vid),
      vendor: vendorName(vid),
      detail: "Secure link opened (simulated)",
    });
    historyStore.historyEntry({
      actor: rfq.selectedActor.name,
      roleOrCompany: rfq.selectedActor.role,
      action: `${findQuotedLines(vid).quoted === 0 ? "Vendor declined category" : "Vendor submitted quotation"}`,
      category: categoryName(vid),
      vendor: vendorName(vid),
      detail: `${findQuotedLines(vid).quoted}/${findQuotedLines(vid).total} line items(s) quoted`,
    });
  }
  historyStore.historyEntry({
    actor: rfq.selectedActor.name,
    roleOrCompany: rfq.selectedActor.role,
    action: "Clarification question raised",
    category: "Flights",
    vendor: "SkyBridge Airlines",
    detail:
      "Please confirm whether the return sector is a same-day or next-day connection.",
  });
  historyStore.historyEntry({
    actor: rfq.selectedActor.name,
    roleOrCompany: rfq.selectedActor.role,
    action: "Clarification answered",
    category: "Flights",
    vendor: "SkyBridge Airlines",
    detail:
      "Same-day connection required; onward departure not before 20:00 local time.",
  });
  historyStore.historyEntry({
    actor: rfq.selectedActor.name,
    roleOrCompany: rfq.selectedActor.role,
    action: "Vendor submissions simulated",
    detail:
      "Demo shortcut used to populate realistic responses, including a decline, a partial quote, a late submission and a clarification.",
  });
  // Object.entries(allocationStore.simulatedVendors).forEach(([key]) => {
  //   allocationStore.simulatedVendors[key] = [
  //     ...allocationStore.allocation[key],
  //   ];
  // });
  // for (let i = 0; i < vendorsStore.currentVendors.length; i++) {
  //   for (let j = 0; j < vendorsStore.currentVendors[i].VendorList.length; j++) {
  //     const vendorName = findVendorName(
  //       vendorsStore.currentVendors[i].VendorList[j].id,
  //     );
  //     const { total, quoted } = findQuotedLines(vendorName);
  //     historyStore.historyEntry({
  //       actor: findActor(vendorsStore.currentVendors[i].VendorList[j].id),
  //       roleOrCompany: vendorName,
  //       action: "Vendor portal accessed",
  //       category: vendorsStore.currentVendors[i].type,
  //       vendor: vendorName,
  //       detail: "Secure link opened (simulated)",
  //     });
  //     historyStore.historyEntry({
  //       actor: findActor(vendorsStore.currentVendors[i].VendorList[j].id),
  //       roleOrCompany: vendorName,
  //       action: "Vendor submitted quotation",
  //       category: vendorsStore.currentVendors[i].type,
  //       vendor: vendorName,
  //       detail: `${quoted}/${total} line item(s) quoted`,
  //     });
  //   }
  // }
  // historyStore.historyEntry({
  //   actor: "Anurag Mehta",
  //   roleOrCompany: "SkyBridge Airlines",
  //   action: "Clarification question raised",
  //   category: "Flights",
  //   vendor: "SkyBridge Airlines",
  //   detail:
  //     "Please confirm whether the return sector is a same-day or next-day connection.",
  // });
  // historyStore.historyEntry({
  //   actor: "Priya Sharma",
  //   roleOrCompany: "RFQ / Procurement Manager",
  //   action: "Clarification answered",
  //   category: "Flights",
  //   vendor: "SkyBridge Airlines",
  //   detail:
  //     "Same-day connection required; onward departure not before 20:00 local time.",
  // });
  // historyStore.historyEntry({
  //   actor: "Priya Sharma",
  //   roleOrCompany: "RFQ / Procurement Manager",
  //   action: "Vendor submission simulated",
  //   detail:
  //     "Demo shortcut used to populate realistic responses, including a decline, a partial quote, a late submission and a clarification.",
  // });
};
// console.log(rfq.workingQuotation);
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
