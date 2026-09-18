<script setup>
import { useAwardedStore } from "@/store/awardedLines";
import { defineProps } from "vue";
const prop = defineProps({
  category: String,
  content: Object,
});
const awardedStore = useAwardedStore();
console.log(awardedStore.awardedLines);
</script>

<template>
  <div
    v-if="Object.keys(prop.content.data).length"
    class="bg-white py-5 px-3 rounded-xl"
  >
    <div class="font-bold ml-2">{{ prop.category }}</div>
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
            v-for="[key, value] in Object.entries(prop.content.data)"
            :key="key"
            class="border-t border-[#eef0f8]"
          >
            <td class="py-2">{{ value.vendor }}</td>
            <td>{{ key }}</td>
            <td class="font-mono">
              {{
                Number(value.rate).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                })
              }}
            </td>
            <td>{{ value.quantity }}</td>
            <td class="font-mono">
              {{
                Number(value.basePrice).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                })
              }}
            </td>
            <td>+{{ value.margin }}%</td>
            <td class="font-mono font-bold">
              {{
                Number(value.totalAmt).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                })
              }}
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
              {{
                Number(prop.content.base).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                })
              }}
            </td>
            <td class="text-[#0d8f7a] font-bold">
              {{
                Number(prop.content.profit).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                })
              }}
            </td>
            <td class="text-[#3f3ba6] font-bold">
              {{
                Number(prop.content.final).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                })
              }}
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
</template>
