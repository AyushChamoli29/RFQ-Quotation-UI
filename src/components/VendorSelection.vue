<script setup>
import { computed, defineProps, ref, onMounted } from "vue";
import { useRFQMainStore } from "@/store/RFQStoreMain.js";
import { useAwardedStore } from "@/store/awardedLines";
const rfq = useRFQMainStore();
const awardedStore = useAwardedStore();
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
function vendorName(id) {
  for (const vendorObj of rfq.vendors) {
    if (vendorObj.id === id) {
      return vendorObj.name;
    }
  }
}
const requirement = computed(() => {
  return rfq.requirements.filter((item) => item.categoryId === prop.categoryID);
});
function getVendors(id) {
  const category = rfq.allocation.find((item) => item.id === prop.categoryID);

  if (!category) return [];

  return category.vendorList.filter((item) => {
    const vendorData = rfq.workingQuotation[item.vendorid];
    return vendorData && vendorData[id] && vendorData[id].price !== null;
  });
}
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
function convertIntoCurrency(number) {
  return number.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
}
// console.log(awardedStore.awardedLines);
// console.log(rfq.marginOfAll);
// console.log(awardedStore.awardedLinesData);
</script>

<template>
  <div class="text-[#6b7090] text-[13px] font-bold px-5">
    VENDOR SELECTION FOR {{ categoryName(prop.categoryID).toUpperCase() }}
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
              v-model="awardedStore.awardedLines[item.id]"
              class="outline outline-slate-200 rounded-sm w-8/10 text-[12.5px] p-2"
            >
              <option value="no award">No award</option>
              <option
                :value="vObj.vendorid"
                v-for="vObj in getVendors(item.id)"
              >
                {{ vendorName(vObj.vendorid) }}
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
