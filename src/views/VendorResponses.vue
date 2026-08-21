<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div
    class="text-sm h-47 w-full p-5 flex flex-col gap-3 justify-center items-center bg-white outline outline-slate-200 rounded-lg"
  >
    <span class="text-4xl">📭</span>
    <p class="font-bold text-lg">RFQ not yet sent</p>
    <p class="font-normal text-slate-500 text-base/1">
      Allocate vendors and send the RFQ from the
      <span class="text-indigo-800 text-[13px] font-semibold"
        ><RouterLink to="/requirements"
          >Requirements & Allocation</RouterLink
        ></span
      >
      tab to start collecting responses.
    </p>
  </div>
</template>
