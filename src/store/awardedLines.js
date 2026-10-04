import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRFQMainStore } from "./RFQStoreMain";

export const useAwardedStore = defineStore("awarded", () => {
  const rfq = useRFQMainStore();
  const awardedLines = ref({});
  // initial awardedLines data
  // function initialAwardedLines() {
  //   if (!rfq.requirements?.value) return;

  //   rfq.requirements.value.forEach((item) => {
  //     awardedLines.value[item.id] = "no award";
  //   });
  // }
  // initialAwardedLines();
  watch(
    () => rfq.requirements,
    (requirements) => {
      if (!requirements?.length) return;

      requirements.forEach((item) => {
        if (!awardedLines.value[item.id]) {
          awardedLines.value[item.id] = "no award";
        }
      });
    },
    { immediate: true },
  );
  const costVersions = ref(0);
  // const awarded = ref([]);
  // const awardedLinesData = ref([]);
  // for (const categoryObj of rfq.categories) {
  //   for (const element of rfq.allocation) {
  //     if (element.id === categoryObj.id && element.vendorList.length >= 1) {
  //       awardedLinesData.value.push({
  //         categoryID: element.id,
  //         awardedLines: [],
  //         base: 0,
  //         profit: 0,
  //         final: 0,
  //       });
  //     }
  //   }
  // }
  // function getAwardedLinesData() {
  //   for (const obj of awardedLinesData.value) {
  //     let requirement = [];
  //     for (const element of rfq.requirements) {
  //       if (
  //         element.categoryId === obj.categoryID &&
  //         awardedLines.value[element.id] !== "no award"
  //       ) {
  //         requirement.push(element);
  //       }
  //     }
  //     for (const line of requirement) {
  //       obj.awardedLines.push({
  //         vendor: awardedLines[line.id],
  //         particular: line.name,
  //         rate: rfq.workingQuotation[vendor][line.id].price,
  //         base:
  //           rate *
  //           line.quantity *
  //           (1 +
  //             rfq.workingQuotation[[awardedLines[line.id]][line.id].tax] / 100),
  //         margin: rfq.marginOfAll[line.id],
  //         profit: (base * rfq.marginOfAll[line.id]) / 100,
  //         total: base + profit,
  //       });
  //     }
  //   }
  // }
  // function calculateCosting() {
  //   for (const element of awardedLinesData.value) {
  //     element.base = computed(() => {
  //       let sum = 0;
  //       for (const item of element.awardedLines) {
  //         sum += item.base;
  //       }
  //       return sum;
  //     });
  //     element.profit = computed(() => {
  //       let sum = 0;
  //       for (const item of element.awardedLines) {
  //         sum += item.profit;
  //       }
  //       return sum;
  //     });
  //     element.final = computed(() => {
  //       let sum = 0;
  //       for (const item of element.awardedLines) {
  //         sum += item.total;
  //       }
  //       return sum;
  //     });
  //   }
  // }
  // const awardedLinesData = ref({
  //   Hotels: {
  //     data: ref({}),
  //     base: ref(0),
  //     profit: ref(0),
  //     final: ref(0),
  //   },
  //   Flights: {
  //     data: ref({}),
  //     base: ref(0),
  //     profit: ref(0),
  //     final: ref(0),
  //   },
  //   "Ground Transportation": {
  //     data: ref({}),
  //     base: ref(0),
  //     profit: ref(0),
  //     final: ref(0),
  //   },
  //   "Event Management including AV": {
  //     data: ref({}),
  //     base: ref(0),
  //     profit: ref(0),
  //     final: ref(0),
  //   },
  //   "Visa Management": {
  //     data: ref({}),
  //     base: ref(0),
  //     profit: ref(0),
  //     final: ref(0),
  //   },
  //   "Local Liaison": {
  //     data: ref({}),
  //     base: ref(0),
  //     profit: ref(0),
  //     final: ref(0),
  //   },
  // });
  return { costVersions, awardedLines };
});
