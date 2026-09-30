import { defineStore } from "pinia";
import { ref } from "vue";

export const useEvaluationStore = defineStore("evaluate", () => {
  const awarded = ref([]);
  const costVersions = ref(0);
  const awardedLines = ref({
    c1: {
      data: ref({}),
      base: ref(0),
      profit: ref(0),
      final: ref(0),
    },
    c2: {
      data: ref({}),
      base: ref(0),
      profit: ref(0),
      final: ref(0),
    },
    c3: {
      data: ref({}),
      base: ref(0),
      profit: ref(0),
      final: ref(0),
    },
    c4: {
      data: ref({}),
      base: ref(0),
      profit: ref(0),
      final: ref(0),
    },
    c5: {
      data: ref({}),
      base: ref(0),
      profit: ref(0),
      final: ref(0),
    },
    c6: {
      data: ref({}),
      base: ref(0),
      profit: ref(0),
      final: ref(0),
    },
  });
  return { awarded, costVersions, awardedLines };
});
