<script setup>
import { computed, defineProps, ref } from "vue";
const prop = defineProps({
  data1: Object,
  data2: String,
});
const data1 = { ...prop.data1 };
const vendors = data1.quotations.filter((item) => {
  if (item.status === "submitted") {
    return item.vendorName;
  }
});
const award = ref("No award");
const margin = ref(Number(prop.data2) || 0);
const base = computed(() => {
  for (const element of data1.quotations) {
    if (award.value === element.vendorName) {
      return Number(element.total);
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
  <td class="py-4 px-8">{{ data1.name }}</td>
  <td>
    <select
      class="outline outline-slate-200 rounded-sm w-8/10 text-[12.5px] p-2"
      v-model="award"
    >
      <option value="No award">No award</option>
      <option v-for="item in vendors" :value="item.vendorName">
        {{ item.vendorName }}
      </option>
    </select>
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
