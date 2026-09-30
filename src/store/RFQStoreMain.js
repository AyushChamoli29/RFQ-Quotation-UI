import { defineStore } from "pinia";
import { ref, watch } from "vue";
import data from "@/data/NewMockData.json";

export const useRFQMainStore = defineStore("rfq", () => {
  // static data
  const rfqDetails = ref({ ...data.rfq });
  const rfqDeadline = ref(data.deadline);
  const categories = ref([...data.categories]);
  const vendors = ref([...data.vendors]);
  const rfqStatus = ref("draft");
  const requirements = ref([...data.requirements]);
  const vendorSelected = ref("select a vendor");
  //   dynamic data
  const allocation = ref(
    Object.entries(data.allocation).map(([key, value]) => ({
      id: key,
      vendorList: value.map((vid) => ({
        vendorid: vid,
        status: "not-sent",
      })),
    })),
  );
  const baseQuotation = ref({});
  const workingQuotation = ref({});
  const awardedLines = ref({});
  // initial awardedLines data
  function initialAwardedLines() {
    requirements.value.forEach((item) => {
      awardedLines.value[item.id] = "no award";
    });
  }
  initialAwardedLines();
  const marginOfAll = ref({});
  // initial margin
  function initialMarginOfAll() {
    requirements.value.forEach((item) => {
      const margin = categories.value.find(
        (element) => element.id === item.categoryId,
      );
      marginOfAll.value[item.id] = margin.defaultMargin;
    });
  }
  initialMarginOfAll();
  //   initial data for selected vendors,i.e.., price
  function initialQuotation(categoryID) {
    const requirementList = requirements.value.filter(
      (line) => line.categoryId === categoryID,
    );

    const categoryAllocation = allocation.value.find(
      (cat) => cat.id === categoryID,
    );

    if (!categoryAllocation) return;

    for (const vendor of categoryAllocation.vendorList) {
      const vid = vendor.vendorid;

      if (!baseQuotation.value[vid]) {
        baseQuotation.value[vid] = {};
        workingQuotation.value[vid] = {};
      }

      for (const line of requirementList) {
        const rid = line.id;

        baseQuotation.value[vid][rid] = null;
        workingQuotation.value[vid][rid] = null;
      }
    }
  }
  for (const categoryObj of categories.value) {
    initialQuotation(categoryObj.id);
  }

  // status of vendors
  const markVendorsAsSent = () => {
    if (rfqStatus.value !== "allocated") return;

    for (const category of allocation.value) {
      for (const vendor of category.vendorList) {
        vendor.status = "sent";
      }
    }
  };
  watch(rfqStatus, () => {
    markVendorsAsSent();
  });
  //   quotation extraction from mock data for selected vendors
  function extractQuotation(categoryID) {
    const requirementList = requirements.value.filter(
      (line) => line.categoryId === categoryID,
    );

    const categoryAllocation = allocation.value.find(
      (cat) => cat.id === categoryID,
    );

    if (!categoryAllocation) return;

    for (const vendor of categoryAllocation.vendorList) {
      const vid = vendor.vendorid;

      const vendorQuotation = data.quotation[vid] || {};

      for (const line of requirementList) {
        const rid = line.id;
        const price = vendorQuotation[rid];

        if (price != null) {
          baseQuotation.value[vid][rid] = price;
          workingQuotation.value[vid][rid] = price;
        }
      }
    }
  }
  // add vendor
  const addVendor = (vendorid, categoryid) => {
    let status = "not-sent";

    if (rfqStatus.value === "allocated" || "simulated") {
      status = "sent";
    }

    const category = allocation.value.find((obj) => obj.id === categoryid);

    if (!category) return;

    // prevent duplicate
    const exists = category.vendorList.some((v) => v.vendorid === vendorid);

    if (exists) return;

    category.vendorList.push({
      vendorid: vendorid,
      status: status,
    });
    const requirementList = requirements.value.filter(
      (line) => line.categoryId === categoryid,
    );
    if (!baseQuotation.value[vendorid]) {
      baseQuotation.value[vendorid] = {};
      workingQuotation.value[vendorid] = {};
    }

    for (const line of requirementList) {
      const rid = line.id;

      baseQuotation.value[vendorid][rid] = null;
      workingQuotation.value[vendorid][rid] = null;
    }
  };

  const deleteVendor = (vendorid, categoryid) => {
    const category = allocation.value.find((obj) => obj.id === categoryid);
    if (!category) return;

    const vendor = category.vendorList.find((v) => v.vendorid === vendorid);
    if (!vendor) return;

    // ❗ block if vendor has responded
    if (
      vendor.status === "submitted" ||
      vendor.status === "partially submitted" ||
      vendor.status === "declined"
    ) {
      alert(
        "This vendor cannot be removed as it has already responded to the RFQ.",
      );
      return;
    }

    //  allow delete
    category.vendorList = category.vendorList.filter(
      (v) => v.vendorid !== vendorid,
    );

    delete baseQuotation.value[vendorid];
    delete workingQuotation.value[vendorid];
  };
  return {
    rfqDetails,
    rfqDeadline,
    categories,
    vendors,
    requirements,
    vendorSelected,
    allocation,
    baseQuotation,
    workingQuotation,
    awardedLines,
    marginOfAll,
    rfqStatus,
    initialQuotation,
    extractQuotation,
    addVendor,
    deleteVendor,
  };
});
