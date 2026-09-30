import { defineStore } from "pinia";
import data from "@/data/mockData.json";
import { ref } from "vue";

export const useVendorStore = defineStore("vendorstore", () => {
  const clarifications = [
    {
      categoryID: "c2",
      vendorID: "v4",
      question:
        " Please confirm whether the return sector is a same-day or next-day connection.",
      answer:
        "Same-day connection required; onward departure not before 20:00 local time.",
    },
  ];
  // const quotationsAllocated = ref(
  //   data.vendorPricing.map((categoryObj) => ({
  //     categoryID: categoryObj.categoryID,
  //     defaultMargin:categoryObj.defaultMargin,
  //     vendorPrices:categoryObj.vendorsPrices
  //   })),
  // );
  const quotations = ref(
    data.vendorPricing.map((categoryObj) => ({
      categoryID: categoryObj.categoryID,
      defaultMargin: categoryObj.defaultMargin,
      vendorPrices: structuredClone(categoryObj.vendorsPrices),
    })),
  );

  return { clarifications, quotations };
});
