import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import data from "@/data/NewMockData.json";
import { useAllocationStore } from "./AllocationStore";
import { useAwardedStore } from "./awardedLines";
import { useHistoryStore } from "./auditHistory";

export const useRFQMainStore = defineStore("rfq", () => {
  const allocationStore = useAllocationStore();
  const awardedStore = useAwardedStore();
  const historyStore = useHistoryStore();
  // actor
  const actors = ref([...data.actor]);
  const selectedActor = ref(actors.value[0]);
  // static data
  const progress = ref(1);
  const rfqDetails = ref({ ...data.rfq });
  const rfqDeadline = ref(data.deadline);
  const categories = ref([...data.categories]);
  const vendors = ref([...data.vendors]);
  const rfqStatus = ref("draft");
  const requirements = ref([...data.requirements]);
  const vendorSelected = ref("select a vendor");
  const vendorPortalTempObj = ref({});
  const costingSnapshot = ref([]);
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
  const clarifications = ref([
    {
      ...data.clarifications,
      qid: `c2_v4_${Date.now()}`,
    },
  ]);
  const baseQuotation = ref({});
  const workingQuotation = ref({});
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

        baseQuotation.value[vid][rid] = { price: null, tax: 7, remark: "" };
        workingQuotation.value[vid][rid] = { price: null, tax: 7, remark: "" };
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
          baseQuotation.value[vid][rid] = { price: price, tax: 7, remark: "" };
          workingQuotation.value[vid][rid] = {
            price: price,
            tax: 7,
            remark: "",
          };
        }
      }
    }
  }
  // finde vendor and category name by id
  const vendorName = (id) => {
    for (const element of vendors.value) {
      if (element.id === id) {
        return element.name;
      }
    }
  };
  const categoryName = (id) => {
    for (const element of categories.value) {
      if (element.id === id) {
        return element.name;
      }
    }
  };
  // add vendor
  const addVendor = (vendorid, categoryid) => {
    let status = "not-sent";

    if (rfqStatus.value === "allocated" || rfqStatus.value === "simulated") {
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

      baseQuotation.value[vendorid][rid] = { price: null, tax: 7, remark: "" };
      workingQuotation.value[vendorid][rid] = {
        price: null,
        tax: 7,
        remark: "",
      };
    }
    historyStore.historyEntry({
      actor: selectedActor.value.name,
      roleOrCompany: selectedActor.value.role,
      action: "Vendor allocated to category",
      vendor: vendorName(vendorid),
      category: categoryName(categoryid),
      detail: `${vendorName(vendorid)} added to ${categoryName(categoryid)}`,
    });
  };

  const deleteVendor = (vendorid, categoryid) => {
    const category = allocation.value.find((obj) => obj.id === categoryid);
    if (!category) return;

    const vendor = category.vendorList.find((v) => v.vendorid === vendorid);
    if (!vendor) return;

    //  block if vendor has responded
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
    historyStore.historyEntry({
      actor: selectedActor.value.name,
      roleOrCompany: selectedActor.value.role,
      action: "Vendor removed from category allocation",
      vendor: vendorName(vendorid),
      category: categoryName(categoryid),
    });
  };
  function getVendorName(vid) {
    for (const vendor of vendors.value) {
      if (vid === vendor.id) {
        return vendor ? vendor.name : "";
      }
    }
  }
  function getCostingData() {
    const result = [];

    for (const category of categories.value) {
      const categoryObj = {
        categoryID: category.id,
        lines: [],
        base: 0,
        profit: 0,
        total: 0,
      };

      for (const line of requirements.value) {
        if (line.categoryId !== category.id) continue;

        const vid = awardedStore.awardedLines[line.id];
        if (!vid || vid === "no award") continue;

        const data = workingQuotation.value[vid]?.[line.id];
        if (!data || data.price == null) continue;

        const base = Math.round(
          data.price * line.quantity * (1 + data.tax / 100),
        );

        const profit = Math.round((base * marginOfAll.value[line.id]) / 100);

        const total = base + profit;

        categoryObj.lines.push({
          particular: line.name,
          vendor: getVendorName(vid),
          rate: data.price,
          quantity: line.quantity,
          base,
          margin: marginOfAll.value[line.id],
          profit,
          total,
        });

        categoryObj.base += base;
        categoryObj.profit += profit;
        categoryObj.total += total;
      }

      //  only push if category has data
      if (categoryObj.lines.length > 0) {
        result.push(categoryObj);
      }
    }

    return result;
  }
  const deadlineStatus = computed(() => {
    if (!rfqDeadline) return "";

    const now = new Date();
    const deadline = new Date(rfqDeadline.value);

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const deadlineDay = new Date(
      deadline.getFullYear(),
      deadline.getMonth(),
      deadline.getDate(),
    );

    if (deadlineDay < today) return "overdue";
    if (deadlineDay.getTime() === today.getTime()) return "due today";
    return "upcoming";
  });

  return {
    actors,
    selectedActor,
    progress,
    rfqDetails,
    rfqDeadline,
    deadlineStatus,
    categories,
    vendors,
    requirements,
    vendorSelected,
    allocation,
    clarifications,
    baseQuotation,
    workingQuotation,
    marginOfAll,
    rfqStatus,
    vendorPortalTempObj,
    costingSnapshot,
    initialQuotation,
    extractQuotation,
    addVendor,
    deleteVendor,
    getCostingData,
    vendorName,
    categoryName,
  };
});
