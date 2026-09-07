<script setup>
import data from "@/data/mockData.json";
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import RequirementTableEntry from "./RequirementTableEntry.vue";
const router = useRouter();
const array = data.requirementTable;
const prop = defineProps({
  show: Boolean,
});
const emit = defineEmits(["allocate-vendors"]);
const currentDate = new Date().toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const currentTime = new Date().toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
const allocateVendors = () => {
  emit("allocate-vendors");
  router.push({ name: "vendorResponses" });
};
</script>

<template>
  <div class="bg-white py-5 rounded-xl">
    <div class="flex items-center justify-between px-4 mb-3">
      <div class="text-[13px] text-[#6b7090] tracking-wide font-bold px-3">
        REQUIREMENT LINE ITEMS & VENDOR ALLOCATION
      </div>
      <div
        v-if="!prop.show"
        class="bg-[#4d3fc9] text-white font-bold text-[13px] p-2 rounded-lg cursor-pointer"
        @click="allocateVendors"
      >
        Send RFQ to allocated vendors(12)
      </div>
      <div
        v-if="prop.show"
        class="text-[11px] bg-[#e1f6f1] text-[#0d8f7a] p-1 rounded-xl font-bold"
      >
        RFQ sent {{ currentDate }}, {{ currentTime }}
      </div>
    </div>
    <div
      v-for="[key, value] in Object.entries(array)"
      class="border-t border-slate-200 p-1"
    >
      <RequirementTableEntry :name="key" :value="value" />
    </div>
  </div>
</template>
