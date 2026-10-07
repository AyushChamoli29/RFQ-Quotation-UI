import { defineStore } from "pinia";
import { useRFQMainStore } from "./RFQStoreMain";
import { computed } from "vue";

export const useAllocationStore = defineStore("allocation", () => {
  const rfq = useRFQMainStore();
  // list of vendors allocated in all categories
  const vendorsSelected = computed(() => {
    let tempSet = new Set();
    for (const vendorObj of rfq.allocation) {
      for (const vendor of vendorObj.vendorList) {
        tempSet.add(vendor.vendorid);
      }
    }
    return tempSet;
  });
  const totalVendors = computed(() => vendorsSelected.value.size);

  return {
    totalVendors,
    vendorsSelected,
  };
});
