<script setup>
const goToAuditHistory = () => {};
</script>

<template>
  <div
    class="flex flex-wrap justify-between bg-white p-5 rounded-xl shadow-sm shadow-slate-300"
  >
    <div class="flex flex-col gap-2">
      <p class="font-bold text-[13px] tracking-wider text-slate-500">
        RECENT ACTIVITY
      </p>
      <p class="text-slate-500 text-sm tracking-tight">
        No activity recorded yet &mdash; allocate a vendor send the RFQ to see
        it appear here
      </p>
    </div>
    <RouterLink to="/auditHistory">
      <div
        class="bg-white text-[#3936be] p-2 text-[13px] font-bold cursor-pointer tracking-tight"
      >
        View full audit history <span>→</span>
      </div>
    </RouterLink>
  </div>
</template>
