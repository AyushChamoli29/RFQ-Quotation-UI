<script setup>
import { computed } from "vue";
import { useAwardedStore } from "@/store/awardedLines";
import { useHistoryStore } from "@/store/auditHistory";
import { useRFQMainStore } from "@/store/RFQStoreMain";
const rfq = useRFQMainStore();
const awardedStore = useAwardedStore();
const historyStore = useHistoryStore();
// this function takes a number as input and formats it into currency format
function formatCurrency(value) {
  return Number(value).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
}
// this is data from costing snapshot
const quotationData = computed(() => rfq.costingSnapshot || []);
// this is the computation of grand total
const grandFinal = computed(() => {
  let ans = 0;
  for (const element of quotationData.value) {
    ans += element.total;
  }
  return formatCurrency(ans);
});
// this is basically used to send an alert the the quotation is sent, for updating the rfq status and for entry in the audit history also
const sendToCorporate = () => {
  alert(`Quotation marked as sent to ${rfq.rfqDetails.company}`);
  // this flag is for the UI
  rfq.sendToCorporateFlag = true;
  rfq.rfqStatus = "sent to corporate";
  // this is for timeline in overview
  rfq.progress = 7;
  historyStore.historyEntry({
    actor: rfq.selectedActor.name,
    roleOrCompany: rfq.selectedActor.role,
    action: "Quotation sent to corporate",
    detail: `Cipla Limited - costing v${awardedStore.costVersions}, final amount ${grandFinal.value}`,
  });
};
</script>

<template>
  <div
    v-if="!rfq.costingSnapshot || rfq.costingSnapshot.length === 0"
    class="h-47 rounded-xl shadow-md shadow-slate-300 gap-1 px-5 py-4 flex flex-col bg-white outline outline-slate-200 justify-center items-center"
  >
    <span class="text-4xl">📄</span>
    <p class="font-bold mt-2 text-lg text-[#3a3f58]">Nothing to quote yet</p>
    <p class="text-[#6b7090]">
      Apply awarded rates to costing before generating the corporate quotation.
    </p>
  </div>
  <div
    v-if="rfq.costingSnapshot && rfq.costingSnapshot.length > 0"
    class="bg-white rounded-xl p-5"
  >
    <div class="flex justify-between">
      <div>
        <p class="text-[#6b7090] font-bold text-[11px]">QUOTATION</p>
        <p class="text-[19px] font-bold">{{ rfq.rfqDetails.group }}</p>
        <span class="text-[#6b7090] text-[12.5px]"
          >Prepared for {{ rfq.rfqDetails.company }}</span
        >
        &middot;
        <span class="text-[#6b7090] text-[12.5px]">Attn: Anjali Deshmukh</span>
      </div>
      <div class="text-[#6b7090] text-[12.5px] text-right">
        <p>
          Reference:
          <span class="text-black font-bold">{{ rfq.rfqDetails.rfq_no }}</span>
          (Costing v{{ awardedStore.costVersions }})
        </p>
        <p>Travel: 31 Jul 2026 - 05 Aug 2026</p>
        <span>{{ rfq.rfqDetails.destination }}</span>
        &middot; <span>{{ rfq.rfqDetails.time }}</span> &middot;
        <span>{{ rfq.rfqDetails.travellers }} pax</span>
      </div>
    </div>
    <div>
      <table class="w-full">
        <thead class="text-left text-[11.5px] text-[#6b7090]">
          <tr>
            <th class="pl-2">CATEGORY</th>
            <th>LINE ITEMS</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody class="text-left text-xs">
          <tr
            v-for="element in quotationData"
            :class="{ 'border-t border-[#eef0f8]': element.total > 0 }"
          >
            <td v-if="element.total > 0" class="font-bold py-2 pl-2">
              {{ rfq.categoryName(element.categoryID) }}
            </td>
            <td v-if="element.total > 0" class="pl-2">
              {{ element.lines.length }}
            </td>
            <td v-if="element.total > 0" class="font-mono font-bold">
              {{ formatCurrency(element.total) }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td class="text-right font-bold pr-4 text-xs">Grand Total</td>
            <td class="text-left font-mono font-bold text-[#3f3ba6]">
              {{ grandFinal }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <br />
    <div class="bg-[#eef0f8] text-[#3a3f58] text-xs py-3 px-4 rounded-lg mt-2">
      Rates to remain valid for 15 days from submission. Quotes to be inclusive
      of applicable local taxes unless marked otherwise.
    </div>
    <div class="flex justify-between mt-2">
      <div class="text-[#6b7090] text-[12.5px]">
        <span v-if="!rfq.sendToCorporateFlag"
          >Not yet sent to the corporate contact.</span
        >
        <span v-if="rfq.sendToCorporateFlag"
          >Sent to corporate on {{ rfq.currentDate }},
          {{ rfq.currentTime }}.</span
        >
      </div>
      <div
        class="font-[650] text-[13px] p-2 rounded-lg cursor-pointer"
        :class="
          rfq.sendToCorporateFlag
            ? 'bg-white text-[#3a3f58] border border-[#e3e5f0] hover:bg-[#eef0f8]'
            : 'bg-[#0d8f7a] text-white'
        "
        @click="sendToCorporate"
      >
        <span v-if="!rfq.sendToCorporateFlag">Mark as sent to corporate</span>
        <span v-else-if="rfq.sendToCorporateFlag">Re-send quotation</span>
      </div>
    </div>
  </div>
</template>
