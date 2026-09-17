import { defineStore } from "pinia";
import { ref } from "vue";
import data from "@/data/mockData.json";

export const useAwardedStore = defineStore("awarded", () => {
  const requirementLines = {
    Hotels: [
      {
        id: "R1",
        name: "Deluxe Twin Room",
        awarded: false,
      },
      {
        id: "R2",
        name: "Executive Suite",
        awarded: false,
      },
      {
        id: "R3",
        name: "Extra Bed with Breakfast",
        awarded: false,
      },
      {
        id: "R4",
        name: "Porterage and Welcome Drink",
        awarded: false,
      },
    ],
    Flights: [
      {
        id: "R5",
        name: "Outbound Economy Class Airfare",
        awarded: false,
      },
      {
        id: "R6",
        name: "Return Economy Class Airfare",
        awarded: false,
      },
      {
        id: "R7",
        name: "Outbound Buisness Class Airfare",
        awarded: false,
      },
      {
        id: "R8",
        name: "Group Air Ticketing and Manifest Management",
        awarded: false,
      },
    ],
    "Ground Transportation": [
      {
        id: "R9",
        name: "Arrival Airport Transfer by 45-Seater Coach",
        awarded: false,
      },
      {
        id: "R10",
        name: "Departure Airport Transfer by 45-Seater Coach",
        awarded: false,
      },
      {
        id: "R11",
        name: "Full-Day Coach Disposal",
        awarded: false,
      },
      {
        id: "R12",
        name: "VIP Sedan Airport Transfers",
        awarded: false,
      },
    ],
    "Event Management including AV": [
      {
        id: "R13",
        name: "Gala Dinner Venue Rental",
        awarded: false,
      },
      {
        id: "R14",
        name: "Stage, Backdrop and Basic Branding",
        awarded: false,
      },
      {
        id: "R15",
        name: "LED Wall 24ft X 10ft",
        awarded: false,
      },
      {
        id: "R16",
        name: "Professional Sound System",
        awarded: false,
      },
      {
        id: "R17",
        name: "Event Photography and Highlight Video",
        awarded: false,
      },
    ],
    "Visa Management": [
      {
        id: "R18",
        name: "Tourist Visa Government Fee",
        awarded: false,
      },
      {
        id: "R19",
        name: "Visa Processing and Service Fee",
        awarded: false,
      },
      {
        id: "R20",
        name: "Travel Insurance",
        awarded: false,
      },
    ],
    "Local Liason": [
      {
        id: "R21",
        name: "Lead Local Coordinator",
        awarded: false,
      },
      {
        id: "R22",
        name: "Assistant Coordinators",
        awarded: false,
      },
      {
        id: "R23",
        name: "Airport Representatives",
        awarded: false,
      },
      {
        id: "R24",
        name: "Local SIM Cards with Data",
        awarded: false,
      },
    ],
  };
  const costVersions = ref([]);
  const awardedLines = ref([]);
  return { requirementLines, costVersions, awardedLines };
});
