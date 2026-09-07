<script setup>
import data from "@/data/mockData.json";
const currentDate = new Date().toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const currentTime = new Date().toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
const content = [...data.auditHistory];
</script>

<template>
  <div class="bg-white p-1 rounded-xl">
    <table class="text-xs w-full text-left">
      <thead>
        <tr class="text-[#6b7090]">
          <th class="w-1/8 p-3">TIME</th>
          <th class="w-1/8 p-3">ACTOR</th>
          <th class="w-1/8 p-3">ROLE/COMPANY</th>
          <th class="w-1/8 p-3">ACTION</th>
          <th class="w-1/8 p-3">CATEGORY</th>
          <th class="w-1/8 p-3">VENDOR</th>
          <th class="w-2/8 p-3">DETAIL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in content" class="border-t border-slate-200">
          <td class="p-3">{{ currentDate }}, {{ currentTime }}</td>
          <td class="p-3">{{ item.actor }}</td>
          <td class="p-3 text-[#6b7090]">{{ item.role }}</td>
          <td class="p-3 font-bold">{{ item.action }}</td>
          <td class="p-3" v-if="item.category.length >= 1">
            {{ item.category }}
          </td>
          <td class="p-3" v-else>&mdash;</td>
          <td class="p-3" v-if="item.category.length >= 1">
            {{ item.vendor }}
          </td>
          <td class="p-3" v-else>&mdash;</td>
          <td class="p-3 text-[#3a3f58]">{{ item.detail }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
