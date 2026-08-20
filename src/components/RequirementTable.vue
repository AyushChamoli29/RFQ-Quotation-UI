<script setup>
import { ref } from "vue";
import data from "@/data/mockData.json";
const array = data.requirementTable;
const hiddenItems = ref({});
const showDetails = (key) => {
  hiddenItems.value[key] = !hiddenItems.value[key];
};
const hideVendors = ref({});
const hide = (item) => {
  hideVendors.value[item] = !hideVendors.value[item];
};
const searchFlag = ref(false);
const showSearchResults = () => {
  searchFlag.value = true;
};
const closeSearchResults = () => {
  searchFlag.value = false;
};
</script>

<template>
  <div class="bg-white py-5 rounded-xl">
    <div class="flex items-center justify-between px-4 mb-3">
      <div class="text-[13px] text-[#6b7090] tracking-wide font-bold px-3">
        REQUIREMENT LINE ITEMS & VENDOR ALLOCATION
      </div>
      <div
        class="bg-indigo-600 text-white font-bold text-[13px] p-2 rounded-lg"
      >
        Send RFQ to allocated vendors(12)
      </div>
    </div>
    <div
      v-for="[key, value] in Object.entries(array)"
      class="border-t border-slate-200 p-1"
    >
      <div>
        <div
          class="flex justify-between items-center hover:bg-[#f4f5fa]"
          @click="showDetails(key)"
        >
          <div class="flex items-center justify-start gap-3 px-4 py-3">
            <span class="font-bold text-[9px]">▹</span
            ><span class="font-bold">{{ key }}</span
            ><span
              class="px-2 outline outline-slate-300 rounded-lg bg-[#eef0f8] text-[11px] text-[#6b7090] font-bold"
              >{{ value.list.length }} lines</span
            >
            <span
              class="text-[11px] bg-[#eeecfb] text-[#3f3ba6] p-1 rounded-lg font-bold px-2"
              >{{ value.vendors.length }} vendors allocated</span
            >
          </div>
          <div class="text-[11px] tracking-wider text-[#6b7090] mr-5">
            Default margin {{ value.defaultMargin }}%
          </div>
        </div>
      </div>
      <div :class="hiddenItems[key] ? 'hidden' : 'block'" class="text-xs">
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
              <tr v-for="item in value.list" class="border-t border-slate-200">
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
        <div class="ml-5 mb-5">
          <p class="mb-1">
            Vendor allocation for this category — each vendor added below
            receives an RFQ scoped only to {{ key }}. Search across the full
            vendor master, or add a brand-new vendor on the fly.
          </p>
          <div class="flex gap-2 mb-1">
            <div
              v-for="item in value.vendors"
              class="bg-[#f7f6fe] text-[#3f3ba6] flex justify-center items-center gap-2 px-2 py-1 rounded-xl outline outline-slate-200"
              :class="hideVendors[item] ? 'hidden' : 'block'"
            >
              <span class="font-bold">
                {{ item }}
              </span>
              <span
                class="bg-[#5b4fe024] text-[#3f3ba6] text-center h-5 w-5 rounded-full cursor-pointer relative group"
                @click="hide(item)"
                >x
                <span
                  class="absolute hidden group-hover:block top-full left-1/2 w-max bg-black text-white p-1"
                  >Remove {{ item }}</span
                ></span
              >
            </div>
          </div>
          <div class="relative">
            <input
              type="text"
              placeholder="Search or add a vendor by name..."
              class="w-1/4 p-2 outline outline-slate-300 rounded-md mt-2"
              @click="showSearchResults"
            />
            <div
              v-if="searchFlag"
              class="absolute top-full left-0 bg-white h-50 overflow-y-scroll"
            >
              <button @click="closeSearchResults">X</button>
              <div v-for="search in value.searchList" class="p-2">
                <span class="font-bold">{{ search.name }}</span
                ><span class="px-1 text-slate-500 bg-slate-200 rounded-lg">{{
                  search.type
                }}</span
                ><br />
                <span>{{ search.customer }}</span
                ><span>{{ search.email }}</span>
              </div>
            </div>
          </div>
          <p v-if="value.vendors.length <= 1" class="mt-1 text-[#b46a06]">
            ⚠ Only one vendor invited for a category with mandatory items —
            consider adding a second vendor for competitive quotes.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
