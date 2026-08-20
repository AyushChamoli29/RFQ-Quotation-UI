<script setup>
import { ref } from "vue";
const search = ref("");
const category = ref("all categories");
const actor = ref("all actors");
</script>

<template>
  <div
    class="flex justify-start items-center gap-4 px-6 py-5 outline outline-slate-200 rounded-xl bg-white"
  >
    <div class="flex flex-col">
      <label for="searching" class="text-xs font-semibold mb-2">Search</label>
      <input
        type="text"
        id="searching"
        v-model="search"
        placeholder="Search actor, vendor, category, detail..."
        class="outline outline-slate-200 text-xs font-normal w-110 p-2 rounded-lg"
      />
    </div>
    <div class="flex flex-col">
      <label for="category" class="text-xs font-semibold mb-2">Category</label>
      <select
        id="category"
        v-model="category"
        class="text-xs font-normal outline outline-slate-200 p-2 rounded-lg"
      >
        <option value="all categories">All Categories</option>
        <option value="hotels">Hotels</option>
        <option value="flights">Flights</option>
        <option value="ground transportation">Ground Transportation</option>
        <option value="event management including AV">
          Event Management including AV
        </option>
        <option value="visa management">Visa Management</option>
        <option value="local liaison">Local Liaison</option>
      </select>
    </div>
    <div class="flex flex-col">
      <label for="actor" class="text-xs font-semibold mb-2">Actor</label>
      <select
        id="actor"
        v-model="actor"
        class="text-xs font-normal outline w-45 outline-slate-200 p-2 rounded-lg"
      >
        <option value="all actors">All Actors</option>
      </select>
    </div>
    <div class="flex flex-col">
      <label for="action" class="text-xs font-semibold mb-2">Action</label>
      <select
        id="action"
        class="text-xs font-normal outline w-45 outline-slate-200 p-2 rounded-lg"
      >
        <option value="all actions">All Actions</option>
      </select>
    </div>
    <div
      class="mt-6 outline outline-slate-200 p-2 px-3 text-[13px] rounded-lg font-bold"
    >
      Export CSV
    </div>
  </div>
  <div class="flex flex-col bg-white p-10 justify-center items-center gap-1">
    <span class="text-4xl">🗒️</span>
    <p class="text-lg font-bold mt-2">No activity recorded yet</p>
    <p class="text-[#6b7090]">
      Every allocation, dispatch, portal access, quote edit, award and export
      will appear here as it happens.
    </p>
  </div>
</template>
