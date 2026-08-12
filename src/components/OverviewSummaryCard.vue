<script setup>
import data from "@/data/mockData.json";
</script>

<template>
  <div class="flex flex-wrap gap-5 mb-5">
    <div
      v-for="value in data.summary_cards"
      class="bg-white p-3 pl-5 h-23 w-70 flex flex-col justify-between shadow-sm shadow-slate-300"
    >
      <p class="text-slate-500 text-xs font-semibold">
        {{ value.title.toUpperCase() }}
      </p>
      <p class="font-semibold text-xl">{{ value.amount }}</p>
      <p class="font-bold text-xl" v-if="!value.amount">&mdash;</p>
      <p class="text-slate-500 text-xs">{{ value.msg }}</p>
    </div>
  </div>
</template>
