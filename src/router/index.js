import AgentWorkspace from "@/views/AgentWorkspace.vue";
import AuditHistory from "@/views/AuditHistory.vue";
import CorporateQuotation from "@/views/CorporateQuotation.vue";
import Costing from "@/views/Costing.vue";
import Overview from "@/views/Overview.vue";
import Requirements from "@/views/Requirements.vue";
import VendorPortal from "@/views/VendorPortal.vue";
import VendorResponses from "@/views/VendorResponses.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "agentWorkspace",
      component: AgentWorkspace,
      children: [
        {
          path: "",
          redirect: "overview",
        },
        {
          path: "overview",
          name: "overview",
          component: Overview,
        },
        {
          path: "vendorResponses",
          name: "vendorResponses",
          component: VendorResponses,
        },
        {
          path: "costing",
          name: "costing",
          component: Costing,
        },
        {
          path: "corporate",
          name: "corporate",
          component: CorporateQuotation,
        },
        {
          path: "auditHistory",
          name: "auditHistory",
          component: AuditHistory,
        },
        {
          path: "requirements",
          name: "requirements",
          component: Requirements,
        },
      ],
    },
    {
      path: "/vendorPortal",
      name: "vendorPortal",
      component: VendorPortal,
    },
  ],
});

export default router;
