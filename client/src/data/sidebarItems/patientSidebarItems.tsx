import HomeIcon from "@mui/icons-material/Home";
import MedicineIcon from "@mui/icons-material/Medication";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";

import {
  addFamilyMemberRoute,
  patientDashboardRoute,
  patientAppointmentsRoute,
  patientFamilyMembersRoute,
  searchForDoctorsRoute,
  viewAllDoctorsRoute,
  patientPrescriptions,
  patientMedicalHistoryRoute,
  patientUpdatePasswordRoute,
  cancelSubscriptionRoute,
  familyMembersRoute,
  healthPackagesOptionsRoute,
  subscribedPackageBenefitsRoute,
  addRegisteredFamilyMemberRoute,
} from "../routes/patientRoutes";

export const patientSidebarItems = [
  {
    title: "Home",
    items: [
      {
        title: "Home",
        href: patientDashboardRoute.path,
        icon: <HomeIcon />,
      },
      {
        title: "My Prescriptions",
        href: patientPrescriptions.path,
        icon: <HomeIcon />,
      },
    ],
  },
  {
    title: "Interact with Doctors",
    items: [
      {
        title: "View Doctors",
        href: viewAllDoctorsRoute.path,
        icon: <MedicineIcon />,
      },
      {
        title: "Search for Doctors",
        href: searchForDoctorsRoute.path,
        icon: <SearchIcon />,
      },
      {
        title: "View my Appointments",
        href: patientAppointmentsRoute.path,
        icon: <PersonIcon />,
      },
    ],
  },
  {
    title: "My Account",
    items: [
      {
        title: "My Medical History",
        href: patientMedicalHistoryRoute.path,
        icon: <PeopleIcon />,
      },
      {
        title: "My Health Package Status",
        href: cancelSubscriptionRoute.path,
        icon: <PeopleIcon />,
      },
      {
        title: "My Health Package Benefits",
        href: subscribedPackageBenefitsRoute.path,
        icon: <PeopleIcon />,
      },
      {
        title: "Health Package Options",
        href: healthPackagesOptionsRoute.path,
        icon: <PeopleIcon />,
      },
      {
        title: "Update Password",
        href: `${patientUpdatePasswordRoute.path}?type=patient`,
        icon: <PeopleIcon />,
      },
    ],
  },
  {
    title: "My Family Members",
    items: [
      {
        title: "View my family members",
        href: familyMembersRoute.path,
        icon: <PeopleIcon />,
      },
      {
        title: "View Registered Family Members",
        href: patientFamilyMembersRoute.path,
        icon: <PeopleIcon />,
      },
      {
        title: "Add a family member",
        href: addFamilyMemberRoute.path,
        icon: <PeopleIcon />,
      },
      {
        title: "My Medical History",
        href: patientMedicalHistoryRoute.path,
        icon: <PeopleIcon />,
      },

      {
        title: "Add a Registered Family Member",
        href: addRegisteredFamilyMemberRoute.path,
        icon: <PeopleIcon />,
      },
    ],
  },
];
