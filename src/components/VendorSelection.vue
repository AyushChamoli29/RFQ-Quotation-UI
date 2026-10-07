<script setup>
import { computed, defineProps } from "vue";
import { useRFQMainStore } from "@/store/RFQStoreMain.js";
import { useAwardedStore } from "@/store/awardedLines";
import { useHistoryStore } from "@/store/auditHistory";
const rfq = useRFQMainStore();
const awardedStore = useAwardedStore();
const historyStore = useHistoryStore();
const prop = defineProps({
  categoryID: String,
});
// this gives an array which has those requirement lines which belong to this specific category id
const requirement = computed(() => {
  return rfq.requirements.filter((item) => item.categoryId === prop.categoryID);
});
// this returns an array of vendors for the given requirement id; it includes only those vendors for which a working quotation object exists, the given requirement id exists in it, and its price is not null
function getVendors(id) {
  const category = rfq.allocation.find((item) => item.id === prop.categoryID);

  if (!category) return [];

  return category.vendorList.filter((item) => {
    const vendorData = rfq.workingQuotation[item.vendorid];
    return vendorData && vendorData[id] && vendorData[id].price !== null;
  });
}
// if for the given requirement id there is a vendor awarded or selected which means in awarded store awarded lines for this requirement id there is a vendor id then we will calculate its base, markup and total price and this function returns those 3 calculated things
function calculatePrice(rid) {
  const vid = awardedStore.awardedLines[rid];
  let quantity = 0;
  for (const element of rfq.requirements) {
    if (element.id === rid) {
      quantity = element.quantity;
    }
  }
  if (!vid || vid === "no award") {
    return {
      base: 0,
      markup: 0,
      sellingTotal: 0,
    };
  }

  const base = Math.round(
    rfq.workingQuotation[vid][rid].price *
      quantity *
      (1 + rfq.workingQuotation[vid][rid].tax / 100) || 0,
  );
  const margin = rfq.marginOfAll[rid] || 0;

  const markup = Math.round((base * margin) / 100);
  const sellingTotal = base + markup;

  return {
    base,
    markup,
    sellingTotal,
  };
}
// this is a function which takes a number and formats it into the currency format
function convertIntoCurrency(number) {
  return number.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
}
// this function takes vendor id as input and gives its category id as output
function findCategoryID(vendorid) {
  for (const element of rfq.vendors) {
    for (const item of rfq.categories) {
      if (
        element.id === vendorid &&
        element.type.toLowerCase() === item.name.toLowerCase()
      ) {
        return item.id;
      }
    }
  }
}
// since fro all requirements their value initially is no award this function is used to change for this specific requirement line to the vendor it has selected which is being done in the last line of this function but i am also using old vendor because i want to make an entry to the audit history whenever we change the awarded vendor for any requirement line
const awardLineAudit = (id, event) => {
  const oldVendorId = awardedStore.awardedLines[id];
  const newVendorId = event.target.value;
  if (oldVendorId === newVendorId) return;
  const requirementLine = rfq.requirements.find((item) => item.id === id);
  if (oldVendorId === "no award") {
    historyStore.historyEntry({
      actor: rfq.selectedActor.name,
      roleOrCompany: rfq.selectedActor.role,
      action: "Vendor awarded for line item",
      category: rfq.categoryName(findCategoryID(awardedStore.awardedLines[id])),
      vendor: rfq.vendorName(awardedStore.awardedLines[id]),
      detail: `${requirementLine.name}`,
    });
  } else {
    historyStore.historyEntry({
      actor: rfq.selectedActor.name,
      roleOrCompany: rfq.selectedActor.role,
      action: "Vendor awarded for line item",
      category: rfq.categoryName(findCategoryID(newVendorId)),
      vendor: rfq.vendorName(newVendorId),
      detail: `${requirementLine.name} (previously ${rfq.vendorName(oldVendorId)})`,
    });
  }
  awardedStore.awardedLines[id] = newVendorId;
};
</script>

<template>
  <div class="text-[#6b7090] text-[13px] font-bold px-5">
    VENDOR SELECTION FOR {{ rfq.categoryName(prop.categoryID).toUpperCase() }}
  </div>
  <br />
  <div>
    <table class="w-full text-left">
      <thead>
        <tr class="text-[#6b7090] text-[11px]">
          <th class="px-8 pb-2">PARTICULAR</th>
          <th>AWARD TO</th>
          <th>MARGIN %</th>
          <th>BASE</th>
          <th>MARKUP</th>
          <th>SELLING TOTAL</th>
        </tr>
      </thead>
      <tbody class="text-[13px]">
        <tr
          v-for="item in requirement"
          :key="item.id"
          class="border-t border-slate-200"
        >
          <td class="py-4 px-8">{{ item.name }}</td>
          <td>
            <select
              :value="awardedStore.awardedLines[item.id]"
              @change="awardLineAudit(item.id, $event)"
              class="outline outline-slate-200 rounded-sm w-8/10 text-[12.5px] p-2"
            >
              <option value="no award">No award</option>
              <option
                :value="vObj.vendorid"
                v-for="vObj in getVendors(item.id)"
              >
                {{ rfq.vendorName(vObj.vendorid) }}
              </option>
            </select>
            <div
              v-if="getVendors(item.id).length === 0"
              class="text-[#b46a06] text-[11px] m-1"
            >
              No quotes yet
            </div>
          </td>
          <td>
            <input
              type="number"
              min="0"
              step="0.5"
              class="outline outline-slate-200 rounded-sm w-8/10 text-[12.5px] p-2"
              v-model="rfq.marginOfAll[item.id]"
            />
          </td>
          <td class="font-mono">
            {{
              calculatePrice(item.id).base > 0
                ? convertIntoCurrency(calculatePrice(item.id).base)
                : "-"
            }}
          </td>
          <td class="font-mono">
            {{
              calculatePrice(item.id).markup
                ? convertIntoCurrency(calculatePrice(item.id).markup)
                : "-"
            }}
          </td>
          <td class="font-bold font-mono">
            {{
              calculatePrice(item.id).sellingTotal
                ? convertIntoCurrency(calculatePrice(item.id).sellingTotal)
                : "-"
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <br />
</template>
