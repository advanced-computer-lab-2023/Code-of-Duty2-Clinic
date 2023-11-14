import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import {
  doctorAppointmentsRoute,
  doctorDashboardRoute,
  doctorRegisteredPatientsRoute,
  updateAccountInfoRoute,
  doctorUpdatePasswordRoute,
} from "../routes/doctorRoutes";
import PeopleIcon from "@mui/icons-material/People";

export const doctorSidebarItems = [
  {
    title: "Home",
    items: [
      {
        title: "Home",
        href: doctorDashboardRoute.path,
        icon: <HomeIcon />,
      },
    ],
  },
  {
    title: "My Account",
    items: [
      {
        title: "Update my account info",
        href: updateAccountInfoRoute.path,
        icon: <PersonIcon />,
      },
      {
        title: "Update my password",
        href: `${doctorUpdatePasswordRoute.path}?type=doctor`,
        icon: <PersonIcon />,
      },
    ],
  },
  {
    title: "Patients",
    items: [
      {
        title: "View my patients",
        href: doctorRegisteredPatientsRoute.path,
        icon: <PeopleIcon />,
      },
      {
        title: "View my appointments",
        href: doctorAppointmentsRoute.path,
        icon: <PeopleIcon />,
      },
      {
        title: "Search for Patient",
        href: "/doctor/:doctorId/patient/search",
        icon: <PeopleIcon />,
      },
    ],
  },
];
