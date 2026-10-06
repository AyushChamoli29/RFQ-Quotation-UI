<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useHistoryStore } from "@/store/auditHistory";
import { useRFQMainStore } from "@/store/RFQStoreMain";
const rfq = useRFQMainStore();
const router = useRouter();
const historyStore = useHistoryStore();
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
  rfq.progress=3;
  rfq.rfqStatus = "simulated";
  // down here we get all the prices when simulate is clicked from base quotation to working quotation in rfq store
  for (const categoryObj of rfq.categories) {
    rfq.extractQuotation(categoryObj.id);
  }
  // after simulate down here we are changing the status of every vendor from not sent or sent or whatever it was to submitted, partially submitted or decilned on the basis of for all requirement line their price is all null or some null or no null
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
      finalStatus = "partially submitted";
    } else if (hasValue) {
      finalStatus = "submitted";
    } else {
      finalStatus = "declined";
    }

    for (const element of rfq.allocation) {
      for (const item of element.vendorList) {
        if (item.vendorid === vendorid) {
          item.status = finalStatus;
        }
      }
    }
  }
  // go to vendor responses
  router.push({ name: "vendorResponses" });
  // this vendorsAllocated is an array which has all vendor id whose status is either submitted or partially submitted or declined as we need it for audit history
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
  // audit history
  for (const vid of vendorsAllocated.value) {
    historyStore.historyEntry({
      actor: rfq.selectedActor.name,
      roleOrCompany: rfq.selectedActor.role,
      action: "Vendor portal accessed",
      category: rfq.categoryName(vid),
      vendor: rfq.vendorName(vid),
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
