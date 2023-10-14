import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { doctorHomeRoute, updateAccountInfoRoute } from '../routes/doctorRoutes';
import PeopleIcon from '@mui/icons-material/People';


export const doctorSidebarItems = [
    {
        title: "Home",
        items: [
            {
                title: "Home",
                href: doctorHomeRoute.path,
                icon: <HomeIcon />
            }
        ]
    },
    {
        title: "My Account",
        items: [
            {
                title: "Update my account info",
                href: updateAccountInfoRoute.path,
                icon: <PersonIcon />
            }
        ]
    },
    {
        title: "Patients",
        items: [
            {
                title: "View my patients",
                href: "/doctor/:doctorId/patients",
                icon: <PeopleIcon />
            },
            {
                title: "View my appointments",
                href: "/doctor/:doctorId/appointments",
                icon: <PeopleIcon />
            }
        ]
    }
];
