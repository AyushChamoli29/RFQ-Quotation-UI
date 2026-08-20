<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
const flag = ref("overview");
const changeNavigate = (text) => {
  flag.value = text;
};
</script>

<template>
  <div
    class="flex flex-wrap gap-1 w-full bg-white text-slate-500 text-sm/6 font-semibold justify-start items-center mt-5 p-1 rounded-xl shadow-sm shadow-slate-300"
  >
    <RouterLink to="/overview">
      <div
        class="cursor-pointer p-2 px-4"
        @click="changeNavigate('overview')"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]':
            flag === 'overview',
        }"
      >
        Overview
      </div>
    </RouterLink>
    <RouterLink to="requirements"
      ><div
        class="cursor-pointer p-2 px-4"
        @click="changeNavigate('requirements')"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]':
            flag === 'requirements',
        }"
      >
        Requirements & Allocation
      </div></RouterLink
    >
    <RouterLink to="vendorResponses"
      ><div
        class="cursor-pointer p-2 px-4"
        @click="changeNavigate('vendor')"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]': flag === 'vendor',
        }"
      >
        Vendor Responses
      </div></RouterLink
    >
    <RouterLink to="costing"
      ><div
        class="cursor-pointer p-2 px-4"
        @click="changeNavigate('costing')"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]': flag === 'costing',
        }"
      >
        Costing
      </div></RouterLink
    >
    <RouterLink to="corporate"
      ><div
        class="cursor-pointer p-2 px-4"
        @click="changeNavigate('corporate')"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]':
            flag === 'corporate',
        }"
      >
        Corporate Quotation
      </div></RouterLink
    >
    <RouterLink to="auditHistory"
      ><div
        class="cursor-pointer p-2 px-4"
        @click="changeNavigate('audit history')"
        :class="{
          'text-[#3F3BA6] p-2 px-4 rounded-lg bg-[#F4F5FA]':
            flag === 'audit history',
        }"
      >
        Audit History
      </div></RouterLink
    >
  </div>
</template>
