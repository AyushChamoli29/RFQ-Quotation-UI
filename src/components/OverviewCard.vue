<script setup>
import data from "@/data/mockData.json";
</script>

<template>
  <div class="bg-white shadow-sm h-45 shadow-slate-300 rounded-xl p-7 py-5">
    <div class="flex justify-between h-23">
      <div class="flex flex-col gap-1">
        <p class="text-xs text-slate-500 font-bold">
          <span>RFQ {{ data.big_card.rfq_no }}</span> &middot;
          <span class="tracking-wide">{{ data.big_card.mice_no }}</span>
        </p>
        <p class="font-bold text-xl">{{ data.big_card.name }}</p>
        <p class="text-[13px] text-slate-500 font-normal">
          <span>{{ data.big_card.company_name }}</span> &middot;
          <span>{{ data.big_card.address }}</span> &middot;
          <span>{{ data.big_card["day/night"] }}</span> &middot;
          <span>{{ data.big_card.travellers }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-xs text-slate-600 font-bold text-right">
          &bull; {{ data.big_card.status }}
        </p>
        <p class="text-xs text-slate-600 font-normal">
          Response deadline :
          <span class="text-black font-semibold">{{
            data.big_card.deadline
          }}</span>
        </p>
      </div>
    </div>
    <div class="flex gap-1 text-xs flex-wrap mb-2">
      <div class="flex gap-2 justify-center items-center">
        <span
          class="h-6 w-6 flex justify-center items-center rounded-full bg-[#5957db] text-white"
        >
          1
        </span>
        <div>Draft</div>
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
