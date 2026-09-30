<script setup>
import { useRFQStore } from "@/store/RFQStore";
import { useRFQMainStore } from "@/store/RFQStoreMain";
const rfq = useRFQMainStore();
import { useFlagsStore } from "@/store/flag";
const flags = useFlagsStore();
const responseDeadlineDate = new Date(rfq.rfqDeadline).toLocaleDateString(
  "en-IN",
  {
    day: "2-digit",
    month: "long",
    year: "numeric",
  },
);
const responseDeadlineTime = new Date(rfq.rfqDeadline).toLocaleTimeString(
  "en-IN",
  {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  },
);
const timeline = [
  "Draft",
  "Sent to vendors",
  "Responses recieved",
  "Under evaluation",
  "Awarded",
  "Costing applied",
  "Sent to corporate",
];
// console.log(rfq.allocation);
</script>

<template>
  <!-- Initial Data -->
  <div class="bg-white shadow-sm h-40 shadow-slate-300 rounded-xl p-6 py-5">
    <div class="flex justify-between h-23">
      <div class="flex flex-col gap-1">
        <div class="text-[11px] text-slate-500 font-bold flex gap-2">
          <span class="tracking-wider">RFQ {{ rfq.rfqDetails.rfq_no }}</span>
          &middot;
          <span class="tracking-wider">{{ rfq.rfqDetails.mice_no }}</span>
        </div>
        <p class="font-bold text-xl">{{ rfq.rfqDetails.group }}</p>
        <p class="text-[13px] text-slate-500 font-normal">
          <span>{{ rfq.rfqDetails.company }}</span> &middot;
          <span>{{ rfq.rfqDetails.destination }}</span> &middot;
          <span>{{ rfq.rfqDetails.time }}</span> &middot;
          <span>{{ rfq.rfqDetails.travellers }}</span>
        </p>
      </div>
      <div class="flex flex-col items-end gap-1">
        <div
          v-if="flags.progress < 2"
          class="text-[11px] text-slate-500 font-bold h-6 w-20 p-1 flex justify-center items-center gap-1 rounded-xl bg-[#F4F5FA]"
        >
          <span class="text-[17px]">&#9679;</span>
          <span>Not sent</span>
        </div>
        <div
          v-else
          class="text-[11px] font-bold h-6 w-20 p-1 flex justify-center items-center gap-1 rounded-xl text-[#c02d3c] bg-[#fbe6e8]"
        >
          <span class="text-[17px]">&#9679;</span>
          <span>Overdue</span>
        </div>
        <p class="text-xs text-slate-600 font-normal">
          Response deadline :
          <span class="text-black font-bold"
            >{{ responseDeadlineDate }}, {{ responseDeadlineTime }}</span
          >
        </p>
      </div>
    </div>
    <!-- TimeLine -->
    <div class="flex text-[11px] flex-wrap">
      <div class="flex items-center" v-for="(value, index) in timeline">
        <span
          class="h-6 w-6 flex justify-center items-center rounded-full border-2 border-[#e3e5f0] mr-3 font-semibold"
          :class="{
            'bg-[#5b4fe0] text-white': flags.progress === index + 1,
            'bg-white text-[#6b7090]': flags.progress < index + 1,
            'bg-[#0d8f7a] text-white': flags.progress > index + 1,
          }"
          >{{ flags.progress > index + 1 ? "✓" : index + 1 }}</span
        >
        <span class="mr-2 text-[#6b7090] font-semibold text-[11.5px]">{{
          value
        }}</span>
        <div
          v-if="index < 6"
          class="h-1/10 w-8"
          :class="[flags.progress > index ? 'bg-[#0d8f7a]' : 'bg-[#e3e5f0]']"
        ></div>
      </div>
    </div>
  </div>
</template>
