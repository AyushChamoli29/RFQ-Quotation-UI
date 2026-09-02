<script setup>
import { RouterLink, useRoute } from "vue-router";
import { defineProps } from "vue";
const route = useRoute();
const prop = defineProps({
  show: Boolean,
});
</script>

<template>
  <div
    class="flex flex-wrap gap-1 w-full bg-white text-slate-500 text-sm/6 font-semibold justify-start items-center mt-5 p-1 rounded-xl shadow-sm shadow-slate-300"
  >
    <RouterLink to="/overview">
      <div
        class="cursor-pointer p-2 px-4"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]':
            route.name === 'overview',
        }"
      >
        Overview
      </div>
    </RouterLink>
    <RouterLink to="/requirements"
      ><div
        class="cursor-pointer p-2 px-4"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]':
            route.name === 'requirements',
        }"
      >
        Requirements & Allocation
      </div></RouterLink
    >
    <RouterLink to="/vendorResponses"
      ><div
        class="cursor-pointer p-2 px-4"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]':
            route.name === 'vendorResponses',
        }"
      >
        Vendor Responses
      </div></RouterLink
    >
    <RouterLink to="/costing"
      ><div
        class="cursor-pointer p-2 px-4"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]':
            route.name === 'costing',
        }"
      >
        Costing
      </div></RouterLink
    >
    <RouterLink to="/corporate"
      ><div
        class="cursor-pointer p-2 px-4"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]':
            route.name === 'corporate',
        }"
      >
        Corporate Quotation
      </div></RouterLink
    >
    <RouterLink to="/auditHistory"
      ><div
        class="cursor-pointer p-2 px-4"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]':
            route.name === 'auditHistory',
        }"
      >
        Audit History
        <span
          v-if="prop.show"
          class="text-white text-[11px] font-bold bg-slate-400 rounded-2xl px-2"
          >27</span
        >
      </div></RouterLink
    >
  </div>
</template>
