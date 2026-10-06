<script setup>
import { useRFQMainStore } from "@/store/RFQStoreMain";
const rfq = useRFQMainStore();
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
</script>

<template>
  <div class="bg-white rounded-lg p-5 flex flex-col gap-3">
    <div class="flex justify-between">
      <div>
        <p class="text-[#6b7090] font-bold text-[11px]">RFQ REFERENCE</p>
        <p class="font-bold text-[19px]">{{ rfq.rfqDetails.rfq_no }}</p>
      </div>
      <div class="text-right">
        <div
          v-if="rfq.rfqStatus !== 'draft' && rfq.deadlineStatus === 'overdue'"
          class="text-[11px] font-bold h-6 w-20 p-1 flex justify-center items-center gap-1 rounded-xl text-[#c02d3c] bg-[#fbe6e8]"
        >
          <span class="text-[17px]">&#9679;</span>
          <span>Overdue</span>
        </div>
        <div
          v-else-if="
            rfq.rfqStatus !== 'draft' && rfq.deadlineStatus === 'due today'
          "
          class="text-[11px] font-bold h-6 w-20 p-1 flex justify-center items-center gap-1 rounded-xl text-[#b46a06] bg-[#fdf1de]"
        >
          <span class="text-[17px]">&#9679;</span>
          <span>Due today</span>
        </div>
        <div
          v-else-if="
            rfq.rfqStatus !== 'draft' && rfq.deadlineStatus === 'upcoming'
          "
          class="text-[11px] font-bold h-6 w-20 p-1 flex justify-center items-center gap-1 rounded-xl text-[#0d8f7a] bg-[#e1f6f1]"
        >
          <span class="text-[17px]">&#9679;</span>
          <span>Upcoming</span>
        </div>
        <p class="text-[#6b7090] text-xs mt-2">
          Submit by
          <span class="font-bold text-black"
            >{{ responseDeadlineDate }}, {{ responseDeadlineTime }}</span
          >
        </p>
      </div>
    </div>
    <div class="flex gap-5">
      <div
        class="border border-[#e3e5f0] bg-white w-1/4 p-4 rounded-xl flex flex-col gap-1"
      >
        <p class="text-[#6b7090] text-[11.5px] font-semibold">DESTINATION</p>
        <p class="font-mono text-sm font-bold">
          {{ rfq.rfqDetails.destination }}
        </p>
      </div>
      <div
        class="border border-[#e3e5f0] bg-white w-1/4 p-4 rounded-xl flex flex-col gap-1"
      >
        <p class="text-[#6b7090] text-[11.5px] font-semibold">DURATION</p>
        <p class="font-mono text-sm font-bold">{{ rfq.rfqDetails.time }}</p>
      </div>
      <div
        class="border border-[#e3e5f0] bg-white w-1/4 p-4 rounded-xl flex flex-col gap-1"
      >
        <p class="text-[#6b7090] text-[11.5px] font-semibold">TRAVELLERS</p>
        <p class="font-mono text-sm font-bold">
          {{ rfq.rfqDetails.travellers }}
        </p>
      </div>
      <div
        class="border border-[#e3e5f0] bg-white w-1/4 p-4 rounded-xl flex flex-col gap-1"
      >
        <p class="text-[#6b7090] font-semibold text-[11.5px]">
          INDICATE TRAVEL WINDOW
        </p>
        <p class="font-mono font-bold text-sm">31 Jul 2026 - 05 Aug 2026</p>
      </div>
    </div>
    <div class="text-[#9ba0c0] text-[11px]">
      Client identity, internal budget and other vendors' details are not shared
      with quotation participants.
    </div>
  </div>
</template>
