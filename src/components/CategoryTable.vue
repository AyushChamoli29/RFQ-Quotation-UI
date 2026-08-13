<script setup>
import data from "@/data/mockData.json";
</script>

<template>
  <div class="px-5 bg-white shadow-sm shadow-slate-300 rounded-lg">
    <p class="text-xs tracking-wider text-slate-500 font-bold mt-5 mb-3">CATEGORIES AT A GLANCE</p>
    <table class="text-xs w-full mb-4">
      <thead>
        <tr class=" text-slate-500 text-[11px]">
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
          v-for="[key, value] in Object.entries(data.category_table.category)"
          class="border-t border-[#F4F5FA]"
        >
          <td class="p-3 pl-5 text-left text-[13px] font-bold">
            {{ key }}
          </td>
          <td class="p-3 text-left">{{ value.lines }}</td>
          <td class="p-3 text-left">{{ value.vendors_invited }}</td>
          <td class="p-3 text-left">{{ value.responses }}</td>
          <td class="p-3 text-left">{{ value.awarded_lines }}</td>
          <td ><span class="bg-[#F4F5FA] p-1 px-2 text-slate-500 font-bold text-[11px] rounded-lg">{{ value.status }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
