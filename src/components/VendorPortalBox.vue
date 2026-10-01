<script setup>
import { defineProps, ref, onMounted, watch } from "vue";
import { useRFQMainStore } from "@/store/RFQStoreMain.js";
import VendorPortalTable from "./VendorPortalTable.vue";
import VendorPortalCard from "./VendorPortalCard.vue";
const rfq = useRFQMainStore();
const prop = defineProps({
  vendorid: String,
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
function getvendorName(vid) {
  for (const element of rfq.vendors) {
    if (vid !== "select a vendor" && vid === element.id) {
      return element.name;
    }
  }
}
console.log(rfq.vendorPortalTempObj);
watch(
  () => prop.vendorid,
  () => {
    const data = rfq.workingQuotation[prop.vendorid];

    if (data) {
      rfq.vendorPortalTempObj = { ...data };

      for (const lineId in data) {
        if (!rfq.vendorPortalTempObj[lineId]) {
          rfq.vendorPortalTempObj[lineId] = {
            price: null,
            tax: 7,
            remark: "",
          };
        }
      }
    }
  },
  { immediate: true },
);
const submitQuotation = () => {
  // save data
  rfq.workingQuotation[prop.vendorid] = {
    ...rfq.vendorPortalTempObj,
  };

  //  update vendor status
  for (const category of rfq.allocation) {
    const vendor = category.vendorList.find(
      (v) => v.vendorid === prop.vendorid,
    );

    if (vendor) {
      vendor.status = "submitted";
    }
  }

  // reset temp
  const newTemp = {};
  for (const lineId in rfq.workingQuotation[prop.vendorid]) {
    newTemp[lineId] = { price: null, tax: 7, remark: "" };
  }
  rfq.vendorPortalTempObj = newTemp;

  alert("Quotation is submitted");
};
</script>

<template>
  <div
    class="bg-[#fff7e6] text-[#7a5300] border border-[#f3dda3] text-[12.5px] p-2 ml-2 rounded-lg"
  >
    🔒 <span class="font-bold">Confidential quotation request.</span> This link
    is unique to
    {{ getvendorName(prop.vendorid) }}
    and must not be shared. You can see only the requirement scoped to your
    invitation.
  </div>
  <br />
  <div class="flex flex-col gap-5 ml-2">
    <VendorPortalCard />
    <VendorPortalTable :vendorid="prop.vendorid" />
    <div class="bg-white text-xs p-4 h-max flex flex-col gap-2">
      <p class="text-[#3a3f58] font-bold">General proposal / covering note</p>
      <textarea
        class="w-full h-20 border border-slate-200 py-2 px-4 rounded-lg"
      >
Pleased to support this movement &mdash; happy to discuss further.</textarea
      >
      <p class="text-[#3a3f58] font-bold">
        Attach supporting proposal document
      </p>
      <span class="text-[#3a3f58] font-bold">&mdash;</span>
    </div>
    <div
      v-if="rfq.rfqStatus === 'simulated'"
      class="bg-white rounded-xl p-4 px-6 text-xs flex justify-between items-center"
    >
      <div class="text-[#6b7090]">
        Submitted on {{ currentDate }}, {{ currentTime }}
      </div>
      <div
        class="text-[#3a3f58] font-bold w-max border border-[#e3e5f0] hover:bg-[#ebecf7] py-3 px-4 rounded-lg cursor-pointer"
      >
        Download Acknowledgement
      </div>
    </div>
    <div
      v-if="rfq.rfqStatus === 'allocated'"
      class="bg-white rounded-xl p-4 px-6 text-xs flex justify-between items-center"
    >
      <div class="text-[#6b7090]">
        Save as draft any time &mdash; submitting locks your quotation for this
        RFQ.
      </div>
      <div
        class="text-[#3a3f58] font-bold w-max border border-[#e3e5f0] hover:bg-[#ebecf7] py-3 px-4 rounded-lg cursor-pointer"
      >
        Save draft
      </div>
      <div
        class="py-3 px-4 rounded-lg font-bold text-white bg-[#4d3fc9] cursor-pointer"
        @click="submitQuotation"
      >
        Submit quotation
      </div>
    </div>
  </div>
</template>
