<script setup>
import { computed, defineProps } from "vue";
import VendorSelectionEntry from "./VendorSelectionEntry.vue";
import { useVendorStore } from "@/store/requirementsVendor.js";
const prop = defineProps({
  data: Object,
});
const vendorsStore = useVendorStore();
const vendor = computed(() => {
  const found = vendorsStore.currentVendors.find(
    (item) => item.type === prop.data.category,
  );
  return found ? found.VendorList : [];
});
</script>

<template>
  <div class="text-[#6b7090] text-[13px] font-bold px-5">
    VENDOR SELECTION FOR {{ prop.data.category.toUpperCase() }}
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
          v-for="item in prop.data.vendorsPrices"
          class="border-t border-slate-200"
        >
          <VendorSelectionEntry
            :data1="item"
            :data2="prop.data.defaultMargin"
            :data3="vendor"
          />
        </tr>
      </tbody>
    </table>
  </div>
  <br />
</template>
