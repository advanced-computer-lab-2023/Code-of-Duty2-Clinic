import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import {
  doctorAppointmentsRoute,
  doctorDashboardRoute,
  doctorRegisteredPatientsRoute,
  updateAccountInfoRoute,
  doctorUpdatePasswordRoute,
  addDoctorAvailableTimeSlotsRoute,
  doctorWalletRoute,
  doctorWalletCreationRoute,
  followUpRequestsRoute,
  videoCallRoute,
  doctorScheduleRoute
} from "../routes/doctorRoutes";
import PeopleIcon from "@mui/icons-material/People";
import PlusIcon from "@mui/icons-material/AddBox";
import RequestIcon from "@mui/icons-material/Reviews";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { VideoCall } from "@mui/icons-material";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ContactsIcon from "@mui/icons-material/Contacts";
import PasswordIcon from "@mui/icons-material/Password";
export const doctorSidebarItems = [
  {
    title: "Home",
    items: [
      {
        title: "Home",
        href: doctorDashboardRoute.path,
        icon: <HomeIcon />
      }
    ],
    icon: <HomeIcon />
  },
  {
    title: "My Account",
    items: [
      {
        title: "Update Account Info",
        href: updateAccountInfoRoute.path,
        icon: <PersonIcon />
      },
      {
        title: "Change Password",
        href: `${doctorUpdatePasswordRoute.path}?type=doctor`,
        icon: <PersonIcon />
      },
      { title: "My Schedule", href: doctorScheduleRoute.path, icon: <PersonIcon /> }
    ],
    icon: <ManageAccountsIcon />
  },
  {
    title: "Wallets",
    items: [
      {
        title: "View my wallet",
        href: doctorWalletRoute.path,
        icon: <WalletIcon />
      },
      {
        title: "Create a wallet",
        href: doctorWalletCreationRoute.path,
        icon: <WalletIcon />
      }
    ],
    icon: <WalletIcon />
  },
  {
    title: "Patients",
    items: [
      {
        title: "View my patients",
        href: doctorRegisteredPatientsRoute.path,
        icon: <PeopleIcon />
      },
      {
        title: "View my appointments",
        href: doctorAppointmentsRoute.path,
        icon: <PeopleIcon />
      },
      {
        title: "Follow up requests",
        href: followUpRequestsRoute.path,
        icon: <RequestIcon />
      },
      {
        title: "Add Available Time Slots",
        href: addDoctorAvailableTimeSlotsRoute.path,
        icon: <PlusIcon />
      },
      {
        title: "Video meeting",
        href: videoCallRoute.path,
        icon: <VideoCall />
      }
    ],
    icon: <ContactsIcon />
  }
];
