<script setup>
import data from "@/data/mockData.json";
</script>

<template>
  <div class="px-5 shadow-sm shadow-slate-300">
    <table class="text-xs w-full">
      <thead>
        <p class="text-sm text-slate-500 font-bold">CATEGORIES AT A GLANCE</p>
        <tr class="border border-amber-50 text-slate-500">
          <th class="p-3 text-left">CATEGORY</th>
          <th class="p-3 text-left">LINES</th>
          <th class="p-3 text-left">VENDORS INVITED</th>
          <th class="p-3 text-left">RESPONSES</th>
          <th class="p-3 text-left">AWARDED LINES</th>
          <th class="p-3 text-left">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border border-amber-50"
          v-for="[key, value] in Object.entries(data.category_table.category)"
        >
          <td class="p-3 pl-5 text-left text-[13px] font-bold">
            {{ key }}
          </td>
          <td class="p-3 text-left">{{ value.lines }}</td>
          <td class="p-3 text-left">{{ value.vendors_invited }}</td>
          <td class="p-3 text-left">{{ value.responses }}</td>
          <td class="p-3 text-left">{{ value.awarded_lines }}</td>
          <td class="p-3 text-left text-slate-500">{{ value.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
