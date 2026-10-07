import { defineStore } from "pinia";
import { ref, computed } from "vue";
import data from "@/data/NewMockData.json";
import { useAwardedStore } from "./awardedLines";
import { useHistoryStore } from "./auditHistory";

export const useRFQMainStore = defineStore("rfq", () => {
  // other stores
  const awardedStore = useAwardedStore();
  const historyStore = useHistoryStore();
  // actor
  const actors = ref([...data.actor]);
  const selectedActor = ref(actors.value[0]);
  // progress is used only for timeline in overview
  const progress = ref(1);
  // these are the details from mock data
  const rfqDetails = ref({ ...data.rfq });
  const rfqDeadline = ref(data.deadline);
  const categories = ref([...data.categories]);
  const vendors = ref([...data.vendors]);
  const requirements = ref([...data.requirements]);
  // this is rfq status
  const rfqStatus = ref("draft");
  // this below is used to store the vendor selected in vendor portal
  const vendorSelectedInPortal = ref("select a vendor");
  // this below object stores the price, tax and remark of the requirement lines according to the line id and when submit is click in vendor portal this will be copied to working quotation
  const vendorPortalTempObj = ref({});
  // this below stores the costing snapshot which is used to display the costing even if after displaying it at first, then if we change the awarded vendors we will still see the previous costing because of this and this will update if we click on apply costing button again in costing
  const costingSnapshot = ref([]);
  //  this stores the vendors object accoring to the category, it is ian array of category objects and each category object has category id and vendor list, this vendor list is an array of vendor objects and each vendor object has vendor id and its status which is by default not-sent
  const allocation = ref(
    Object.entries(data.allocation).map(([key, value]) => ({
      id: key,
      vendorList: value.map((vid) => ({
        vendorid: vid,
        status: "not-sent",
      })),
    })),
  );
  // this is the array which stores clarification objects each object has category id, vendor id, question, answer, question id and status whether it is pending or answered, this has a predefined clarification question from mock data
  const clarifications = ref([
    {
      ...data.clarifications,
      qid: `c2_v4_${Date.now()}`,
    },
  ]);
  // this stores the base quotation from mock data and is used whenever we click on simulate then we want the prices, tax and remark of allocated vendors to copy in working quotation, we do not change this
  const baseQuotation = ref({});
  // this stores the intial prices, tax and remarks for allocated vendors and we use this everywhere, we make all the changes on this
  const workingQuotation = ref({});
  // this stores the margin for all requirement lines
  const marginOfAll = ref({});
  // initial margin for all requirement lines according to the default margin of the category they belong to, for example if hotels has default margin 12% then for all requirement lines of hotels, their margin will be 12%
  function initialMarginOfAll() {
    requirements.value.forEach((item) => {
      const margin = categories.value.find(
        (element) => element.id === item.categoryId,
      );
      marginOfAll.value[item.id] = margin.defaultMargin;
    });
  }
  // function called
  initialMarginOfAll();
  // initial data for selected vendors, i.e.., price, tax and remark, initially price is null, tax is 7% and remark is "" for all
  // this function is called for each category and it structures the base and working quotation
  // the vendors in this are from allocation which means that only the vendors which are allocated are present here
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

        // this is the structure
        baseQuotation.value[vid][rid] = { price: null, tax: 7, remark: "" };
        workingQuotation.value[vid][rid] = { price: null, tax: 7, remark: "" };
      }
    }
  }
  // function called for every category
  for (const categoryObj of categories.value) {
    initialQuotation(categoryObj.id);
  }
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
  // find vendor and category name by id
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
  // // this is used to add a vendor of specific category id and vendor id only if it is not already added and it also makes an entry in the audit history and in base quotation and working quotation we add their entry by keeping their intial value as {price=null, tax=7, remark=""}
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
  // this is used to delete a vendor of specific category id and vendor id only if the vendor has not responded yet otherwise alert and it also makes an entry in the audit history
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
  // this function returns an array in which each element is a obj and these object is made for each category for which a requirement line is awarded by a vendor, in each object the base, profit, total is the total of all requirement lines for that specific category while the lines of each category object is an array which store individual objects of the requirement lines which have base, profit and total of each requirement line
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
  // this is used to compute whether the deadline status in overdue, due today or upcoming by comparing today's date and time with deadline's date and time
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
  // this flag is used just for ui in corporate quotation
  const sendToCorporateFlag = ref(false);
  // this is used for getting current date and time and it is used in corporate quotation
  const currentDate = ref(
    new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  );
  const currentTime = ref(
    new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  );
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
    vendorSelectedInPortal,
    allocation,
    clarifications,
    baseQuotation,
    workingQuotation,
    marginOfAll,
    rfqStatus,
    vendorPortalTempObj,
    costingSnapshot,
    sendToCorporateFlag,
    currentDate,
    currentTime,
    initialQuotation,
    extractQuotation,
    addVendor,
    deleteVendor,
    getCostingData,
    vendorName,
    categoryName,
  };
});
