import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { doctorHomeRoute, updateAccountInfoRoute } from '../routes/doctorRoutes';


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
    }
];
