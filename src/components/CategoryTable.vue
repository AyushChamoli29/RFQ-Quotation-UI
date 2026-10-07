<script setup>
import { computed } from "vue";
import { useRFQMainStore } from "@/store/RFQStoreMain";
import { useAwardedStore } from "@/store/awardedLines";
const rfq = useRFQMainStore();
const awardedStore = useAwardedStore();

// this counts the number of requirement line for this particular category
function getCategoryLine(id) {
  let counter = 0;
  for (const requirementObj of rfq.requirements) {
    if (requirementObj.categoryId === id) {
      counter++;
    }
  }
  return counter;
}
// this returns an object which has the count of vendors allocated who have given response for each category
const getRespondedVendorCount = computed(() => {
  const obj = {};

  rfq.categories.forEach((categoryObj) => {
    let counter = 0;

    for (const allocationObj of rfq.allocation) {
      if (categoryObj.id === allocationObj.id) {
        for (const vendorObj of allocationObj.vendorList) {
          if (
            vendorObj.status === "submitted" ||
            vendorObj.status === "partially submitted"
          ) {
            counter++;
          }
        }

        break;
      }
    }

    obj[categoryObj.id] = counter;
  });

  return obj;
});
// this returns an object which has the count of total vendors allocated for each category
const getTotalVendorCount = computed(() => {
  const obj = {};
  rfq.categories.forEach((categoryObj) => {
    for (const allocationObj of rfq.allocation) {
      if (categoryObj.id === allocationObj.id) {
        obj[categoryObj.id] = allocationObj.vendorList.length;
        break;
      }
    }
  });
  return obj;
});
// this returns an object which has the count of vendors which are awarded for each category
const awardedCountByCategory = computed(() => {
  let obj = {};

  rfq.categories.forEach((categoryObj) => {
    let counter = 0;

    for (const line of rfq.requirements) {
      if (line.categoryId === categoryObj.id) {
        if (awardedStore.awardedLines[line.id] !== "no award") {
          counter++;
        }
      }
    }

    obj[categoryObj.id] = counter;
  });

  return obj;
});
// this returns an object which has status of each category
const status = computed(() => {
  let obj = {};

  rfq.categories.forEach((categoryObj) => {
    let tempStatus = "";

    if (rfq.rfqStatus === "draft") {
      tempStatus = "Not sent";
    } else if (getRespondedVendorCount.value[categoryObj.id] === 0) {
      tempStatus = "Awaiting response";
    } else if (
      awardedCountByCategory.value[categoryObj.id] ===
      getCategoryLine(categoryObj.id)
    ) {
      tempStatus = "Fully awarded";
    } else {
      tempStatus = "Under evaluation";
    }

    obj[categoryObj.id] = tempStatus;
  });

  return obj;
});
</script>

<template>
  <div class="px-5 bg-white shadow-sm shadow-slate-300 rounded-lg">
    <p class="text-xs tracking-wider text-slate-500 font-bold mt-5 mb-3">
      CATEGORIES AT A GLANCE
    </p>
    <table class="text-xs w-full mb-4">
      <thead>
        <tr class="text-slate-500 text-[11px]">
          <th class="px-3 py-2 text-left">CATEGORY</th>
          <th class="px-3 py-2 text-left">LINES</th>
          <th class="px-3 py-2 text-left">VENDORS INVITED</th>
          <th class="px-3 py-2 text-left">RESPONSES</th>
          <th class="px-3 py-2 text-left">AWARDED LINES</th>
          <th class="px-3 py-2 text-left">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="categoryObj in rfq.categories"
          class="border-t border-slate-200"
        >
          <td class="px-3 py-3 font-bold">{{ categoryObj.name }}</td>
          <td class="px-3 py-3">{{ getCategoryLine(categoryObj.id) }}</td>
          <td class="px-3 py-3">
            {{ getTotalVendorCount[categoryObj.id] }}
          </td>
          <td class="px-3 py-3 font-mono">
            {{
              getRespondedVendorCount[categoryObj.id] +
              "/" +
              getTotalVendorCount[categoryObj.id]
            }}
          </td>
          <td class="px-3 py-2 font-mono">
            {{
              awardedCountByCategory[categoryObj.id] +
              "/" +
              getCategoryLine(categoryObj.id)
            }}
          </td>
          <td>
            <div
              class="w-max h-max px-2 py-1 rounded-2xl font-bold text-[11px]"
              :class="{
                'bg-[#eef0f8] text-[#6b7090]':
                  status[categoryObj.id] === 'Not sent',
                'bg-[#fdf1de] text-[#b46a06]':
                  status[categoryObj.id] === 'Awaiting response',
                'bg-[#eeecfb] text-[#3f3ba6]':
                  status[categoryObj.id] === 'Under evaluation',
                'bg-[#e1f6f1] text-[#0d8f7a]':
                  status[categoryObj.id] === 'Fully awarded',
              }"
            >
              {{ status[categoryObj.id] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
