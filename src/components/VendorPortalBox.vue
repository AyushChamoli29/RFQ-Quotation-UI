<script setup>
import { defineProps, ref, onMounted, watch, computed } from "vue";
import { useRFQMainStore } from "@/store/RFQStoreMain.js";
import VendorPortalTable from "./VendorPortalTable.vue";
import VendorPortalCard from "./VendorPortalCard.vue";
import { useHistoryStore } from "@/store/auditHistory.js";
const rfq = useRFQMainStore();
const historyStore = useHistoryStore();
const prop = defineProps({
  vendorid: String,
});
const currentDate = new Date().toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const currentTime = new Date().toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
function getvendorName(vid) {
  for (const element of rfq.vendors) {
    if (vid !== "select a vendor" && vid === element.id) {
      return element.name;
    }
  }
}
function findCategoryID(vendorid) {
  for (const element of rfq.vendors) {
    for (const item of rfq.categories) {
      if (
        element.id === vendorid &&
        element.type.toLowerCase() === item.name.toLowerCase()
      ) {
        return item.id;
      }
    }
  }
}
console.log(rfq.vendorPortalTempObj);
watch(
  () => prop.vendorid,
  () => {
    const data = rfq.workingQuotation[prop.vendorid];

    if (data) {
      rfq.vendorPortalTempObj = JSON.parse(JSON.stringify(data));

      for (const lineId in data) {
        if (!rfq.vendorPortalTempObj[lineId]) {
          rfq.vendorPortalTempObj[lineId] = {
            price: null,
            tax: 7,
            remark: "",
          };
        }
      }
    }
  },
  { immediate: true },
);
const submitQuotation = () => {
  const newData = rfq.vendorPortalTempObj;

  let filledCount = 0;
  let totalCount = 0;

  for (const lineId in newData) {
    totalCount++;

    if (newData[lineId].price !== null && newData[lineId].price !== "") {
      filledCount++;
    }
  }

  //  No price entered
  if (filledCount === 0) {
    alert("Please enter at least one line item before submitting.");
    return;
  }

  const oldData = rfq.workingQuotation[prop.vendorid] || {};
  for (const key of Object.keys(newData)) {
    const oldLine = oldData[key] || {};
    const newLine = newData[key] || {};
    if (oldLine.price !== newLine.price) {
      const line = rfq.requirements.find((r) => r.id === key);
      const oldValue = oldLine.price === null ? "blank" : oldLine.price;
      const newValue = newLine.price === null ? "blank" : newLine.price;
      historyStore.historyEntry({
        actor: rfq.selectedActor.name,
        roleOrCompany: rfq.selectedActor.role,
        action: "Vendor updated quotation line",
        vendor: rfq.vendorName(prop.vendorid),
        category: rfq.categoryName(findCategoryID(prop.vendorid)),
        detail: `${line?.name || key} - rate: ${oldValue} => ${newValue.toLocaleString(
          "en-IN",
          {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
          },
        )}`,
      });
    }
    if (oldLine.tax !== newLine.tax) {
      const line = rfq.requirements.find((r) => r.id === key);
      const oldValue = oldLine.tax;
      const newValue = newLine.tax;
      historyStore.historyEntry({
        actor: rfq.selectedActor.name,
        roleOrCompany: rfq.selectedActor.role,
        action: "Vendor updated quotation line",
        vendor: rfq.vendorName(prop.vendorid),
        category: rfq.categoryName(findCategoryID(prop.vendorid)),
        detail: `${line?.name || key} - tax %: ${oldValue} => ${newValue}`,
      });
    }
    if (oldLine.remark !== newLine.remark) {
      const line = rfq.requirements.find((r) => r.id === key);
      const oldValue = oldLine.remark === "" ? "blank" : oldLine.remark;
      const newValue = newLine.remark === "" ? "blank" : newLine.remark;
      historyStore.historyEntry({
        actor: rfq.selectedActor.name,
        roleOrCompany: rfq.selectedActor.role,
        action: "Vendor updated quotation line",
        vendor: rfq.vendorName(prop.vendorid),
        category: rfq.categoryName(findCategoryID(prop.vendorid)),
        detail: `${line?.name || key} - remarks: "${oldValue}" => "${newValue}"`,
      });
    }
  }

  // this is the audit history for whenever there are changes in vendor portal, this is just for price and this is not working because in 7th line below the condition is always false because when we change something in vendorPortal temp object it reflects in rfq.workingQuotation so you have to check this later

  // const oldData = rfq.workingQuotation[prop.vendorid] || {};
  // for (const key of Object.keys(data)) {
  //   const newLine = data[key] || {};
  //   const oldLine = oldData[key] || {};
  //   console.log("OLD", oldData);
  //   console.log("NEW", data);
  //   if (newLine.price !== oldLine.price) {
  //     const line = rfq.requirements.find((r) => r.id === key);

  //     const oldValue = oldLine.price === null ? "blank" : oldLine.price;

  //     const newValue = newLine.price === null ? "blank" : newLine.price;
  //     historyStore.historyEntry({
  //       actor: rfq.selectedActor.name,
  //       roleOrCompany: rfq.selectedActor.role,
  //       action: "Vendor updated quotation line",
  //       vendor: rfq.vendorName(prop.vendorid),
  //       category: rfq.categoryName(findCategoryID(prop.vendorid)),
  //       detail: `${line?.name || key} - rate: ${oldValue} => ${newValue}`,
  //     });
  //   }
  // }

  //  Save data
  rfq.workingQuotation[prop.vendorid] = {
    ...rfq.vendorPortalTempObj,
  };

  //  Decide status
  let newStatus = "";

  if (filledCount === totalCount) {
    newStatus = "submitted";
  } else {
    newStatus = "partially submitted";
  }

  //  Update vendor status
  for (const category of rfq.allocation) {
    const vendor = category.vendorList.find(
      (v) => v.vendorid === prop.vendorid,
    );

    if (vendor) {
      vendor.status = newStatus;
    }
  }

  alert("Quotation submitted successfully");
};
const categoryid = computed(() => {
  let name;
  for (const element of rfq.vendors) {
    if (element.id === prop.vendorid) {
      name = element.type;
    }
  }
  for (const element of rfq.categories) {
    if (element.name === name) {
      return element.id;
    }
  }
});
const vendorStatus = computed(() => {
  for (const element of rfq.allocation) {
    if (element.id === categoryid.value) {
      for (const item of element.vendorList) {
        if (item.vendorid === prop.vendorid) {
          return item.status;
        }
      }
    }
  }
});
</script>

<template>
  <div
    class="bg-[#fff7e6] text-[#7a5300] border border-[#f3dda3] text-[12.5px] p-2 ml-2 rounded-lg"
  >
    🔒 <span class="font-bold">Confidential quotation request.</span> This link
    is unique to
    {{ getvendorName(prop.vendorid) }}
    and must not be shared. You can see only the requirement scoped to your
    invitation.
  </div>
  <br />
  <div class="flex flex-col gap-5 ml-2">
    <VendorPortalCard />
    <VendorPortalTable :vendorid="prop.vendorid" />
    <div class="bg-white text-xs p-4 h-max flex flex-col gap-2">
      <p class="text-[#3a3f58] font-bold">General proposal / covering note</p>
      <textarea
        class="w-full h-20 border border-slate-200 py-2 px-4 rounded-lg"
      >
Pleased to support this movement &mdash; happy to discuss further.</textarea
      >
      <p class="text-[#3a3f58] font-bold">
        Attach supporting proposal document
      </p>
      <span
        v-if="
          vendorStatus !== 'submitted' && vendorStatus !== 'partially submitted'
        "
        ><button class="bg-[#e9e9ee] font-semibold py-1 px-2 border mr-2">
          Choose file</button
        ><span>No file chosen</span></span
      >
      <span
        v-if="
          vendorStatus === 'submitted' || vendorStatus === 'partially submitted'
        "
        class="text-[#3a3f58] font-bold"
        >&mdash;</span
      >
    </div>
    <div
      v-if="
        vendorStatus === 'submitted' || vendorStatus === 'partially submitted'
      "
      class="bg-white rounded-xl p-4 px-6 text-xs flex justify-between items-center"
    >
      <div class="text-[#6b7090]">
        Submitted on {{ currentDate }}, {{ currentTime }}
      </div>
      <div
        class="text-[#3a3f58] font-bold w-max border border-[#e3e5f0] hover:bg-[#ebecf7] py-3 px-4 rounded-lg cursor-pointer"
      >
        Download Acknowledgement
      </div>
    </div>
    <div
      v-if="
        rfq.rfqStatus === 'allocated' &&
        vendorStatus !== 'submitted' &&
        vendorStatus !== 'partially submitted'
      "
      class="bg-white rounded-xl p-4 px-6 text-xs flex justify-between items-center"
    >
      <div class="text-[#6b7090]">
        Save as draft any time &mdash; submitting locks your quotation for this
        RFQ.
      </div>
      <div
        class="text-[#3a3f58] font-bold w-max border border-[#e3e5f0] hover:bg-[#ebecf7] py-3 px-4 rounded-lg cursor-pointer"
      >
        Save draft
      </div>
      <div
        class="py-3 px-4 rounded-lg font-bold text-white bg-[#4d3fc9] cursor-pointer"
        @click="submitQuotation"
      >
        Submit quotation
      </div>
    </div>
  </div>
</template>
