<script setup>
import Data from "@/data/mockData.json";
import { computed, defineProps, ref, watch } from "vue";
import { useHistoryStore } from "@/store/auditHistory";
import { useFlagsStore } from "@/store/flag";
import { useVendorStore } from "@/store/requirementsVendor";
const historyStore = useHistoryStore();
const flags = useFlagsStore();
const vendorsStore = useVendorStore();
const props = defineProps({
  name: String,
  value: Object,
});
const name = ref(props.name);
const data = ref(props.value);
const vendors = computed(() => {
  const category = vendorsStore.currentVendors.find((item) => {
    return item.type === props.name;
  });
  if (!category) return [];
  return category.VendorList.map((obj) => {
    const vendor = Data.vendor_portal.find((element) => {
      return element.id === obj.id;
    });
    return vendor.name;
  });
});
const searchList = computed(() => {
  const categoryVendor = vendorsStore.currentVendors.find(
    (element) => element.type === props.name,
  );
  if (!categoryVendor) return [];
  return Data.vendor_portal.filter((item) => {
    return !categoryVendor.VendorList.some((vendor) => vendor.id === item.id);
  });
});
const searchValue = ref("");
const arrow = ref(false);
const hiddenItems = ref({});
const showDetails = (key) => {
  arrow.value = !arrow.value;
  hiddenItems.value[key] = !hiddenItems.value[key];
};
const searchFlag = ref(false);
const showSearchResults = (search) => {
  searchFlag.value = true;
  searchList.value = props.value.searchList.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
    );
  });
};
watch(searchValue, (newSearch) => {
  showSearchResults(newSearch);
});
const closeSearchResults = () => {
  searchFlag.value = false;
};
const addToVendor = (id, name) => {
  const category = vendorsStore.currentVendors.find((item) => {
    return item.type === props.name;
  });
  const vendor = Data.vendor_portal.find((element) => {
    return element.id === id;
  });
  if (category && vendor) {
    category.VendorList.push({ id: vendor.id, simulated: false });
  }
  searchList.value = searchList.value.filter((item) => {
    return item.id !== id;
  });
  closeSearchResults();
  historyStore.historyEntry({
    actor: flags.selectedActor.name,
    roleOrCompany: flags.selectedActor.role,
    action: "Vendor allocated to category",
    vendor: name,
    category: props.name,
    detail: `${name} added to ${props.name} (primary category:${vendor.type})`,
  });
};
const deleteVendor = (item, index) => {
  const category = vendorsStore.currentVendors.find((element) => {
    return element.type === props.name;
  });
  if (category.VendorList[index].simulated === false) {
    category.VendorList.splice(index, 1);
  } else if (category.VendorList[index].simulated === true) {
    alert(
      `${item} has already submitted a quotation for this RFQ and cannot be silently removed. Exclude their quote at the award stage instead, or discuss a formal withdrawal with them first.`,
    );
  }
  historyStore.historyEntry({
    actor: flags.selectedActor.name,
    roleOrCompany: flags.selectedActor.role,
    action: "Vendor removed from category allocation",
    vendor: item,
    category: props.name,
  });
};
vendorsStore.totalVendors = computed(() => {
  let sum = 0;
  for (const element of vendorsStore.currentVendors) {
    sum += element.VendorList.length;
  }
  return sum;
});
</script>

<template>
  <div>
    <!-- Initial Data -->
    <div
      class="flex justify-between items-center hover:bg-[#f4f5fa]"
      @click="showDetails(name)"
    >
      <div class="flex items-center justify-start gap-3 px-4 py-3">
        <span v-if="arrow" class="font-bold text-[#9ba0c0] text-[9px]">▹</span
        ><span v-if="!arrow" class="font-bold text-[#9ba0c0] text-[9px]">▾</span
        ><span class="font-bold">{{ name }}</span
        ><span
          class="px-2 outline outline-slate-300 rounded-lg bg-[#eef0f8] text-[11px] text-[#6b7090] font-bold"
          >{{ data.list.length }} lines</span
        >
        <span
          class="text-[11px] bg-[#eeecfb] text-[#3f3ba6] p-1 rounded-lg font-bold px-2"
          >{{ vendors.length }} vendors allocated</span
        >
      </div>
      <div class="text-[11px] tracking-wider text-[#6b7090] mr-5">
        Default margin {{ data.defaultMargin }}%
      </div>
    </div>
  </div>
  <!-- Requirement Table -->
  <div :class="hiddenItems[name] ? 'hidden' : 'block'" class="text-xs">
    <div class="p-5">
      <table class="w-full table-fixed">
        <thead class="text-[10px] tracking-wider text-[#6b7090]">
          <tr class="text-left">
            <th class="w-6/11 pb-3 pl-5">PARTICULAR</th>
            <th class="w-1/11 pb-3">QTY</th>
            <th class="w-2/11 pb-3">UNIT</th>
            <th class="w-2/11 pb-3">REQUIREMENT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.list" class="border-t border-slate-200">
            <td class="py-4 pl-5">
              <div>
                <span
                  v-if="item.requirement === 'Mandatory'"
                  class="text-red-600"
                  >*</span
                >
                <span class="font-bold ml-5">{{ item.room }}</span>
              </div>
              <div class="ml-5 text-[#6b7090]">{{ item.details }}</div>
            </td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.unit }}</td>
            <td class="text-[11px]">
              <span
                class="p-1 bg-[#eef0f8] text-[#6b7090] font-bold rounded-lg"
                :class="{
                  'text-[#c02d3c] bg-[#fbe6e8]':
                    item.requirement === 'Mandatory',
                }"
                >{{ item.requirement }}</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Requirement Vendors -->
    <div class="ml-5 mb-5">
      <p class="mb-1">
        Vendor allocation for this category — each vendor added below receives
        an RFQ scoped only to {{ name }}. Search across the full vendor master,
        or add a brand-new vendor on the fly.
      </p>
      <div v-if="vendors.length >= 1" class="flex gap-2 mb-1 flex-wrap">
        <div
          v-for="(item, index) in vendors"
          class="bg-[#f7f6fe] text-[#3f3ba6] flex justify-center items-center gap-2 px-2 py-1 rounded-xl outline outline-slate-200"
        >
          <span class="font-bold">
            {{ item }}
          </span>
          <span
            class="bg-[#5b4fe024] text-[#3f3ba6] text-center h-5 w-5 rounded-full cursor-pointer relative group"
            @click="deleteVendor(item, index)"
            >x
            <span
              class="absolute hidden group-hover:block top-full left-1 z-5 w-max bg-black text-white p-1"
              >Remove {{ item }}</span
            ></span
          >
        </div>
      </div>
      <p v-else class="text-[#9ba0c0] text-[12.5px]">
        No vendors allocated yet.
      </p>
      <!-- Requirement Search -->
      <div class="relative">
        <input
          type="text"
          placeholder="Search or add a vendor by name..."
          class="w-1/4 p-2 outline outline-slate-300 rounded-md mt-2"
          v-model="searchValue"
          @click="showSearchResults(searchValue)"
        />
        <div
          v-if="searchFlag"
          class="absolute top-full left-0 bg-white max-h-60 overflow-y-auto rounded-lg outline outline-slate-300"
        >
          <button @click="closeSearchResults" class="pl-2 text-sm">X</button>
          <div
            v-for="(search, index) in searchList"
            class="p-2 border-t border-slate-200"
            @click="addToVendor(search.id, search.name)"
          >
            <span class="font-bold">{{ search.name }}</span
            ><span
              class="px-2 p-1 ml-2 text-[#6b7090] bg-[#eef0f8] rounded-lg text-[11px] font-bold"
              >{{ search.type }}</span
            ><br />
            <span class="text-[#6b7090]">{{ search.customer }}</span
            ><span class="text-[#6b7090] px-1 text-lg">&middot;</span
            ><span class="text-[#6b7090]">{{ search.email }}</span>
          </div>
        </div>
      </div>
      <p v-if="vendors.length === 1" class="mt-1 text-[#b46a06]">
        ⚠ Only one vendor invited for a category with mandatory items — consider
        adding a second vendor for competitive quotes.
      </p>
      <p v-else-if="vendors.length < 1" class="mt-1 text-[#b46a06]">
        ⚠ No vendor allocated — this category will not be included when the RFQ
        is sent.
      </p>
    </div>
  </div>
</template>
