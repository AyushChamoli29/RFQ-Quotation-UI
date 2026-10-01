<script setup>
import { computed, defineProps } from "vue";
import VendorSelection from "./VendorSelection.vue";
import { useRFQStore } from "@/store/RFQStore.js";
import { useRFQMainStore } from "@/store/RFQStoreMain.js";
import { useAllocationStore } from "@/store/AllocationStore.js";
const rfq = useRFQMainStore();
const allocationStore = useAllocationStore();
const prop = defineProps({
  categoryID: String,
});
function categoryName(id) {
  for (const categoryObj of rfq.categories) {
    if (categoryObj.id === id) {
      return categoryObj.name;
    }
  }
}
const vendorsToBeDisplayed = computed(() => {
  let vendorSelected = rfq.allocation.find((obj) => obj.id === prop.categoryID);
  return vendorSelected.vendorList.map((item) => {
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
// console.log(vendorsToBeDisplayed.value);
const requirements = computed(() => {
  let result = [];
  for (const element of rfq.requirements) {
    if (element.categoryId === prop.categoryID) {
      result.push(element);
    }
  }
  return result;
});
// console.log(requirements.value);
const quotes = computed(() => {
  const result = [];
  for (const vendorinfo of vendorsToBeDisplayed.value) {
    for (const [id, quotation] of Object.entries(rfq.workingQuotation)) {
      if (vendorinfo.id === id) {
        result.push({
          vendorID: id,
          quotation: quotation,
        });
      }
    }
  }
  return result;
});
// console.log(quotes.value);
</script>

<template>
  <div v-if="vendorsToBeDisplayed.length >= 1">
    <!-- Heading -->
    <div class="flex justify-between px-5 py-4 flex-wrap">
      <div class="text-[#6b7090] text-[13px] font-bold">
        {{ categoryName(prop.categoryID).toUpperCase() }} &mdash; QUOTATION
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
              v-for="(item, index) in vendorsToBeDisplayed"
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
                'bg-[#e1f6f1] border border-[#bfe9de]':
                  index === 0 &&
                  (vendor.status === 'submitted' ||
                    vendor.status === 'partially submitted') &&
                  rfq.workingQuotation[vendor.id]?.[line.id].price !== null,

                'bg-[#fbfaef] border border-slate-200':
                  index === 1 &&
                  (vendor.status === 'submitted' ||
                    vendor.status === 'partially submitted') &&
                  rfq.workingQuotation[vendor.id]?.[line.id].price !== null,
              }"
            >
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

              <div
                v-else-if="
                  vendor.status === 'partially submitted' &&
                  rfq.workingQuotation[vendor.id][line.id].price === null
                "
                class="text-[#9ba0c0] italic text-[13px]"
              >
                Awaiting
              </div>

              <div
                v-else-if="
                  vendor.status === 'sent' &&
                  rfq.workingQuotation[vendor.id][line.id].price === null
                "
                class="text-[#9ba0c0] italic text-[13px]"
              >
                Awaiting
              </div>

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
              <div
                v-else-if="
                  vendor.status === 'sent' &&
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
                  {{ rfq.workingQuotation[vendor.id][line.id].tax }}% &middot;
                </span>
                <br />
                <span
                  class="text-[#6b7090]"
                  v-if="rfq.workingQuotation[vendor.id][line.id].remark"
                  >"{{ rfq.workingQuotation[vendor.id][line.id].remark }}"</span
                >
              </div>

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
    <!-- <div class="p-5 pb-5">
      <p class="text-[#6b7090] text-[13px] font-bold">CLARIFICATIONS</p>
      <br />
      <div v-if="!prop.data.clarification" class="text-[#6b7090] text-[12.5px]">
        <p>No clarification questions raised for this category yet.</p>
      </div>
      <div v-if="prop.data.clarification">
        <p class="text-[12.5px] font-[650]">
          SkyBridge Airlines: Please confirm whether the return sector is a
          same-day or next-day connection.
        </p>
        <p class="text-[12.5px] text-[#0d8f7a]">
          ↳ Same-day connection required; onward departure not before 20:00
          local time.
        </p>
      </div>
    </div> -->
  </div>
</template>
