import { defineStore } from "pinia";
import { useRFQStore } from "./RFQStore";
import { useRFQMainStore } from "./RFQStoreMain";
import { ref, computed } from "vue";

export const useAllocationStore = defineStore("allocation", () => {
  const rfq = useRFQMainStore();
  const totalVendors = ref(12);
  const vendorsSelected = computed(() => {
    let tempSet = new Set();
    for (const vendorObj of rfq.allocation) {
      for (const vendorId of vendorObj.vendorList) {
        tempSet.add(vendorId);
      }
    }
    return tempSet;
  });
  const findVendorName = (vendorid) => {
    return rfq.vendors[vendorid];
  };

  return {
    totalVendors,
    vendorsSelected,
  };
});
