<script setup>
import { computed, defineProps, ref, watch } from "vue";
import Data from "@/data/mockData.json";
const prop = defineProps({
  data1: Object,
  data2: String,
  data3: Array,
});
const vendorsName = computed(() => {
  const result = [];
  for (const obj of prop.data3) {
    for (const vendor of Data.vendor_portal) {
      if (vendor.id === obj.id) {
        result.push({ name: vendor.name, simulated: obj.simulated });
      }
    }
  }
  return result;
});
const vendors = computed(() => {
  return prop.data1.content.filter((item) => {
    for (const element of vendorsName.value) {
      if (
        element.name.toLowerCase() === item.name.toLowerCase() &&
        element.simulated &&
        item.information.status === "submitted"
      ) {
        return element.name;
      }
    }
  });
});
const award = ref("No award");
const margin = ref(0);
watch(
  () => prop.data2,
  (newMargin) => {
    margin.value = Number(newMargin) || 0;
  },
  { immediate: true },
);
const base = computed(() => {
  for (const element of prop.data1.content) {
    if (award.value.toLowerCase() === element.name.toLowerCase()) {
      return Math.round(
        Number(element.information.unitPrice) *
          Number(prop.data1.quantity) *
          1.07,
      );
    }
  }
  return 0;
});
const markup = computed(() => {
  return Math.round((base.value * margin.value) / 100);
});
const sellingTotal = computed(() => {
  return base.value + markup.value;
});
const baseCurrency = computed(() => {
  return base.value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
});
const markupCurrency = computed(() => {
  return markup.value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
});
const sellingTotalCurrency = computed(() => {
  return sellingTotal.value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
});
</script>

<template>
  <td class="py-4 px-8">{{ data1.requirementLine }}</td>
  <td>
    <select
      class="outline outline-slate-200 rounded-sm w-8/10 text-[12.5px] p-2"
      v-model="award"
    >
      <option value="No award">No award</option>
      <option v-for="item in vendors" :value="item.name">
        {{ item.name }}
      </option>
    </select>
    <!-- <div v-if="vendors.length > 0" class="text-[#b46a06]">No quotes yet</div> -->
  </td>
  <td>
    <input
      type="number"
      min="0"
      step="0.5"
      class="outline outline-slate-200 rounded-sm w-8/10 text-[12.5px] p-2"
      v-model="margin"
    />
  </td>
  <td>{{ base > 0 ? baseCurrency : "-" }}</td>
  <td>{{ markup > 0 ? markupCurrency : "-" }}</td>
  <td class="font-bold">
    {{ sellingTotal > 0 ? sellingTotalCurrency : "-" }}
  </td>
</template>
