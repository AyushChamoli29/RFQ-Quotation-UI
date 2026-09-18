<script setup>
import { computed } from "vue";
import { useFlagsStore } from "@/store/flag";
import { useAwardedStore } from "@/store/awardedLines";
const Flag = useFlagsStore();
const awardedStore = useAwardedStore();
const grandFinal = computed(() => {
  let ans = 0;
  for (const element of Object.values(awardedStore.awardedLines)) {
    ans += element.final;
  }
  return Number(ans).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
});
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
const sendToCorporate = () => {
  Flag.sendToCorporateFlag = true;
};
</script>

<template>
  <div
    v-if="!Flag.costingFlag"
    class="h-47 rounded-xl shadow-md shadow-slate-300 gap-1 px-5 py-4 flex flex-col bg-white outline outline-slate-200 justify-center items-center"
  >
    <span class="text-4xl">📄</span>
    <p class="font-bold mt-2 text-lg text-[#3a3f58]">Nothing to quote yet</p>
    <p class="text-[#6b7090]">
      Apply awarded rates to costing before generating the corporate quotation.
    </p>
  </div>
  <div v-if="Flag.costingFlag" class="bg-white rounded-xl p-5">
    <div class="flex justify-between">
      <div>
        <p class="text-[#6b7090] font-bold text-[11px]">QUOTATION</p>
        <p class="text-[19px] font-bold">Geanis World &ndash; Pattaya Group</p>
        <span class="text-[#6b7090] text-[12.5px]"
          >Prepared for Cipla Limited</span
        >
        &middot;
        <span class="text-[#6b7090] text-[12.5px]">Attn: Anjali Deshmukh</span>
      </div>
      <div class="text-[#6b7090] text-[12.5px] text-right">
        <p>
          Reference:
          <span class="text-black font-bold">RFQ-2026-0142</span> (Costing v{{
            awardedStore.costVersions
          }})
        </p>
        <p>Travel: 31 Jul 2026 - 05 Aug 2026</p>
        <span>Pattaya, Thailand</span>
        &middot; <span>5D/4N</span> &middot; <span>120 pax</span>
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
            v-for="[key, value] in Object.entries(awardedStore.awardedLines)"
            :class="{ 'border-t border-[#eef0f8]': value.final > 0 }"
          >
            <td v-if="value.final > 0" class="font-bold py-2 pl-2">
              {{ key }}
            </td>
            <td v-if="value.final > 0" class="pl-2">
              {{ Object.keys(value.data).length }}
            </td>
            <td v-if="value.final > 0" class="font-mono font-bold">
              {{
                Number(value.final).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                })
              }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="border-t border-[#eef0f8]">
            <td></td>
            <td class="text-right font-bold pr-4">Grand Total</td>
            <td class="text-left font-mono font-bold text-[#3f3ba6]">
              {{ grandFinal }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="bg-[#eef0f8] text-[#3a3f58] text-xs py-3 px-4 rounded-lg mt-2">
      Rates to remain valid for 15 days from submission. Quotes to be inclusive
      of applicable local taxes unless marked otherwise.
    </div>
    <div class="flex justify-between mt-2">
      <div class="text-[#6b7090] text-[12.5px]">
        <span v-if="!Flag.sendToCorporateFlag"
          >Not yet sent to the corporate contact.</span
        >
        <span v-if="Flag.sendToCorporateFlag"
          >Sent to corporate on {{ currentDate }}, {{ currentTime }}.</span
        >
      </div>
      <div
        class="font-[650] text-[13px] p-2 rounded-lg cursor-pointer"
        :class="
          Flag.sendToCorporateFlag
            ? 'bg-white text-[#3a3f58] border border-[#e3e5f0]'
            : 'bg-[#0d8f7a] text-white'
        "
        @click="sendToCorporate"
      >
        <span v-if="!Flag.sendToCorporateFlag">Mark as sent to corporate</span>
        <span v-else-if="Flag.sendToCorporateFlag">Re-send quotation</span>
      </div>
    </div>
  </div>
</template>
