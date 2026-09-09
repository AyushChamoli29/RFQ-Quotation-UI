import { defineStore } from "pinia";
import { ref } from "vue";

export const useVendorStore = defineStore("vendor", () => {
  const totalVendors = ref(0);
  const currentVendors = ref([]);
  return { totalVendors, currentVendors };
});
