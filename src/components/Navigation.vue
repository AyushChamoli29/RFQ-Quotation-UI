<script setup>
import { RouterLink, useRoute } from "vue-router";
import { useFlagsStore } from "@/store/flag";
import { useHistoryStore } from "@/store/auditHistory";
import { useVendorStore } from "@/store/requirementsVendor";
const route = useRoute();
const flags = useFlagsStore();
const historyStore = useHistoryStore();
const vendorsStore = useVendorStore();
</script>

<template>
  <div
    class="flex flex-wrap gap-1 w-full bg-white text-slate-500 text-sm/6 font-semibold justify-start items-center mt-5 p-1 rounded-xl shadow-sm shadow-slate-300"
  >
    <RouterLink :to="{ name: 'overview' }">
      <div
        class="cursor-pointer p-2 px-4"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#f7f6fe]':
            route.name === 'overview',
        }"
      >
        Overview
      </div>
    </RouterLink>
    <RouterLink :to="{ name: 'requirements' }"
      ><div
        class="cursor-pointer p-2 px-4"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#f7f6fe]':
            route.name === 'requirements',
        }"
      >
        Requirements & Allocation
      </div></RouterLink
    >
    <RouterLink :to="{ name: 'vendorResponses' }"
      ><div
        class="cursor-pointer p-2 px-4"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#f7f6fe]':
            route.name === 'vendorResponses',
        }"
      >
        Vendor Responses
        <span
          v-if="flags.simulateFlag"
          class="text-white text-[11px] font-bold rounded-2xl px-2"
          :class="
            route.name === 'vendorResponses' ? 'bg-[#5b4fe0]' : 'bg-[#9ba0c0]'
          "
          >{{ vendorsStore.totalVendors }}</span
        >
      </div></RouterLink
    >
    <RouterLink :to="{ name: 'costing' }"
      ><div
        class="cursor-pointer p-2 px-4"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#f7f6fe]':
            route.name === 'costing',
        }"
      >
        Costing
      </div></RouterLink
    >
    <RouterLink :to="{ name: 'corporate' }"
      ><div
        class="cursor-pointer p-2 px-4"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#f7f6fe]':
            route.name === 'corporate',
        }"
      >
        Corporate Quotation
      </div></RouterLink
    >
    <RouterLink :to="{ name: 'auditHistory' }"
      ><div
        class="cursor-pointer p-2 px-4"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#f7f6fe]':
            route.name === 'auditHistory',
        }"
      >
        Audit History
        <span
          v-if="historyStore.history.length >= 1"
          class="text-white text-[11px] font-bold rounded-2xl px-2"
          :class="
            route.name === 'auditHistory' ? 'bg-[#5b4fe0]' : 'bg-[#9ba0c0]'
          "
          >{{ historyStore.history.length }}</span
        >
      </div></RouterLink
    >
  </div>
</template>
