<script setup>
import { defineProps } from "vue";
import VendorSelection from "./VendorSelection.vue";
const prop = defineProps({
  data: Object,
});
</script>

<template>
  <!-- Heading -->
  <div class="flex justify-between px-5 py-4">
    <div class="text-[#6b7090] text-[13px] font-bold">
      {{ prop.data.name.toUpperCase() }} &mdash; QUOTATION COMPARISON
    </div>
    <div class="flex gap-3 text-xs">
      <div
        v-for="item in prop.data.quotationComparison.vendors"
        class="bg-[#e1f6f1] text-[#0d8f7a] text-[11px] font-bold p-1 px-2 rounded-4xl h-max"
        :class="{
          'bg-[#fdf1de] text-[#b46a06]': item.type === 'partially submitted',
          'bg-[#fbe6e8] text-[#c02d3c]': item.type === 'declined',
        }"
      >
        {{ item.name }}: <span>{{ item.type }}</span> {{ " "
        }}<span v-if="item.time !== 'on time'">{{ item.time }}</span>
      </div>
    </div>
  </div>
  <!-- Table -->
  <div>
    <table class="w-full border-t border-b border-slate-200">
      <thead>
        <tr class="text-[#6b7090] text-[11px] text-left">
          <th class="p-2">PARTICULAR</th>
          <th
            v-for="item in prop.data.quotationComparison.vendors"
            class="px-2"
          >
            {{ item.name.toUpperCase() }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in prop.data.quotationComparison.tableData.data"
          class="text-left text-xs border-t border-slate-200"
        >
          <td class="py-5 px-2">
            <span class="font-bold">{{ item.name }}</span> <br />
            <span class="text-[#6b7090]"
              >QTY {{ item.quantity }} {{ item.unit }}
              <span v-if="item.mandatory">&middot; mandatory</span></span
            >
          </td>
          <td
            v-for="entry in item.quotations"
            class="px-2"
            :class="{
              'bg-[#e1f6f1] border border-[#bfe9de]': entry.color === 'green',
              'bg-[#fbfaef] border border-slate-200': entry.color === 'yellow',
            }"
          >
            <div v-if="entry.status === 'submitted'">
              <span class="font-bold font-mono">₹{{ entry.total }}</span>
              <br />
              <span class="text-[#6b7090]"
                ><span class="font-mono">₹{{ entry.unitPrice }}</span
                >/{{ item.unit }} &middot; tax {{ entry.tax }}%
                <span v-if="entry.attachment">&middot; 📎</span>
                <br />
                {{ entry.info ? "Standard group terms apply." : "" }}</span
              >
            </div>
            <div
              v-else-if="entry.status === 'awaiting'"
              class="text-[#9ba0c0] italic text-[13px]"
            >
              Awaiting
            </div>
            <div
              v-else-if="entry.status === 'declined'"
              class="text-[#9ba0c0] italic text-[13px]"
            >
              Declined
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <br />
  <!-- Vendor Selection -->
  <div class="border-b border-slate-200">
    <VendorSelection :data="prop.data" />
  </div>
  <!-- Clarifications -->
  <div class="p-5 pb-5">
    <p class="text-[#6b7090] text-[13px] font-bold">CLARIFICATIONS</p>
    <br />
    <div v-if="!prop.data.clarifications" class="text-[#6b7090] text-[12.5px]">
      <p>No clarification questions raised for this category yet.</p>
    </div>
    <div v-if="prop.data.clarifications">
      <p class="text-[12.5px] font-[650]">
        SkyBridge Airlines: Please confirm whether the return sector is a
        same-day or next-day connection.
      </p>
      <p class="text-[12.5px] text-[#0d8f7a]">
        ↳ Same-day connection required; onward departure not before 20:00 local
        time.
      </p>
    </div>
  </div>
</template>
