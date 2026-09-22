<script setup>
import data from "@/data/mockData.json";
import { defineProps } from "vue";
const prop = defineProps({
  vendorName: String,
});
const vendorType = (vendorName) => {
  for (const element of data.vendor_portal) {
    if (element.name === vendorName) {
      return element.type;
    }
  }
};
const objNeeded = (vendorName) => {
  return data.vendorPricing.find((item) => {
    return item.category.toLowerCase() === vendorType(vendorName).toLowerCase();
  });
};
const rateFinder = (name, tempArray) => {
  for (const element of tempArray) {
    if (element.name === name) {
      return element.information.unitPrice;
    }
  }
};
const findDetail = (lineName, category) => {
  for (const [key, value] of Object.entries(data.requirementTable)) {
    if (key.toLowerCase() === category.toLowerCase()) {
      for (const element of value.list) {
        if (element.room.toLowerCase() === lineName.toLowerCase()) {
          return element.details;
        }
      }
    }
  }
};
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 p-4">
    <p class="ml-3 mb-5 font-bold">{{ vendorType(prop.vendorName) }}</p>
    <table class="w-full text-xs">
      <thead
        class="text-[#6b7090] font-semibold text-[11.5px] border-b border-slate-200 text-left"
      >
        <tr>
          <th class="px-4 py-3 w-3/10">PARTICULAR</th>
          <th class="px-4 py-3 w-1/10">QTY</th>
          <th class="px-4 py-3 w-1.5/10">RATE (&#8377;)</th>
          <th class="px-4 py-3 w-1.5/10">TAX %</th>
          <th class="px-4 py-3 w-1.5/10">AVAILABILTY</th>
          <th class="px-4 py-3 w-1/10">REMARKS</th>
          <th class="px-4 py-3 w-1/10">ATTACHMENT</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200">
        <tr v-for="item in objNeeded(prop.vendorName).vendorsPrices">
          <td class="py-4 pl-4 align-middle">
            <div class="font-bold">{{ item.requirementLine }}</div>
            <div class="text-[#6b7090] text-[11.5px] mt-1">
              {{
                findDetail(item.requirementLine, vendorType(prop.vendorName))
              }}
            </div>
          </td>
          <td class="font-mono py-4 align-middle">
            {{ item.quantity }} {{ item.unit }}
          </td>
          <td class="p-4 align-middle">
            <div
              class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
            >
              {{ rateFinder(prop.vendorName, item.content) }}
            </div>
          </td>
          <td class="p-4 align-middle">
            <div
              class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
            >
              7
            </div>
          </td>
          <td class="p-4 align-middle">
            <div
              class="flex items-center border border-slate-200 rounded-lg p-2 text-[#6b7090] w-35"
            >
              <select disabled>
                <option value="Quoted">Quoted</option>
              </select>
            </div>
          </td>
          <td class="p-4 align-middle">
            <div
              class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
            >
              Standard group terms
            </div>
          </td>
          <td class="p-4 align-middle">proposal_v1.pdf</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
