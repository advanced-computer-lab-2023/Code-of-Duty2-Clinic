import { adminSidebarItems, doctorSidebarItems, patientSidebarItems } from "../data/sidebarItems";

function getRequiredSidebarItems(firstPath: string) {
    switch (firstPath) {
      case "patient":
        return patientSidebarItems;
      case "doctor":
        return doctorSidebarItems;
      case "admin":
        return adminSidebarItems;
      default:
        return [];
    }
}

export default getRequiredSidebarItems;