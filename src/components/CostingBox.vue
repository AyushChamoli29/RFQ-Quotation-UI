<script setup>
import { useRFQMainStore } from "@/store/RFQStoreMain";
import { defineProps } from "vue";
const prop = defineProps({
  categoryObj: Object,
});
const rfq = useRFQMainStore();
// this function formats the given number into the currency format
function formatCurrency(number) {
  return Number(number).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
}
</script>

<template>
  <div v-if="prop.categoryObj?.lines?.length > 0">
    <div class="font-bold ml-2">
      {{ rfq.categoryName(prop.categoryObj.categoryID) }}
    </div>
    <div>
      <table class="w-full">
        <thead class="text-xs text-[#6b7090] font-bold text-left">
          <tr>
            <th class="w-2/9 py-2 pt-3">VENDOR</th>
            <th class="w-2/9">PARTICULAR</th>
            <th class="w-1/9">RATE</th>
            <th class="w-1/9">QTY</th>
            <th class="w-1/9">BASE PRICE</th>
            <th class="w-1/9">MARGIN</th>
            <th class="w-1/9">TOTAL AMT</th>
          </tr>
        </thead>
        <tbody class="text-[13px]">
          <tr
            v-for="element in prop.categoryObj?.lines || []"
            :key="element.particular + element.vendor"
            class="border-t border-[#eef0f8]"
          >
            <td class="py-2">{{ element.vendor }}</td>
            <td>{{ element.particular }}</td>
            <td class="font-mono">
              {{ formatCurrency(element.rate) }}
            </td>
            <td>{{ element.quantity }}</td>
            <td class="font-mono">
              {{ formatCurrency(element.base) }}
            </td>
            <td>+{{ element.margin }}%</td>
            <td class="font-mono font-bold">
              {{ formatCurrency(element.total) }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="text-[13px]">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="font-bold">
              {{ formatCurrency(prop.categoryObj.base) }}
            </td>
            <td class="text-[#0d8f7a] font-bold">
              {{ formatCurrency(prop.categoryObj.profit) }}
            </td>
            <td class="text-[#3f3ba6] font-bold">
              {{ formatCurrency(prop.categoryObj.total) }}
            </td>
          </tr>
          <tr class="text-[#6b7090] text-[11px] font-mono">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Base</td>
            <td>Profit</td>
            <td>Final</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>

  <div v-else class="text-sm text-gray-500 p-3">
    No awarded lines in this category
  </div>
</template>
