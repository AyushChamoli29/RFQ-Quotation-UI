<script setup>
import data from "@/data/mockData.json";
import { computed, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useFlagsStore } from "@/store/flag";
const flags = useFlagsStore();

const route = useRoute();

const activeSpace = computed(() => {
  return route.matched[0]?.name || "agentWorkspace";
});
const actor = [...data.actor];
const selectedActor = ref(actor[0]);
watch(selectedActor, (newActor) => {
  flags.selectedActor = newActor;
});
</script>

<template>
  <div
    class="bg-[#373593] flex flex-wrap justify-between px-7 py-4 items-center gap-10 fixed top-0 left-0 right-0 z-10"
  >
    <div class="flex gap-3">
      <div
        class="bg-[#ffffff24] font-bold text-white text-base tracking-tighter px-2 rounded-lg flex justify-center items-center outline outline-white/25"
      >
        TX
      </div>
      <div>
        <p class="font-bold text-base/7 tracking-tighter text-white">
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
      <RouterLink to="/">
        <button
          @click="agent"
          class="p-2 pl-3"
          :class="{
            'bg-white text-[#373593] px-4 rounded-3xl':
              activeSpace === 'agentWorkspace',
          }"
        >
          Agent Workspace
        </button>
      </RouterLink>
      <RouterLink to="/vendorPortal">
        <button
          @click="vendor"
          class="p-2 pr-3"
          :class="{
            'bg-white text-[#373593] px-4 rounded-3xl':
              activeSpace === 'vendorPortal',
          }"
        >
          Vendor Portal
        </button>
      </RouterLink>
    </div>
    <div class="text-white flex gap-2 text-xs justify-center items-center">
      <p
        class="text-slate-300 text-[11px]"
        :class="{ hidden: activeSpace === 'vendorPortal' }"
      >
        Acting as
      </p>
      <div
        class="outline outline-white/50 py-2 px-1 rounded-md bg-[#ffffff24]"
        :class="{ hidden: activeSpace === 'vendorPortal' }"
      >
        <select id="acting" v-model="selectedActor">
          <option v-for="item in actor" class="text-black" :value="item">
            {{ item.name }} &mdash; {{ item.role }}
          </option>
        </select>
      </div>
      <div
        class="text-slate-200 font-medium flex text-xs/2 px-3 py-3 justify-center items-center outline outline-white/25 rounded-lg cursor-pointer hover:bg-[#ffffff24]"
      >
        <button class="cursor-pointer">Reset prototype data</button>
      </div>
    </div>
  </div>
</template>
