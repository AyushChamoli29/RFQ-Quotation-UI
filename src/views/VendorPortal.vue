<script setup>
import data from "@/data/mockData.json"
import { ref } from "vue";
const vendor=ref('select a vendor')
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex bg-white p-5 mt-5 ml-2 rounded-xl gap-5 justify-start items-center outline outline-slate-200">
            <div>
                <p class="text-xs font-[650]">Simulate secure vendor acess link for</p>
                <select class="text-[13px] outline outline-slate-200 p-2 rounded-lg mt-1" v-model="vendor">
                    <option value="select a vendor">&mdash; Select a vendor &mdash;</option>
                    <option v-for="item in data.vendor_portal" :value="item.name">{{ item.name }} ({{ item.type }})</option>
                </select>
            </div>
            <div class="text-[11px] text-slate-500 w-122">In production each vendor receives a unique, expiring link — here you can switch identities to see exactly what each vendor sees.</div>
        </div>
        <div>
            <div v-if="vendor==='select a vendor'" class="h-40 w-full ml-2 p-5 flex flex-col gap-2 justify-center items-center bg-white outline outline-slate-200 rounded-lg">
                <span class="text-4xl">🔗</span>
                <p class="font-semibold text-xl">Select a vendor to preview their portal</p>
            </div>
            <div v-if="vendor!=='select a vendor'" class="h-50 w-full ml-2 p-5 flex flex-col gap-2 justify-center items-center bg-white outline outline-slate-200 rounded-lg">
                <span class="text-4xl">📭</span>
                <p class="font-bold text-xl">No active RFQ invitations</p>
                <p class="font-normal text-slate-500 text-base">{{ vendor }} has not been allocated to this RFQ, or the RFQ has not been dispatched yet.</p>
            </div>
        </div>
    </div>
</template>