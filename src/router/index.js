import Overview from "@/views/Overview.vue";
import VendorPortal from "@/views/VendorPortal.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "overview",
      component: Overview,
    },
    {
      path:"/vendorPortal",
      name:"vendorPortal",
      component:VendorPortal
    }
  ],
});

export default router;
