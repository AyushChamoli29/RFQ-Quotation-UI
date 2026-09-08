import { defineStore } from "pinia";
import { ref } from "vue";
import data from "@/data/mockData.json";

export const useFlagsStore = defineStore("flag", () => {
  const simulateFlag = ref(false);
  const allocateFlag = ref(false);
  const selectedActor = ref({ ...data.actor[0] });
  return { simulateFlag, allocateFlag, selectedActor };
});
