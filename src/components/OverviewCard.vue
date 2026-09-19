<script setup>
import data from "@/data/mockData.json";
import { useFlagsStore } from "@/store/flag";
const flags = useFlagsStore();
const responseDeadlineDate = new Date(
  data.big_card.deadline,
).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});
const responseDeadlineTime = new Date(
  data.big_card.deadline,
).toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
</script>

<template>
  <!-- Initial Data -->
  <div class="bg-white shadow-sm h-40 shadow-slate-300 rounded-xl p-6 py-5">
    <div class="flex justify-between h-23">
      <div class="flex flex-col gap-1">
        <div class="text-[11px] text-slate-500 font-bold flex gap-2">
          <span class="tracking-wider">RFQ {{ data.big_card.rfq_no }}</span>
          &middot;
          <span class="tracking-wider">{{ data.big_card.mice_no }}</span>
        </div>
        <p class="font-bold text-xl">{{ data.big_card.name }}</p>
        <p class="text-[13px] text-slate-500 font-normal">
          <span>{{ data.big_card.company_name }}</span> &middot;
          <span>{{ data.big_card.address }}</span> &middot;
          <span>{{ data.big_card["day/night"] }}</span> &middot;
          <span>{{ data.big_card.travellers }}</span>
        </p>
      </div>
      <div class="flex flex-col items-end gap-1">
        <div
          v-if="flags.progress < 2"
          class="text-[11px] text-slate-500 font-bold h-6 w-20 p-1 flex justify-center items-center gap-1 rounded-xl bg-[#F4F5FA]"
        >
          <span class="text-[17px]">&#9679;</span>
          <span>{{ data.big_card.status1 }}</span>
        </div>
        <div
          v-else
          class="text-[11px] font-bold h-6 w-20 p-1 flex justify-center items-center gap-1 rounded-xl text-[#c02d3c] bg-[#fbe6e8]"
        >
          <span class="text-[17px]">&#9679;</span>
          <span>{{ data.big_card.status2 }}</span>
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
      <div class="flex items-center" v-for="(value, index) in data.timeline">
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
