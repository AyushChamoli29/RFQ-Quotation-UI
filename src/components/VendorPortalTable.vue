<script setup>
import data from "@/data/mockData.json";
import { useRFQMainStore } from "@/store/RFQStoreMain";
import { defineProps, ref, computed, onMounted } from "vue";
const rfq = useRFQMainStore();
const prop = defineProps({
  vendorid: String,
});
const vendorType = (vendorid) => {
  for (const element of rfq.vendors) {
    if (element.id === vendorid) {
      return element.type;
    }
  }
};
const requirementLines = computed(() => {
  const vendor = rfq.vendors.find((v) => v.id === prop.vendorid);
  if (!vendor) return [];

  const category = rfq.categories.find(
    (c) => c.name.toLowerCase() === vendor.type.toLowerCase(),
  );
  if (!category) return [];

  return rfq.requirements.filter((line) => line.categoryId === category.id);
});
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 p-4">
    <p class="ml-3 mb-5 font-bold">{{ vendorType(prop.vendorid) }}</p>
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
        <tr v-for="line in requirementLines">
          <td class="py-4 pl-4 align-middle">
            <div class="font-bold">{{ line.name }}</div>
            <div class="text-[#6b7090] text-[11.5px] mt-1">
              {{ line.information }}
            </div>
          </td>
          <td class="font-mono py-4 align-middle">
            {{ line.quantity }} {{ line.unit }}
          </td>
          <td class="p-4 align-middle">
            <div
              v-if="rfq.rfqStatus === 'simulated'"
              class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
            >
              {{ rfq.workingQuotation[prop.vendorid][line.id].price }}
            </div>
            <div>
              <input
                v-if="rfq.rfqStatus === 'allocated'"
                class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
                type="number"
                v-model="rfq.vendorPortalTempObj[line.id].price"
              />
            </div>
          </td>
          <td class="p-4 align-middle">
            <div
              v-if="rfq.rfqStatus === 'simulated'"
              class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
            >
              {{ rfq.workingQuotation[prop.vendorid][line.id].tax }}
            </div>
            <div>
              <input
                v-if="rfq.rfqStatus === 'allocated'"
                class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
                type="number"
                v-model="rfq.vendorPortalTempObj[line.id].tax"
              />
            </div>
          </td>
          <td class="p-4 align-middle">
            <div>
              <select
                class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
                :class="{ disabled: rfq.rfqStatus === 'simulated' }"
              >
                <option value="Quoted">Quoted</option>
                <option value="Not available">Not available</option>
                <option value="Alternative offered">Alternative offered</option>
              </select>
            </div>
          </td>
          <td class="p-4 align-middle">
            <div
              v-if="rfq.rfqStatus === 'simulated'"
              class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
            >
              {{ rfq.workingQuotation[prop.vendorid][line.id].remark }}
            </div>
            <div>
              <input
                v-if="rfq.rfqStatus === 'allocated'"
                class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
                type="text"
                v-model="rfq.vendorPortalTempObj[line.id].remark"
              />
            </div>
          </td>
          <td class="p-4 align-middle">proposal_v1.pdf</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
