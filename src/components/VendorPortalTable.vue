<script setup>
import data from "@/data/mockData.json";
import { useRFQMainStore } from "@/store/RFQStoreMain";
import { defineProps, ref, computed } from "vue";
const rfq = useRFQMainStore();
const prop = defineProps({
  vendorid: String,
});
const vendorType = (vendorid) => {
  for (const element of rfq.vendors) {
    if (element.id === vendorid) {
      return element.type;
    }
  }
};
const categoryid = computed(() => {
  let name;
  for (const element of rfq.vendors) {
    if (element.id === prop.vendorid) {
      name = element.type;
    }
  }
  for (const element of rfq.categories) {
    if (element.name === name) {
      return element.id;
    }
  }
});
const vendorFullObj = computed(() => {
  for (const element of rfq.allocation) {
    if (element.id === categoryid.value) {
      for (const item of element.vendorList) {
        if (item.vendorid === prop.vendorid) {
          return item;
        }
      }
    }
  }
});
const requirementLines = computed(() => {
  const vendor = rfq.vendors.find((v) => v.id === prop.vendorid);
  if (!vendor) return [];

  const category = rfq.categories.find(
    (c) => c.name.toLowerCase() === vendor.type.toLowerCase(),
  );
  if (!category) return [];

  return rfq.requirements.filter((line) => line.categoryId === category.id);
});
const clarificationQuestion = ref("");
const sendClarificationQuestion = () => {
  rfq.clarifications.push({
    cid: categoryid.value,
    vid: prop.vendorid,
    qid: `${categoryid.value}_${prop.vendorid}_${Date.now()}`,
    question: clarificationQuestion.value,
    answer: "",
    status: "pending",
  });
  alert("Question sent to the internal team.");
  clarificationQuestion.value = "";
};
const clarificationData = computed(() => {
  let result = [];
  for (const element of rfq.clarifications) {
    if (element.cid === categoryid.value && element.vid === prop.vendorid) {
      result.push(element);
    }
  }
  return result;
});
const vendorStatus = computed(() => {
  for (const element of rfq.allocation) {
    if (element.id === categoryid.value) {
      for (const item of element.vendorList) {
        if (item.vendorid === prop.vendorid) {
          return item.status;
        }
      }
    }
  }
});
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 py-4">
    <p class="ml-3 mb-5 font-bold">{{ vendorType(prop.vendorid) }}</p>
    <table class="w-full text-xs">
      <thead
        class="text-[#6b7090] font-semibold text-[11.5px] border-b border-slate-200 text-left"
      >
        <tr>
          <th class="px-4 py-3 w-3/10">PARTICULAR</th>
          <th class="px-4 py-3 w-1/10">QTY</th>
          <th class="px-4 py-3 w-1.5/10">RATE (&#8377;)</th>
          <th class="px-4 py-3 w-1.5/10">TAX %</th>
          <th class="px-4 py-3 w-1.5/10">AVAILABILTY</th>
          <th class="px-4 py-3 w-1/10">REMARKS</th>
          <th class="px-4 py-3 w-1/10">ATTACHMENT</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200">
        <tr v-for="line in requirementLines">
          <td class="py-4 pl-4 align-middle">
            <div class="font-bold">{{ line.name }}</div>
            <div class="text-[#6b7090] text-[11.5px] mt-1">
              {{ line.information }}
            </div>
          </td>
          <td class="font-mono py-4 align-middle">
            {{ line.quantity }} {{ line.unit }}
          </td>
          <td class="p-4 align-middle">
            <div
              v-if="rfq.rfqStatus === 'simulated'"
              class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
            >
              {{ rfq.workingQuotation[prop.vendorid][line.id].price }}
            </div>
            <div>
              <input
                v-if="rfq.rfqStatus === 'allocated'"
                class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
                type="number"
                :disabled="
                  vendorFullObj?.status === 'submitted' ||
                  vendorFullObj?.status === 'partially submitted'
                "
                v-model="rfq.vendorPortalTempObj[line.id].price"
              />
            </div>
          </td>
          <td class="p-4 align-middle">
            <div
              v-if="rfq.rfqStatus === 'simulated'"
              class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
            >
              {{ rfq.workingQuotation[prop.vendorid][line.id].tax }}
            </div>
            <div>
              <input
                v-if="rfq.rfqStatus === 'allocated'"
                class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
                type="number"
                :disabled="
                  vendorFullObj?.status === 'submitted' ||
                  vendorFullObj?.status === 'partially submitted'
                "
                v-model="rfq.vendorPortalTempObj[line.id].tax"
              />
            </div>
          </td>
          <td class="p-4 align-middle">
            <div>
              <select
                class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
                :disabled="
                  vendorFullObj?.status === 'submitted' ||
                  vendorFullObj?.status === 'partially submitted'
                "
              >
                <option value="Quoted">Quoted</option>
                <option value="Not available">Not available</option>
                <option value="Alternative offered">Alternative offered</option>
              </select>
            </div>
          </td>
          <td class="p-4 align-middle">
            <div
              v-if="rfq.rfqStatus === 'simulated'"
              class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
            >
              {{ rfq.workingQuotation[prop.vendorid][line.id].remark }}
            </div>
            <div>
              <input
                v-if="rfq.rfqStatus === 'allocated'"
                class="flex items-center border border-slate-200 rounded-lg p-2 w-35"
                type="text"
                :disabled="
                  vendorFullObj?.status === 'submitted' ||
                  vendorFullObj?.status === 'partially submitted'
                "
                v-model="rfq.vendorPortalTempObj[line.id].remark"
                placeholder="Optional"
              />
            </div>
          </td>
          <td class="p-4 align-middle">proposal_v1.pdf</td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="rfq.rfqStatus === 'allocated' && vendorStatus !== 'submitted'"
      class="flex flex-col gap-2 pt-4 border-t border-slate-200 pl-4"
    >
      <p class="text-xs font-bold text-[#3a3f58]">
        Ask a clarification question about {{ vendorType(prop.vendorid) }}
      </p>
      <div class="flex gap-5">
        <input
          type="text"
          class="rounded-lg p-2 border border-[#e3e5f0] text-xs w-100"
          placeholder="Type your question..."
          :disabled="
            vendorFullObj?.status === 'submitted' ||
            vendorFullObj?.status === 'partially submitted'
          "
          v-model="clarificationQuestion"
        />
        <button
          class="text-xs text-[#3a3f58] font-bold w-max border border-[#e3e5f0] hover:bg-[#ebecf7] py-1 px-2 rounded-lg cursor-pointer"
          @click="sendClarificationQuestion"
        >
          Send question
        </button>
      </div>
      <div
        v-if="
          vendorFullObj?.status !== 'submitted' &&
          vendorFullObj?.status !== 'partially submitted'
        "
      >
        <div
          v-for="(obj, index) in clarificationData"
          class="text-xs my-2"
          :class="{ 'border-t border-slate-200': index >= 1 }"
        >
          <p class="font-bold">You: {{ obj.question }}</p>
          <p v-if="obj.status === 'pending'" class="text-[#b46a06] italic">
            Awaiting reply
          </p>
          <p v-if="obj.status === 'answered'" class="text-[#0d8f7a]">
            ↳ {{ obj.answer }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
