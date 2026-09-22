import { defineStore } from "pinia";
import { ref } from "vue";

export const useVendorportalStore = defineStore("vendorPortal", () => {
  const vendorSelected = ref("select a vendor");
  return { vendorSelected };
});
