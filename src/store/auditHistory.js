import { defineStore } from "pinia";
import { ref } from "vue";

export const useHistoryStore = defineStore("history", () => {
  const history = ref([]);
  const historyEntry = ({
    actor = "",
    roleOrCompany = "",
    action = "",
    category = `&mdash;`,
    vendor = `&mdash;`,
    detail = "",
  }) => {
    const currentDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const currentTime = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const obj = {
      actor,
      roleOrCompany,
      action,
      category,
      vendor,
      detail,
      time: `${currentDate}, ${currentTime}`,
    };
    history.value.unshift(obj);
  };
  return { history, historyEntry };
});
