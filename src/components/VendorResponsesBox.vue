<script setup>
import { computed, defineProps, ref } from "vue";
import VendorSelection from "./VendorSelection.vue";
import { useRFQMainStore } from "@/store/RFQStoreMain.js";
import { useHistoryStore } from "@/store/auditHistory.js";
const rfq = useRFQMainStore();
const historyStore = useHistoryStore();
const prop = defineProps({
  categoryID: String,
});
// this returns an array for this specific category in which each element is an object which contains the information of the vendor allocated for this category. The information includes vendor id, vendor name and vendor status
const vendorsToBeDisplayed = computed(() => {
  let categoryObj = rfq.allocation.find((obj) => obj.id === prop.categoryID);
  return categoryObj.vendorList.map((item) => {
    for (const vendorObj of rfq.vendors) {
      if (vendorObj.id === item.vendorid) {
        return {
          id: item.vendorid,
          name: vendorObj.name,
          status: item.status,
        };
      }
    }
  });
});
// this returns the requirement lines for this specific category id
const requirements = computed(() => {
  let result = [];
  for (const element of rfq.requirements) {
    if (element.categoryId === prop.categoryID) {
      result.push(element);
    }
  }
  return result;
});
// this is the clarification data for this particular category id
const clarificationData = computed(() => {
  let result = [];
  for (const element of rfq.clarifications) {
    if (element.cid === prop.categoryID) {
      result.push(element);
    }
  }
  return result;
});
// this is an object which stores the answer according the question id
const clarificationAnswer = ref({});
//this function sets the answer for the given question id in the clarifications in rfq and also makes an entry in audit history and then makes the answer for that specific question id as ""
const sendClarificationAnswer = (questionid) => {
  let vendorid;
  for (const element of clarificationData.value) {
    if (element.qid === questionid) {
      element.answer = clarificationAnswer.value[questionid];
      element.status = "answered";
      vendorid = element.vid;
      break;
    }
  }
  historyStore.historyEntry({
    actor: rfq.selectedActor.name,
    roleOrCompany: rfq.selectedActor.role,
    action: "Clarification answered",
    vendor: rfq.vendorName(vendorid),
    category: rfq.categoryName(prop.categoryID),
    detail: clarificationAnswer.value[questionid],
  });
  clarificationAnswer.value[questionid] = "";
};
</script>

<template>
  <div v-if="vendorsToBeDisplayed.length >= 1">
    <!-- Heading -->
    <div class="flex justify-between px-5 py-4 flex-wrap">
      <div class="text-[#6b7090] text-[13px] font-bold">
        {{ rfq.categoryName(prop.categoryID).toUpperCase() }} &mdash; QUOTATION
        COMPARISON
      </div>
      <div
        class="flex gap-3 text-xs flex-wrap"
        v-if="vendorsToBeDisplayed.length"
      >
        <div
          v-for="item in vendorsToBeDisplayed"
          :key="item.id"
          class="text-[11px] font-bold p-1 px-2 rounded-4xl h-max"
          :class="{
            //  submitted
            'bg-[#e1f6f1] text-[#0d8f7a]': item.status === 'submitted',

            //  partially submitted
            'bg-[#fdf1de] text-[#b46a06]':
              item.status === 'partially submitted',

            //  declined
            'bg-[#fbe6e8] text-[#c02d3c]': item.status === 'declined',

            //  sent
            'bg-[#eef0f8] text-[#6b7090]': item.status === 'sent',
          }"
        >
          {{ item.name }} : <span>{{ item.status }}</span>
        </div>
      </div>
    </div>
    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full border-t border-b border-slate-200 min-w-max">
        <!--  HEADER -->
        <thead>
          <tr class="text-[#6b7090] text-[11px] text-left">
            <th class="p-2">PARTICULAR</th>
            <th
              v-for="item in vendorsToBeDisplayed"
              :key="item.id"
              class="px-2"
            >
              {{ item.name.toUpperCase() }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="line in requirements"
            :key="line.id"
            class="text-left text-xs border-t border-slate-200"
          >
            <td class="py-5 px-2">
              <span class="font-bold">{{ line.name }}</span
              ><br />
              <span class="text-[#6b7090] text-[11px]">
                QTY {{ line.quantity }} {{ line.unit }}
                <span v-if="line.isMandatory">&middot; mandatory</span>
              </span>
            </td>

            <td
              v-for="(vendor, index) in vendorsToBeDisplayed"
              :key="vendor.id"
              class="px-2"
              :class="{
                // this 1st condition is for green color
                'bg-[#e1f6f1] border border-[#bfe9de]':
                  index === 0 &&
                  (vendor.status === 'submitted' ||
                    vendor.status === 'partially submitted') &&
                  rfq.workingQuotation[vendor.id]?.[line.id].price !== null,

                // this 2nd condition is for yellow color
                'bg-[#fbfaef] border border-slate-200':
                  index === 1 &&
                  (vendor.status === 'submitted' ||
                    vendor.status === 'partially submitted') &&
                  rfq.workingQuotation[vendor.id]?.[line.id].price !== null,
              }"
            >
              <!-- this is for the vendors whose response came for all of its requirement lines so all of its prices are not null -->
              <div
                v-if="
                  vendor.status === 'submitted' &&
                  rfq.workingQuotation[vendor.id][line.id].price !== null
                "
              >
                <span class="font-bold font-mono">
                  {{
                    Math.round(
                      Number(rfq.workingQuotation[vendor.id][line.id].price) *
                        line.quantity *
                        (1 +
                          rfq.workingQuotation[vendor.id][line.id].tax / 100),
                    ).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                    })
                  }}
                </span>
                <br />

                <span class="text-[#6b7090]">
                  <span class="font-mono">
                    {{
                      Number(
                        rfq.workingQuotation[vendor.id][line.id].price,
                      ).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                      })
                    }}
                  </span>
                  /{{ line.unit }} &middot; tax
                  {{ rfq.workingQuotation[vendor.id][line.id].tax }}%
                </span>
                <br />
                <span
                  class="text-[#6b7090]"
                  v-if="rfq.workingQuotation[vendor.id][line.id].remark"
                  >"{{ rfq.workingQuotation[vendor.id][line.id].remark }}"</span
                >
              </div>

              <!-- this is for the vendors whose response came for some of its requirement lines so for the price which is null it says awaiting and later there is a condition where status will be partially submitted and price will not be null so we will show its price -->
              <div
                v-else-if="
                  vendor.status === 'partially submitted' &&
                  rfq.workingQuotation[vendor.id][line.id].price === null
                "
                class="text-[#9ba0c0] italic text-[13px]"
              >
                Awaiting
              </div>

              <!-- this is for the vendors to whome the rfq has been sent and there responses have still not came so there status is sent and price is null for all -->
              <div
                v-else-if="
                  vendor.status === 'sent' &&
                  rfq.workingQuotation[vendor.id][line.id].price === null
                "
                class="text-[#9ba0c0] italic text-[13px]"
              >
                Awaiting
              </div>

              <!-- this is the condition i was talking about earlier status is partially submitted and price is not null so we have to show its price  -->
              <div
                v-else-if="
                  vendor.status === 'partially submitted' &&
                  rfq.workingQuotation[vendor.id][line.id].price !== null
                "
              >
                <span class="font-bold font-mono">
                  {{
                    Math.round(
                      Number(rfq.workingQuotation[vendor.id][line.id].price) *
                        line.quantity *
                        (1 +
                          rfq.workingQuotation[vendor.id][line.id].tax / 100),
                    ).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                    })
                  }}
                </span>
                <br />

                <span class="text-[#6b7090]">
                  <span class="font-mono">
                    {{
                      Number(
                        rfq.workingQuotation[vendor.id][line.id].price,
                      ).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                      })
                    }}
                  </span>
                  /{{ line.unit }} &middot; tax
                  {{ rfq.workingQuotation[vendor.id][line.id].tax }}%
                </span>
                <br />
                <span
                  class="text-[#6b7090]"
                  v-if="rfq.workingQuotation[vendor.id][line.id].remark"
                  >"{{ rfq.workingQuotation[vendor.id][line.id].remark }}"</span
                >
              </div>

              <!-- this is for the vendors whose response did not came for all of its requirement lines so all of its prices are null and its status is declined -->
              <div
                v-else-if="vendor.status === 'declined'"
                class="text-[#9ba0c0] italic text-[13px]"
              >
                Declined
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <!-- Vendor Selection -->
    <div class="border-b border-slate-200">
      <VendorSelection :categoryID="prop.categoryID" />
    </div>
    <!-- Clarifications -->
    <div class="p-5 pb-5 text-[13px]">
      <p class="text-[#6b7090] font-bold">CLARIFICATIONS</p>
      <br />
      <div v-if="clarificationData.length === 0" class="text-[#6b7090]">
        No clarification questions raised for this category yet.
      </div>
      <div v-else-if="clarificationData.length >= 1">
        <div
          v-for="(obj, index) in clarificationData"
          :class="{ 'border-t border-slate-200 my-2': index > 0 }"
        >
          <p class="font-bold">
            {{ rfq.vendorName(obj.vid) }}: {{ obj.question }}
          </p>
          <div v-if="obj.status === 'pending'">
            <p class="text-[#b46a06] italic mb-2">Awaiting internal response</p>
            <div class="my-2 flex gap-3">
              <input
                type="text"
                placeholder="Type a reply visible to this vendor only..."
                class="border border-[#e3e5f0] p-2 rounded-lg w-100"
                :value="clarificationAnswer[obj.qid] || ''"
                @input="clarificationAnswer[obj.qid] = $event.target.value"
              />
              <button
                class="border border-[#e3e5f0] p-2 rounded-lg font-bold cursor-pointer hover:bg-[#ebecf7]"
                @click="sendClarificationAnswer(obj.qid)"
              >
                Reply
              </button>
            </div>
          </div>
          <div v-else-if="obj.status === 'answered'">
            <p class="text-[#0d8f7a]">↳ {{ obj.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
