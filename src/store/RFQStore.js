import { defineStore } from "pinia";
import data from "@/data/mockData.json";

export const useRFQStore = defineStore("RFQ", () => {
  const group = {
    groupName: data.big_card.name,
    companyName: data.big_card.company_name,
    address: data.big_card.address,
    duration: data.big_card["day/night"],
    travellers: data.big_card.travellers,
  };
  const rfqDetails = {
    rfq_no: data.big_card.rfq_no,
    mice_no: data.big_card.mice_no,
    deadline: data.big_card.deadline,
  };
  const categories = {
    c1: { categoryName: "Hotels", lines: 4 },
    c2: { categoryName: "Flights", lines: 4 },
    c3: { categoryName: "Ground Transportation", lines: 4 },
    c4: { categoryName: "Event Management including AV", lines: 5 },
    c5: { categoryName: "Visa Management", lines: 3 },
    c6: { categoryName: "Local Liaison", lines: 4 },
  };
  const vendors = {
    v1: {
      name: "Grand Marina Hotel",
      type: "Hotels",
      customer: "Nattapong S.",
      email: "sales@grandmarinapattaya.example",
      status: "submitted",
    },
    v2: {
      name: "Sunset Bay Resort & Spa",
      type: "Hotels",
      customer: "Kanya P.",
      email: "groups@sunsetbayresort.example",
      status: "submitted",
    },
    v3: {
      name: "Ocean Pearl Hotel Pattaya",
      type: "Hotels",
      customer: "Somchai T.",
      email: "mice@oceanpearl.example",
      status: "submitted",
    },
    v4: {
      name: "SkyBridge Airlines",
      type: "Flights",
      customer: "Anurag Mehta",
      email: "groupdesk@skybridgeair.example",
      status: "submitted",
    },
    v5: {
      name: "Horizon Charter Airways",
      type: "Flights",
      customer: "Priya Nair",
      email: "charter@horizonair.example",
      status: "submitted",
    },
    v6: {
      name: "CityLine Transport",
      type: "Ground Transportation",
      customer: "Wichai R.",
      email: "ops@citylinetransport.example",
      status: "submitted",
    },
    v7: {
      name: "Pattaya Premier Coaches",
      type: "Ground Transportation",
      customer: "Suda M.",
      email: "bookings@premiercoaches.example",
      status: "submitted",
    },
    v8: {
      name: "EventSphere Productions",
      type: "Event Management including AV",
      customer: "Rahul Kapoor",
      email: "events@eventsphere.example",
      status: "submitted",
    },
    v9: {
      name: "Stellar Events co.",
      type: "Event Management including AV",
      customer: "Meera Iyer",
      email: "produnction@stellarevents.example",
      status: "partially submitted",
    },
    v10: {
      name: "GlobalVisa Facilitation",
      type: "Visa Management",
      customer: "Karan Sethi",
      email: "corporate@globalvisa.example",
      status: "submitted",
    },
    v11: {
      name: "Destination Connect DMC",
      type: "Local Liaison",
      customer: "Ploy K.",
      email: "dmc@destinationconnect.example",
      status: "submitted",
    },
    v12: {
      name: "LocalPro Thailand Services",
      type: "Local Liaison",
      customer: "Anong W.",
      email: "support@localprothailand.example",
      status: "declined",
    },
  };
  const requirementTableData = data.requirementTable;
  return { group, rfqDetails, categories, vendors, requirementTableData };
});
