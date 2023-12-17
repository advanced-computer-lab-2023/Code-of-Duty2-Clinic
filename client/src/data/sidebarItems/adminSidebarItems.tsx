import {
  adminAddRoute,
  viewDoctorRequestsRoute,
} from "../routes/adminRoutes";
import { HealthPackagesRoute } from "../routes/adminRoutes";
import PeopleIcon from "@mui/icons-material/People";
import PackageIcon from "@mui/icons-material/AddBox";
import ViewListIcon from "@mui/icons-material/ViewList";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AdminIcon from "@mui/icons-material/AdminPanelSettings";
import { adminUpdatePasswordRoute } from "../routes/adminRoutes";


export const adminSidebarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: <AdminPanelSettingsIcon />
      },
    ],
  },
  {
    title: "System Users",
    items: [
      {
        title: "View Patients",
        href: "/admin/users/patients",
        icon: <PeopleIcon />
      },
      {
        title: "View Doctors",
        href: "/admin/users/doctors",
        icon: <PeopleIcon />
      },
      {
        title: "View Admins",
        href: "/admin/users/admins",
        icon: <PeopleIcon />
      },
      {
        title: "Add Admin",
        href: adminAddRoute.path,
        icon: <AdminIcon />,
      },
    ],
  },
  {
    title: "Registration Requests",
    items: [
      {
        title: "View Doctor Requests",
        href: viewDoctorRequestsRoute.path,
        icon: <ViewListIcon />
      },
    ],
  },
  {
    title: "System Services",
    items: [
      {
        title: "Health Packages",
        href: HealthPackagesRoute.path,
        icon: <PackageIcon />,
      },
    ],
  },
  {
    title: "My Account",
    items: [
      {
        title: "Update Password",
        href: `${adminUpdatePasswordRoute.path}?type=admin`,
        icon: <PeopleIcon />,
      },
    ],
  },
];
