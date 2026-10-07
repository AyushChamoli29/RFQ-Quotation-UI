<script setup>
import AuditHistoryTable from "@/components/AuditHistoryTable.vue";
import { useHistoryStore } from "@/store/auditHistory";
import { useRFQMainStore } from "@/store/RFQStoreMain";
import { computed, ref } from "vue";
const historyStore = useHistoryStore();
const rfq = useRFQMainStore();
const search = ref("");
const category = ref("all categories");
const actor = ref("all actors");
const action = ref("all actions");
// this computes the unique actions available for dropdown 
const actionsOptions = computed(() => {
  let result = new Set();
  for (const element of historyStore.history) {
    result.add(element.action);
  }
  return [...result];
});
// here this computes the audit history on the basis of search and filter options
const filteredAuditHistory = computed(() => {
  return historyStore.history.filter((item) => {
    const searchMatch =
      search.value === "" ||
      item.actor.toLowerCase().includes(search.value.toLowerCase()) ||
      item.category.toLowerCase().includes(search.value.toLowerCase()) ||
      item.vendor.toLowerCase().includes(search.value.toLowerCase()) ||
      item.detail.toLowerCase().includes(search.value.toLowerCase());
    const categoryMatch =
      category.value === "all categories" ||
      item.category.toLowerCase() === category.value.toLowerCase();
    const actorMatch =
      actor.value === "all actors" ||
      item.actor.toLowerCase() === actor.value.toLowerCase();
    const actionMatch =
      action.value === "all actions" ||
      item.action.toLowerCase() === action.value.toLowerCase();
    return searchMatch && categoryMatch && actorMatch && actionMatch;
  });
});
</script>

<template>
  <!-- Search & Export -->
  <div
    class="flex justify-start items-center gap-4 px-6 py-5 outline outline-slate-200 rounded-xl bg-white"
  >
    <div class="flex flex-col">
      <label for="searching" class="text-xs font-semibold mb-2">Search</label>
      <input
        type="text"
        v-model="search"
        placeholder="Search actor, vendor, category, detail..."
        class="outline outline-slate-200 text-xs font-normal w-110 p-2 rounded-lg"
      />
    </div>
    <div class="flex flex-col">
      <label for="category" class="text-xs font-semibold mb-2">Category</label>
      <select
        v-model="category"
        class="text-xs font-normal outline outline-slate-200 p-2 rounded-lg"
      >
        <option value="all categories">All Categories</option>
        <option
          v-for="category in rfq.categories"
          :key="category.id"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="flex flex-col">
      <label for="actor" class="text-xs font-semibold mb-2">Actor</label>
      <select
        v-model="actor"
        class="text-xs font-normal outline w-45 outline-slate-200 p-2 rounded-lg"
      >
        <option value="all actors">All Actors</option>
        <option
          v-for="actor in rfq.actors"
          :key="actor.name"
          :value="actor.name"
        >
          {{ actor.name }}
        </option>
      </select>
    </div>
    <div class="flex flex-col">
      <label for="action" class="text-xs font-semibold mb-2">Action</label>
      <select
        v-model="action"
        class="text-xs font-normal outline w-45 outline-slate-200 p-2 rounded-lg"
      >
        <option value="all actions">All Actions</option>
        <option v-for="action in actionsOptions" :key="action" :value="action">
          {{ action }}
        </option>
      </select>
    </div>
    <div
      class="mt-6 outline outline-slate-200 p-2 px-3 text-[13px] rounded-lg font-bold hover:bg-slate-200 cursor-pointer"
    >
      Export CSV
    </div>
  </div>
  <!-- History OR No Activity -->
  <div
    v-if="!historyStore.history.length"
    class="flex flex-col bg-white p-10 justify-center items-center gap-1"
  >
    <span class="text-4xl">🗒️</span>
    <p class="text-lg font-bold mt-2">No activity recorded yet</p>
    <p class="text-[#6b7090]">
      Every allocation, dispatch, portal access, quote edit, award and export
      will appear here as it happens.
    </p>
  </div>
  <div v-if="historyStore.history.length">
    <AuditHistoryTable :history="filteredAuditHistory" />
  </div>
</template>
