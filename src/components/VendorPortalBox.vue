<script setup>
import { defineProps } from "vue";
import VendorPortalTable from "./VendorPortalTable.vue";
import VendorPortalCard from "./VendorPortalCard.vue";
const prop = defineProps({
  vendorName: String,
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
  <br>
  <div class="flex flex-col gap-5 ml-2">
    <VendorPortalCard />
    <VendorPortalTable :vendorName="prop.vendorName" />
  </div>
</template>
