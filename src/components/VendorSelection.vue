<script setup>
import { defineProps } from "vue";
import VendorSelectionEntry from "./VendorSelectionEntry.vue";
const prop = defineProps({
  data: Object,
});
</script>

<template>
  <div class="text-[#6b7090] text-[13px] font-bold px-5">
    VENDOR SELECTION FOR {{ prop.data.name.toUpperCase() }}
  </div>
  <br />
  <div>
    <table class="w-full text-left">
      <thead>
        <tr class="text-[#6b7090] text-[11px]">
          <th class="px-8 pb-2">PARTICULAR</th>
          <th>AWARD TO</th>
          <th>MARGIN %</th>
          <th>BASE</th>
          <th>MARKUP</th>
          <th>SELLING TOTAL</th>
        </tr>
      </thead>
      <tbody class="text-[13px]">
        <tr
          v-for="item in prop.data.quotationComparison.tableData.data"
          class="border-t border-slate-200 "
        >
          <VendorSelectionEntry
            :data1="item"
            :data2="prop.data.quotationComparison.vendors"
            :data3="prop.data.margin"
          />
        </tr>
      </tbody>
    </table>
  </div>
  <br />
</template>
