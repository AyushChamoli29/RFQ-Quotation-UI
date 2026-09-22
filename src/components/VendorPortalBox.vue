<script setup>
import { defineProps } from "vue";
import VendorPortalTable from "./VendorPortalTable.vue";
import VendorPortalCard from "./VendorPortalCard.vue";
const prop = defineProps({
  vendorName: String,
});
const currentDate = new Date().toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const currentTime = new Date().toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
</script>

<template>
  <div
    class="bg-[#fff7e6] text-[#7a5300] border border-[#f3dda3] text-[12.5px] p-2 ml-2 rounded-lg"
  >
    🔒 <span class="font-bold">Confidential quotation request.</span> This link
    is unique to
    {{ prop.vendorName }}
    and must not be shared. You can see only the requirement scoped to your
    invitation.
  </div>
  <br />
  <div class="flex flex-col gap-5 ml-2">
    <VendorPortalCard />
    <VendorPortalTable :vendorName="prop.vendorName" />
    <div class="bg-white text-xs p-4 h-max flex flex-col gap-2">
      <p class="text-[#3a3f58] font-bold">General proposal / covering note</p>
      <textarea class="w-full h-20 border border-slate-200 py-2 px-4 rounded-lg">
Pleased to support this movement &mdash; happy to discuss further.</textarea
      >
      <p class="text-[#3a3f58] font-bold">
        Attach supporting proposal document
      </p>
      <span class="text-[#3a3f58] font-bold">&mdash;</span>
    </div>
    <div
      class="bg-white rounded-xl p-4 px-6 text-xs flex justify-between items-center"
    >
      <div class="text-[#6b7090]">
        Submitted on {{ currentDate }}, {{ currentTime }}
      </div>
      <div
        class="text-[#3a3f58] font-bold w-max border border-[#e3e5f0] hover:bg-[#ebecf7] py-3 px-4 rounded-lg"
      >
        Download Acknowledgement
      </div>
    </div>
  </div>
</template>
