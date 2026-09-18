<script setup>
import { computed, defineProps, ref, watch, onMounted } from "vue";
import Data from "@/data/mockData.json";
import { useAwardedStore } from "@/store/awardedLines";
const awardedStore = useAwardedStore();
const prop = defineProps({
  data1: Object,
  data2: String,
  data3: Array,
  category: String,
});
onMounted(() => {
  const categoryData = awardedStore.awardedLines[prop.category];

  if (categoryData && categoryData.data[prop.data1.requirementLine]) {
    award.value =
      categoryData.data[prop.data1.requirementLine].vendor || "No award";

    margin.value = categoryData.data[prop.data1.requirementLine].margin || 0;
  }
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
      return vendorsName.value.some((element) => {
        return (
          element.name.toLowerCase() === item.name.toLowerCase() &&
          element.simulated &&
          item.information.status === "submitted"
        );
      });
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
  return Math.round(Number((base.value * margin.value) / 100));
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
const rate = computed(() => {
  for (const element of prop.data1.content) {
    if (element.name.toLowerCase() === award.value.toLowerCase()) {
      return element.information.unitPrice;
    }
  }
});
const addToCosting = () => {
  for (const [key, value] of Object.entries(awardedStore.awardedLines)) {
    if (key === prop.category) {
      const obj = {
        [prop.data1.requirementLine]: {
          vendor: award.value,
          quantity: prop.data1.quantity,
          basePrice: base.value,
          margin: margin.value,
          Markup: markup.value,
          totalAmt: sellingTotal.value,
          rate: rate.value,
        },
      };
      value.data = { ...value.data, ...obj };
      let totalBase = ref(0);
      let totalProfit = ref(0);
      let totalFinal = ref(0);
      for (const [key1, value1] of Object.entries(value.data)) {
        totalBase.value += value1.basePrice;
        totalProfit.value += value1.Markup;
        totalFinal.value += value1.totalAmt;
      }
      value.base = totalBase.value;
      value.profit = totalProfit.value;
      value.final = totalFinal.value;
    }
  }
  if (!awardedStore.awarded.includes(prop.data1.requirementLine)) {
    awardedStore.awarded.push(prop.data1.requirementLine);
  }
};
</script>

<template>
  <td class="py-4 px-8">{{ data1.requirementLine }}</td>
  <td>
    <select
      class="outline outline-slate-200 rounded-sm w-8/10 text-[12.5px] p-2"
      v-model="award"
      @change="addToCosting"
    >
      <option value="No award">No award</option>
      <option v-for="item in vendors" :value="item.name">
        {{ item.name }}
      </option>
    </select>
    <div v-if="vendors.length === 0" class="text-[#b46a06] text-[11px] m-1">
      No quotes yet
    </div>
  </td>
  <td>
    <input
      type="number"
      min="0"
      step="0.5"
      class="outline outline-slate-200 rounded-sm w-8/10 text-[12.5px] p-2"
      v-model="margin"
      @change="addToCosting"
    />
  </td>
  <td>{{ base > 0 ? baseCurrency : "-" }}</td>
  <td>{{ markup > 0 ? markupCurrency : "-" }}</td>
  <td class="font-bold">
    {{ sellingTotal > 0 ? sellingTotalCurrency : "-" }}
  </td>
</template>
