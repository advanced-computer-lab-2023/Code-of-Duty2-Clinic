import HomeIcon from "@mui/icons-material/Home";
import MedicineIcon from "@mui/icons-material/Medication";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import WalletIcon from "@mui/icons-material/Wallet";

import {
  addFamilyMemberRoute,
  patientDashboardRoute,
  patientAppointmentsRoute,
  createPatientWalletRoute,
  patientWalletRoute,
  patientFamilyMembersRoute,
  viewAllDoctorsRoute,
  patientPrescriptions,
  patientMedicalHistoryRoute,
  patientUpdatePasswordRoute,
  cancelSubscriptionRoute,
  familyMembersRoute,
  healthPackagesOptionsRoute,
  subscribedPackageBenefitsRoute,
  addRegisteredFamilyMemberRoute,
  appointmentBookingRoute,
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
        title: "Add a Registered Family Member",
        href: addRegisteredFamilyMemberRoute.path,
        icon: <PeopleIcon />,
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
        title: "Book an appointment",
        href: appointmentBookingRoute.path,
        icon: <PersonIcon />,
      },
      {
        title: "View my Appointments",
        href: patientAppointmentsRoute.path,
        icon: <PersonIcon />,
      },
    ],
  },
  {
    title: "Health Packages",
    items: [
      {
        title: "Health Package Options",
        href: healthPackagesOptionsRoute.path,
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
    ],
  },
  {
    title: "Wallets",
    items: [
      {
        title: "View My Wallet",
        href: patientWalletRoute.path,
        icon: <WalletIcon />,
      },
      {
        title: "Create A Wallet",
        href: createPatientWalletRoute.path,
        icon: <WalletIcon />,
      },
    ],
  },
  {
    title: "Medical History",
    items: [
      {
        title: "My Medical History",
        href: patientMedicalHistoryRoute.path,
        icon: <PeopleIcon />,
      },
    ],
  },

  {
    title: "My Account",
    items: [
      {
        title: "Update Password",
        href: `${patientUpdatePasswordRoute.path}?type=patient`,
        icon: <PeopleIcon />,
      },
    ],
  },
];
