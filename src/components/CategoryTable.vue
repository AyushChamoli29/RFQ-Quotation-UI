<script setup>
import { ref } from "vue";
import data from "@/data/mockData.json";
import { useFlagsStore } from "@/store/flag";
import { useVendorStore } from "@/store/requirementsVendor";
import { useAwardedStore } from "@/store/awardedLines";
const flags = useFlagsStore();
const vendorsStore = useVendorStore();
const awardedStore = useAwardedStore();
const getVendorCount = (category) => {
  for (const element of vendorsStore.currentVendors) {
    if (element.type === category) {
      return element.VendorList.length;
    }
  }
  return 0;
};
const getAwardedCount = (category) => {
  for (const [key, value] of Object.entries(awardedStore.awardedLines)) {
    if (key === category) {
      return Object.keys(value.data).length;
    }
  }
  return 0;
};
const status = (progress, awarded, total) => {
  let msg = ref("");
  if (progress === 1) {
    msg.value = "Not sent";
  } else if (progress === 2) {
    msg.value = "Awaiting response";
  } else if (awarded === total) {
    msg.value = "Fully awarded";
  } else {
    msg.value = "Under evaluation";
  }
  return msg;
};
</script>

<template>
  <div class="px-5 bg-white shadow-sm shadow-slate-300 rounded-lg">
    <p class="text-xs tracking-wider text-slate-500 font-bold mt-5 mb-3">
      CATEGORIES AT A GLANCE
    </p>
    <table class="text-xs w-full mb-4">
      <thead>
        <tr class="text-slate-500 text-[11px]">
          <th class="px-3 py-2 text-left">CATEGORY</th>
          <th class="px-3 py-2 text-left">LINES</th>
          <th class="px-3 py-2 text-left">VENDORS INVITED</th>
          <th class="px-3 py-2 text-left">RESPONSES</th>
          <th class="px-3 py-2 text-left">AWARDED LINES</th>
          <th class="px-3 py-2 text-left">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="[category, lines] in Object.entries(data.category_table)"
          class="border-t border-slate-200"
        >
          <td class="px-3 py-3 font-bold">{{ category }}</td>
          <td class="px-3 py-3">{{ lines }}</td>
          <td class="px-3 py-3">{{ getVendorCount(category) }}</td>
          <td class="px-3 py-3 font-mono">
            {{
              flags.progress >= 3
                ? getVendorCount(category) + "/" + getVendorCount(category)
                : "0/" + getVendorCount(category)
            }}
          </td>
          <td class="px-3 py-2 font-mono">
            {{
              flags.progress >= 3
                ? getAwardedCount(category) + "/" + lines
                : "0/" + lines
            }}
          </td>
          <td>
            <div
              class="w-max h-max px-2 py-1 rounded-2xl font-bold text-[11px]"
              :class="{
                'bg-[#eef0f8] text-[#6b7090]': flags.progress === 1,
                'bg-[#fdf1de] text-[#b46a06]': flags.progress === 2,
                'bg-[#e1f6f1] text-[#0d8f7a]':
                  getAwardedCount(category) === lines,
                'bg-[#eeecfb] text-[#3f3ba6]':
                  flags.progress >= 3 && getAwardedCount(category) !== lines,
              }"
            >
              {{ status(flags.progress, getAwardedCount(category), lines) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
