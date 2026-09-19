import { defineStore } from "pinia";
import { ref, computed } from "vue";
import Data from "@/data/mockData.json";

export const useVendorStore = defineStore("vendor", () => {
  const totalVendors = ref(12);
  const currentVendors = ref([
    {
      type: "Hotels",
      VendorList: [
        {
          id: "V1",
          simulated: false,
        },
        {
          id: "V2",
          simulated: false,
        },
        {
          id: "V3",
          simulated: false,
        },
      ],
    },
    {
      type: "Flights",
      VendorList: [
        {
          id: "V8",
          simulated: false,
        },
        {
          id: "V11",
          simulated: false,
        },
      ],
    },
    {
      type: "Ground Transportation",
      VendorList: [
        {
          id: "V4",
          simulated: false,
        },
        {
          id: "V10",
          simulated: false,
        },
      ],
    },
    {
      type: "Event Management including AV",
      VendorList: [
        {
          id: "V6",
          simulated: false,
        },
        {
          id: "V12",
          simulated: false,
        },
      ],
    },
    {
      type: "Visa Management",
      VendorList: [
        {
          id: "V7",
          simulated: false,
        },
      ],
    },
    {
      type: "Local Liaison",
      VendorList: [
        {
          id: "V5",
          simulated: false,
        },
        {
          id: "V9",
          simulated: false,
        },
      ],
    },
  ]);
  const vendorsSelected = computed(() => {
    let tempSet = new Set();
    for (const element1 of currentVendors.value) {
      for (const element2 of element1.VendorList) {
        for (const item of Data.vendor_portal) {
          if (element2.id === item.id) {
            tempSet.add({ ...element2, status: item.status });
          }
        }
      }
    }
    return tempSet;
  });

  return { totalVendors, currentVendors, vendorsSelected };
});
