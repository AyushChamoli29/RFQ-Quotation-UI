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
  <div class="bg-white p-3 pt-5 rounded-lg">
    <p class="ml-3 mb-5 font-bold">{{ vendorType(prop.vendorName) }}</p>
    <table class="w-full text-xs text-left">
      <thead
        class="text-[#6b7090] font-semibold text-[11.5px] border-b border-slate-200"
      >
        <tr>
          <th class="px-4 py-3">PARTICULAR</th>
          <th class="px-4 py-3">QTY</th>
          <th class="px-4 py-3">RATE (&#8377;)</th>
          <th class="px-4 py-3">TAX %</th>
          <th class="px-4 py-3">AVAILABILTY</th>
          <th class="px-4 py-3">REMARKS</th>
          <th class="px-4 py-3">ATTACHMENT</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200">
        <tr v-for="item in objNeeded(prop.vendorName).vendorsPrices">
          <td class="py-3 pl-2">
            <span class="font-bold">{{ item.requirementLine }}</span> <br />
            <span class="text-[#6b7090] text-[11.5px]">{{
              findDetail(item.requirementLine, vendorType(prop.vendorName))
            }}</span>
          </td>
          <td class="font-mono">{{ item.quantity }} {{ item.unit }}</td>
          <td>
            <div
              class="flex items-center border border-slate-200 rounded-lg p-2"
            >
              {{ rateFinder(prop.vendorName, item.content) }}
            </div>
          </td>
          <td>
            <div
              class="flex items-center border border-slate-200 rounded-lg p-2"
            >
              7
            </div>
          </td>
          <td>
            <div
              class="flex items-center border border-slate-200 rounded-lg p-2 text-[#6b7090]"
            >
              <select disabled>
                <option value="Quoted">Quoted</option>
              </select>
            </div>
          </td>
          <td>Standard group terms</td>
          <td>proposal_v1.pdf</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
