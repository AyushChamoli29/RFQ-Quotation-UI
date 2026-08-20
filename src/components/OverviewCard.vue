<script setup>
import data from "@/data/mockData.json";
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
          class="text-[11px] text-slate-500 font-bold h-6 w-20 p-1 flex justify-center items-center gap-1 rounded-lg bg-[#F4F5FA]"
        >
          <span class="text-[17px]">&#9679;</span> {{ data.big_card.status }}
        </div>
        <p class="text-xs text-slate-600 font-normal">
          Response deadline :
          <span class="text-black font-bold"
            >{{ responseDeadlineDate }},{{ responseDeadlineTime }}</span
          >
        </p>
      </div>
    </div>
    <div class="flex text-[11px] flex-wrap">
      <div class="flex gap-2 justify-center items-center">
        <span
          class="h-6 w-6 flex justify-center items-center rounded-full bg-[#5957db] text-white"
        >
          1
        </span>
        <div class="font-medium">Draft</div>
        <div class="h-1/10 w-10 bg-slate-200"></div>
      </div>
      <div class="flex gap-2 justify-center items-center">
        <span
          class="h-6 w-6 text-[11px] font-bold flex justify-center items-center rounded-full bg-white text-slate-400 outline outline-slate-300"
        >
          2
        </span>
        <div class="text-slate-500 font-medium">Sent to vendors</div>
        <div class="h-1/10 w-10 bg-slate-200"></div>
      </div>
      <div class="flex gap-2 justify-center items-center">
        <span
          class="h-6 w-6 text-[11px] font-bold flex justify-center items-center rounded-full bg-white text-slate-400 outline outline-slate-300"
        >
          3
        </span>
        <div class="text-slate-500 font-medium">Responses recieved</div>
        <div class="h-1/10 w-10 bg-slate-200"></div>
      </div>
      <div class="flex gap-2 justify-center items-center">
        <span
          class="h-6 w-6 text-[11px] font-bold flex justify-center items-center rounded-full bg-white text-slate-400 outline outline-slate-300"
        >
          4
        </span>
        <div class="text-slate-500 font-medium">Under evaluation</div>
        <div class="h-1/10 w-10 bg-slate-200"></div>
      </div>
      <div class="flex gap-2 justify-center items-center">
        <span
          class="h-6 w-6 text-[11px] font-bold flex justify-center items-center rounded-full bg-white text-slate-400 outline outline-slate-300"
        >
          5
        </span>
        <div class="text-slate-500 font-medium">Awarded</div>
        <div class="h-1/10 w-10 bg-slate-200"></div>
      </div>
      <div class="flex gap-2 justify-center items-center">
        <span
          class="h-6 w-6 text-[11px] font-bold flex justify-center items-center rounded-full bg-white text-slate-400 outline outline-slate-300"
        >
          6
        </span>
        <div class="text-slate-500 font-medium">Costing applied</div>
        <div class="h-1/10 w-10 bg-slate-200"></div>
      </div>
      <div class="flex gap-2 justify-center items-center">
        <span
          class="h-6 w-6 text-[11px] font-bold flex justify-center items-center rounded-full bg-white text-slate-400 outline outline-slate-300"
        >
          7
        </span>
        <div class="text-slate-500 font-medium">Sent to corporate</div>
      </div>
    </div>
  </div>
</template>
