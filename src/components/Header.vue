<script setup>
import { ref } from "vue";
const flag = ref("agent");
const agent = () => {
  if (flag.value !== "agent") {
    flag.value = "agent";
  }
};
const vendor = () => {
  if (flag.value !== "vendor") {
    flag.value = "vendor";
  }
};
</script>

<template>
  <div
    class="bg-[#373593] flex flex-wrap justify-between px-7 py-4 items-center gap-10 fixed top-0 left-0 right-0"
  >
    <div class="flex gap-3">
      <div
        class="bg-[#ffffff24] font-bold text-white text-base tracking-tighter px-2 rounded-lg flex justify-center items-center outline outline-white/25"
      >
        TX
      </div>
      <div>
        <p class="font-bold text-base tracking-tighter text-white">
          Travelexic
        </p>
        <p class="text-xs/3 text-slate-300 tracking-tight">
          RFQ & Vendor Quotation Management
        </p>
      </div>
    </div>
    <div
      class="text-white flex justify-center items-center p-1 gap-3 bg-[#ffffff24] rounded-3xl text-[13px]/4 font-semibold"
    >
      <button
        @click="agent"
        class="p-2"
        :class="{
          'bg-white text-[#373593] px-4 rounded-3xl': flag === 'agent',
        }"
      >
        Agent Workspace
      </button>
      <button
        @click="vendor"
        class="p-2"
        :class="{ 'bg-white text-[#373593] rounded-3xl': flag === 'vendor' }"
      >
        Vendor Portal
      </button>
    </div>
    <div class="text-white flex gap-3 text-xs justify-center items-center">
      <p class="text-slate-300">Acting as</p>
      <div class="outline outline-white/50 p-1 rounded-md bg-[#ffffff24]">
        <select id="acting">
          <option class="text-black" value="Priya Sharma">
            Priya Sharma &mdash; RFQ/Procuremer
          </option>
          <option class="text-black" value="Karan Verma">
            Karan Verma &mdash; Operations & Costing
          </option>
          <option class="text-black" value="Neha Gupta">
            Neha Gupta &mdash; Approver
          </option>
        </select>
      </div>
      <div
        class="text-white font-medium flex text-xs/2 px-3 py-3 justify-center items-center outline outline-white/25 rounded-lg cursor-pointer hover:bg-[#ffffff24]"
      >
        <button class="cursor-pointer">Reset prototype data</button>
      </div>
    </div>
  </div>
</template>
