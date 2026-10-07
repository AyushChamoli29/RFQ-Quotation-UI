<script setup>
import { RouterLink } from "vue-router";
import { computed } from "vue";
import VendorResponsesBox from "@/components/VendorResponsesBox.vue";
import { useRFQMainStore } from "@/store/RFQStoreMain";
const rfq = useRFQMainStore();
// this returns an array of all those categoryid in which more than or equal to 1 vendor is allocated
const categoryWithVendor = computed(() => {
  let result = [];
  for (const categoryObj of rfq.allocation) {
    if (categoryObj.vendorList.length >= 1) {
      result.push(categoryObj.id);
    }
  }
  return result;
});
</script>

<template>
  <div
    v-if="rfq.rfqStatus === 'draft'"
    class="text-sm h-47 w-full p-5 flex flex-col gap-3 justify-center items-center bg-white outline outline-slate-200 rounded-lg"
  >
    <span class="text-4xl">📭</span>
    <p class="font-bold text-lg">RFQ not yet sent</p>
    <p class="font-normal text-slate-500 text-base/1">
      Allocate vendors and send the RFQ from the
      <span class="text-indigo-800 text-[13px] font-semibold"
        ><RouterLink to="/requirements"
          >Requirements & Allocation</RouterLink
        ></span
      >
      tab to start collecting responses.
    </p>
  </div>
  <div
    v-if="rfq.rfqStatus !== 'draft'"
    v-for="categoryid in categoryWithVendor"
    class="bg-white rounded-xl h-max"
  >
    <VendorResponsesBox :categoryID="categoryid" />
  </div>
</template>
