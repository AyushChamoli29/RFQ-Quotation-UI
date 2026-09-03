<script setup>
import { computed, defineProps, ref } from "vue";
const prop = defineProps({
  data1: Object,
  data2: Array,
  data3: String,
});
const data1 = { ...prop.data1 };
const data2 = [...prop.data2];
const award = ref("No award");
const margin = ref(Number(prop.data3) || 0);
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
</script>

<template>
  <td class="py-4 px-8">{{ data1.name }}</td>
  <td>
    <select
      class="outline outline-slate-200 rounded-sm w-8/10 text-[12.5px] p-2"
      v-model="award"
    >
      <option value="No award">No award</option>
      <option v-for="item in data2" :value="item.name">{{ item.name }}</option>
    </select>
  </td>
  <td>
    <input
      type="number"
      min="0"
      class="outline outline-slate-200 rounded-sm w-8/10 text-[12.5px] p-2"
      v-model="margin"
    />
  </td>
  <td>{{ base || " - " }}</td>
  <td>{{ markup || " - " }}</td>
  <td class="font-bold">{{ sellingTotal || " - " }}</td>
</template>
