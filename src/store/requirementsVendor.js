import { defineStore } from "pinia";
import { ref } from "vue";

export const useVendorStore = defineStore("vendor", () => {
  const totalVendors = ref(12);
  const currentVendors = ref([
    {
      type: "Hotels",
      VendorList: [
        {
          id: "V1",
          simulated: true,
        },
        {
          id: "V2",
          simulated: true,
        },
        {
          id: "V3",
          simulated: true,
        },
      ],
    },
    {
      type: "Flights",
      VendorList: [
        {
          id: "V4",
          simulated: true,
        },
        {
          id: "V5",
          simulated: true,
        },
      ],
    },
    {
      type: "Ground Transportation",
      VendorList: [
        {
          id: "V6",
          simulated: true,
        },
        {
          id: "V7",
          simulated: true,
        },
      ],
    },
    {
      type: "Event Management including AV",
      VendorList: [
        {
          id: "V8",
          simulated: true,
        },
        {
          id: "V9",
          simulated: true,
        },
      ],
    },
    {
      type: "Visa Management",
      VendorList: [
        {
          id: "V10",
          simulated: true,
        },
      ],
    },
    {
      type: "Local Liaison",
      VendorList: [
        {
          id: "V11",
          simulated: true,
        },
        {
          id: "V12",
          simulated: true,
        },
      ],
    },
  ]);
  return { totalVendors, currentVendors };
});
