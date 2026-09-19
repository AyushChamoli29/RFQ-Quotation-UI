import { defineStore } from "pinia";
import { ref } from "vue";
import data from "@/data/mockData.json";

export const useFlagsStore = defineStore("flag", () => {
  const progress = ref(1);
  const simulateFlag = ref(false);
  const allocateFlag = ref(false);
  const costingFlag = ref(false);
  const sendToCorporateFlag = ref(false);
  let currentDate = ref(
    new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  );
  let currentTime = ref(
    new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  );
  const selectedActor = ref({ ...data.actor[0] });
  return {
    progress,
    simulateFlag,
    allocateFlag,
    costingFlag,
    sendToCorporateFlag,
    currentDate,
    currentTime,
    selectedActor,
  };
});
