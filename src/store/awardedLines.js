import { defineStore } from "pinia";
import { ref } from "vue";

export const useAwardedStore = defineStore("awarded", () => {
  const awarded = ref([]);
  const costVersions = ref(0);
  const awardedLines = ref({
    Hotels: {
      data: ref({}),
      base: ref(0),
      profit: ref(0),
      final: ref(0),
    },
    Flights: {
      data: ref({}),
      base: ref(0),
      profit: ref(0),
      final: ref(0),
    },
    "Ground Transportation": {
      data: ref({}),
      base: ref(0),
      profit: ref(0),
      final: ref(0),
    },
    "Event Management including AV": {
      data: ref({}),
      base: ref(0),
      profit: ref(0),
      final: ref(0),
    },
    "Visa Management": {
      data: ref({}),
      base: ref(0),
      profit: ref(0),
      final: ref(0),
    },
    "Local Liaison": {
      data: ref({}),
      base: ref(0),
      profit: ref(0),
      final: ref(0),
    },
  });
  return { awarded, costVersions, awardedLines };
});
