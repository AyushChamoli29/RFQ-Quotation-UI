<script setup>
import { RouterLink } from "vue-router";
import { defineEmits } from "vue";
const emit = defineEmits(["show-vendor"]);
const showVendor = () => {
  emit("show-vendor");
};
</script>

<template>
  <div
    class="flex justify-between items-center p-5 px-7 bg-white rounded-xl outline outline-slate-200"
  >
    <div class="flex flex-col">
      <p class="text-[13px] text-[#6b7090] tracking-wider font-bold">
        COSTING VERSIONS
      </p>
      <div
        class="p-1 px-2 w-max rounded-lg text-[11px] font-bold bg-[#eef0f8] text-[#6b7090]"
      >
        No versions yet
      </div>
      <p class="text-xs font-normal text-[#b46a06] mt-1">
        ⚠ 24 line item(s) still have no awarded vendor and will be excluded.
      </p>
    </div>
    <div class="flex gap-2">
      <div
        class="py-2 px-4 flex justify-center items-center text-[13px] font-[650] text-[#3a3f58] w-max outline outline-slate-200 rounded-lg cursor-pointer hover:bg-slate-200"
      >
        Download costing (CSV)
      </div>
      <div
        class="flex justify-center items-center py-2 px-5 text-xs bg-[#4d3fc9] text-white font-bold tracking-wide w-max rounded-lg cursor-pointer"
      >
        Apply awarded rates to costing
      </div>
    </div>
  </div>
  <div
    class="flex flex-col h-47 gap-1 justify-center items-center bg-white rounded-xl outline outline-slate-200 p-5 px-7"
  >
    <span class="text-4xl">🧮</span>
    <p class="font-bold text-lg mt-2">No costing applied yet</p>
    <p class="text-slate-500">
      Award vendors in the
      <span class="text-indigo-800 font-bold text-xs" @click="showVendor"
        ><RouterLink to="vendorResponses">Vendor Responses</RouterLink></span
      >
      tab, then apply awarded rates to costing
    </p>
  </div>
</template>
