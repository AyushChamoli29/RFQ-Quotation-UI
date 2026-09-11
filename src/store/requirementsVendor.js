import { defineStore } from "pinia";
import { ref } from "vue";

export const useVendorStore = defineStore("vendor", () => {
  const totalVendors = ref(12);
  const currentVendors = ref([
    {
      type: "Hotels",
      VendorList: ["V1", "V2", "V3"],
    },
    {
      type: "Flights",
      VendorList: ["V4", "V5"],
    },
    {
      type: "Ground Transportation",
      VendorList: ["V6", "V7"],
    },
    {
      type: "Event Management including AV",
      VendorList: ["V8", "V9"],
    },
    {
      type: "Visa Management",
      VendorList: ["V10"],
    },
    {
      type: "Local Liaison",
      VendorList: ["V11", "V12"],
    },
  ]);
  return { totalVendors, currentVendors };
});
