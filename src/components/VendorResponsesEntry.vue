<script setup>
import Data from "@/data/mockData.json";
import { useVendorStore } from "@/store/requirementsVendor";
import { defineProps, computed } from "vue";
const vendorsStore = useVendorStore();
const prop = defineProps({
  data: Array,
  category: String,
  quantity: String,
  unit: String,
});
const content = computed(() => {
  const category = vendorsStore.currentVendors.find(
    (item) => item.type === prop.category,
  );
  if (!category) return [];
  const vendorNames = category.VendorList.map((id) => {
    const vendor = Data.vendor_portal.find((element) => {
      return element.id === id;
    });
    return vendor.name;
  });
  return prop.data.filter((item) => vendorNames.includes(item.name));
});
</script>

<template>
  <td
    v-for="(entry, index) in content"
    class="px-2"
    :class="{
      'bg-[#e1f6f1] border border-[#bfe9de]': index === 0,
      'bg-[#fbfaef] border border-slate-200': index === 1,
      'bg-white': entry.information.status !== 'submitted',
    }"
  >
    <div v-if="entry.information.status === 'submitted'">
      <span class="font-bold font-mono">{{
        (Number(entry.information.unitPrice) * prop.quantity).toLocaleString(
          "en-IN",
          {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
          },
        )
      }}</span>
      <br />
      <span class="text-[#6b7090]"
        ><span class="font-mono">{{
          Number(entry.information.unitPrice).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
          })
        }}</span
        >/{{ prop.unit }} &middot; tax 7%
        <span v-if="entry.information.attachment">&middot; 📎</span>
        <br />
        {{ entry.information.info ? "Standard group terms apply." : "" }}</span
      >
    </div>
    <div
      v-else-if="entry.information.status === 'awaiting'"
      class="text-[#9ba0c0] italic text-[13px]"
    >
      Awaiting
    </div>
    <div
      v-else-if="entry.information.status === 'declined'"
      class="text-[#9ba0c0] italic text-[13px]"
    >
      Declined
    </div>
  </td>
</template>
