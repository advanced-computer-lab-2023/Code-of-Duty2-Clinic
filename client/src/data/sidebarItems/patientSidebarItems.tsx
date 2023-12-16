import HomeIcon from "@mui/icons-material/Home";
import MedicineIcon from "@mui/icons-material/Medication";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import WalletIcon from "@mui/icons-material/Wallet";
import ChatIcon from "@mui/icons-material/Chat";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddOutlined from "@mui/icons-material/PersonAddOutlined";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCardIcon from "@mui/icons-material/AddCard";
import ListIcon from "@mui/icons-material/List";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import TimelineIcon from "@mui/icons-material/Timeline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PasswordIcon from "@mui/icons-material/Password";
import RequestIcon from "@mui/icons-material/Reviews";

import {
  addFamilyMemberRoute,
  patientDashboardRoute,
  patientAppointmentsRoute,
  createPatientWalletRoute,
  patientWalletRoute,
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
  chatsRoute,
  patientDoctorsRoute,
  followUpRequestsRoute
} from "../routes/patientRoutes";
export const patientSidebarItems = [
  {
    title: "Home",
    icon: <HomeIcon />,
    items: [
      {
        title: "Dashboard",
        href: patientDashboardRoute.path,
        icon: <DashboardIcon />
      },
      {
        title: "My Prescriptions",
        href: patientPrescriptions.path,
        icon: <HomeIcon />,
      },
    ],
  },
  {
    title: "My Family",
    icon: <FamilyRestroomIcon />,
    items: [
      {
        title: "View My Family Members",
        href: familyMembersRoute.path,
        icon: <PeopleIcon />
      },
      {
        title: "Add a Family Member",
        href: addFamilyMemberRoute.path,
        icon: <PersonAddIcon />
      },
      {
        title: "Add a Registered Family Member",
        href: addRegisteredFamilyMemberRoute.path,
        icon: <PersonAddOutlined />
      }
    ]
  },
  {
    title: "Interact with Doctors",
    icon: <VaccinesIcon />,
    items: [
      {
        title: "All Doctors",
        href: viewAllDoctorsRoute.path,
        icon: <MedicineIcon />
      },
      {
        title: "My Doctors",
        href: patientDoctorsRoute.path,
        icon: <PersonIcon />
      },
      {
        title: "My Chats",
        href: chatsRoute.path,
        icon: <ChatIcon />
      },
      {
        title: "My Appointments",
        href: patientAppointmentsRoute.path,
        icon: <CalendarMonthIcon />
      },
      {
        title: "My Follow Up Requests",
        href: followUpRequestsRoute.path,
        icon: <RequestIcon />
      },
      {
        title: "Book an Appointment",
        href: appointmentBookingRoute.path,
        icon: <MoreTimeIcon />
      }
    ]
  },
  {
    title: "Health Packages",
    icon: <MedicalInformationIcon />,
    items: [
      {
        title: "Health Package Options",
        href: healthPackagesOptionsRoute.path,
        icon: <ListIcon />
      },
      {
        title: "My Health Package Status",
        href: cancelSubscriptionRoute.path,
        icon: <MoreHorizIcon />
      },
      {
        title: "My Health Package Benefits",
        href: subscribedPackageBenefitsRoute.path,
        icon: <AutoAwesomeIcon />
      }
    ]
  },
  {
    title: "Wallets",
    icon: <WalletIcon />,
    items: [
      {
        title: "My Wallet",
        href: patientWalletRoute.path,
        icon: <AccountBalanceWalletIcon />
      },
      {
        title: "Create a Wallet",
        href: createPatientWalletRoute.path,
        icon: <AddCardIcon />
      }
    ]
  },
  {
    title: "Medical History",
    icon: <MonitorHeartIcon />,
    items: [
      {
        title: "View My Medical History",
        href: patientMedicalHistoryRoute.path,
        icon: <TimelineIcon />
      }
    ]
  },

  {
    title: "My Account",
    icon: <ManageAccountsIcon />,
    items: [
      {
        title: "Change Password",
        href: `${patientUpdatePasswordRoute.path}?type=patient`,
        icon: <PasswordIcon />
      }
    ]
  }
];
