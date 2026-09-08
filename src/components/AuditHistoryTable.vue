<script setup>
import { useHistoryStore } from "@/store/auditHistory";
const historyStore = useHistoryStore();
</script>

<template>
  <div class="bg-white p-1 rounded-xl">
    <table class="text-[13px] w-full text-left">
      <thead>
        <tr class="text-[#6b7090]">
          <th class="w-2/13 p-2">TIME</th>
          <th class="w-1/13 p-2">ACTOR</th>
          <th class="w-2/13 p-2">ROLE/COMPANY</th>
          <th class="w-2/13 p-2">ACTION</th>
          <th class="w-1/13 p-2">CATEGORY</th>
          <th class="w-2/13 p-2">VENDOR</th>
          <th class="w-3/13 p-2">DETAIL</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in historyStore.history"
          class="border-t border-slate-200"
        >
          <td class="p-2 font-mono tracking-wider">
            {{ item.time }}
          </td>
          <td class="p-2">{{ item.actor }}</td>
          <td class="p-2 text-[#6b7090]">{{ item.roleOrCompany }}</td>
          <td class="p-2 font-bold">{{ item.action }}</td>
          <td class="p-2">
            {{ item.category || `&mdash;` }}
          </td>
          <td class="p-2">
            {{ item.vendor || `&mdash;` }}
          </td>
          <td class="p-2 text-[#3a3f58]">{{ item.detail }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
