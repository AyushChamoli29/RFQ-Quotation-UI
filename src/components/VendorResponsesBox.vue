<script setup>
import Data from "@/data/mockData.json";
import { computed, defineProps, onMounted } from "vue";
import VendorSelection from "./VendorSelection.vue";
import { useFlagsStore } from "@/store/flag.js";
import { useHistoryStore } from "@/store/auditHistory.js";
import { useVendorStore } from "@/store/requirementsVendor.js";
import VendorResponsesEntry from "./VendorResponsesEntry.vue";
const flags = useFlagsStore();
const historyStore = useHistoryStore();
const vendorsStore = useVendorStore();
const prop = defineProps({
  data: Object,
});
const vendorsToBeDisplayed = computed(() => {
  let vendorSelected = [];
  for (const element of vendorsStore.currentVendors) {
    if (element.type === prop.data.category) {
      vendorSelected = element.VendorList;
    }
  }

  vendorSelected = vendorSelected.map((item) => {
    for (const element of Data.vendor_portal) {
      if (element.id === item) {
        return { name: element.name, status: element.status };
      }
    }
  });
  return vendorSelected;
});
</script>

<template>
  <div v-if="vendorsToBeDisplayed.length >= 1">
    <!-- Heading -->
    <div class="flex justify-between px-5 py-4">
      <div class="text-[#6b7090] text-[13px] font-bold">
        {{ prop.data.category.toUpperCase() }} &mdash; QUOTATION COMPARISON
      </div>
      <div class="flex gap-3 text-xs" v-if="vendorsToBeDisplayed.length">
        <div
          v-for="item in vendorsToBeDisplayed"
          class="bg-[#e1f6f1] text-[#0d8f7a] text-[11px] font-bold p-1 px-2 rounded-4xl h-max"
          :class="[
            {
              'bg-[#fdf1de] text-[#b46a06]':
                item.status === 'partially submitted',
            },
            { 'bg-[#fbe6e8] text-[#c02d3c]': item.status === 'declined' },
          ]"
        >
          {{ item.name }} : {{ item.status }}
        </div>
      </div>
    </div>
    <!-- Table -->
    <div>
      <table class="w-full border-t border-b border-slate-200">
        <thead>
          <tr class="text-[#6b7090] text-[11px] text-left">
            <th class="p-2">PARTICULAR</th>
            <th v-for="item in vendorsToBeDisplayed" class="px-2">
              {{ item.name.toUpperCase() }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in prop.data.vendorsPrices"
            class="text-left text-xs border-t border-slate-200"
          >
            <td class="py-5 px-2">
              <span class="font-bold">{{ item.requirementLine }}</span> <br />
              <span class="text-[#6b7090]"
                >QTY {{ item.quantity }} {{ item.unit }}
                <span v-if="item.mandatory">&middot; mandatory</span></span
              >
            </td>
            <VendorResponsesEntry
              :data="item.content"
              :category="prop.data.category"
              :quantity="item.quantity"
              :unit="item.unit"
            />
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <!-- Vendor Selection -->
    <div class="border-b border-slate-200">
      <VendorSelection :data="prop.data" />
    </div>
    <!-- Clarifications -->
    <div class="p-5 pb-5">
      <p class="text-[#6b7090] text-[13px] font-bold">CLARIFICATIONS</p>
      <br />
      <div v-if="!prop.data.clarification" class="text-[#6b7090] text-[12.5px]">
        <p>No clarification questions raised for this category yet.</p>
      </div>
      <div v-if="prop.data.clarification">
        <p class="text-[12.5px] font-[650]">
          SkyBridge Airlines: Please confirm whether the return sector is a
          same-day or next-day connection.
        </p>
        <p class="text-[12.5px] text-[#0d8f7a]">
          ↳ Same-day connection required; onward departure not before 20:00
          local time.
        </p>
      </div>
    </div>
  </div>
</template>
