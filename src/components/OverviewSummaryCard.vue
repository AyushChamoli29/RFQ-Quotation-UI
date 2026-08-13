<script setup>
import data from "@/data/mockData.json";
</script>

<template>
  <div class="flex flex-wrap gap-5">
    <div
      v-for="value in data.summary_cards"
      class="bg-white py-4 p-3 pl-5 h-25 w-75 rounded-lg flex flex-col justify-between outline outline-slate-200"
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
