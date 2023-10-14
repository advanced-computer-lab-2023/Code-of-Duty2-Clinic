import { adminAddRoute, userlistRoute, viewDoctorRequestsRoute } from "../routes/adminRoutes";



export const adminSidebarItems = [
    {
        title: "Add Admin",
        items: [
            {
                title: "Add Admin",
                href: adminAddRoute.path,
            }
        ]
    },
    {
        title: "Show Users and Remove",
        items: [
            {
                href: userlistRoute.path,
            }
        ]
    },
    {
        title: "View Doctor Requests",
        items: [
            {
                title: "View Requests",
                href:viewDoctorRequestsRoute
            }
        ]
    }
];