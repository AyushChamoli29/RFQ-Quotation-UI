<script setup>
import RequirementTable from "@/components/RequirementTable.vue";
import { useRFQMainStore } from "@/store/RFQStoreMain";
import { watch } from "vue";
// import { useRFQStore } from "@/store/RFQStore";
// const rfq = useRFQStore();
const rfq = useRFQMainStore();
</script>

<template>
  <!-- Heading box -->
  <div
    class="p-5 gap-80 flex justify-between items-center bg-white rounded-xl oultine outline-slate-300"
  >
    <div class="w-3/5">
      <p class="text-[13px] tracking-wider font-bold text-[#6b7090] mb-3">
        RFQ HEADER
      </p>
      <div class="flex gap-5">
        <div
          class="flex text-[11px] w-1/3 justify-between mr-2 py-2 border-b border-dashed border-slate-300"
        >
          <label class="text-[#6b7090]">RFQ number</label>
          <p class="tracking-wider font-mono font-black">
            {{ rfq.rfqDetails.rfq_no }}
          </p>
        </div>
        <div
          class="flex text-xs w-1/3 py-1 mr-2 border-b border-dashed border-slate-300"
        >
          <label class="text-[#6b7090]">Group</label>
          <p class="font-bold">{{ rfq.rfqDetails.mice_no }}</p>
        </div>
        <div class="flex text-xs w-1/3 justify-between">
          <label class="text-[#6b7090]">Query type</label>
          <p class="font-bold">Package</p>
        </div>
      </div>
    </div>
    <div class="w-1/5 text-xs">
      <label for="date" class="font-[650]">RFQ response deadline</label>
      <input
        type="datetime-local"
        id="date"
        v-model="rfq.rfqDeadline"
        class="w-full outline outline-slate-300 p-2 mt-1 rounded-lg"
      />
    </div>
    <!-- Requirement Data -->
  </div>
  <RequirementTable />
</template>
