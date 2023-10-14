import { adminAddRoute, userlistRoute, viewDoctorRequestsRoute } from "../routes/adminRoutes";
import { HealthPackagesRoute } from "../routes/adminRoutes";
import PeopleIcon from '@mui/icons-material/People';
import PackageIcon from '@mui/icons-material/AddBox';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';

export const adminSidebarItems = [
    {
        title: "System Users",
        items: [
            {
                title: "Add Admin",
                href: adminAddRoute.path,
                icon: <AdminIcon />
            },
            {
                title: "Show Users and Remove",
                href: userlistRoute.path,
                icon: <PeopleIcon />
            }
        ]
    },
    {
        title: "Registration Requests",
        items: [
            {
                title: "View Doctor Requests",
                href:viewDoctorRequestsRoute
            }
        ]
    },
    { 
        title: 'System Services',
        items: [
            {
                title: 'Health Packages',
                href: HealthPackagesRoute.path,
                icon: <PackageIcon />
            },
            
        ]
   }
];