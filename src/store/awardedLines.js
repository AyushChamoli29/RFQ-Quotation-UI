import { defineStore } from "pinia";
import { ref } from "vue";
import { useRFQMainStore } from "./RFQStoreMain";

export const useAwardedStore = defineStore("awarded", () => {
  const rfq = useRFQMainStore();
  const awardedLines = ref({});
  // initial awardedLines data
  function initialAwardedLines() {
    rfq.requirements.forEach((item) => {
      awardedLines.value[item.id] = "no award";
    });
  }
  initialAwardedLines();

  // const awarded = ref([]);
  const awardedLinesData = ref([]);
  const costVersions = ref(0);
  for (const categoryObj of rfq.categories) {
    for (const element of rfq.allocation) {
      if (element.id === categoryObj.id && element.vendorList.length >= 1) {
        awardedLinesData.value.push({
          categoryID: element.id,
          awardedLines: [],
        });
      }
    }
  }
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
