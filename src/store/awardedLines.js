import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRFQMainStore } from "./RFQStoreMain";

export const useAwardedStore = defineStore("awarded", () => {
  const rfq = useRFQMainStore();
  const awardedLines = ref({});
  // initial awardedLines data
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
  // this is the cost versions
  const costVersions = ref(0);
  return { costVersions, awardedLines };
});
