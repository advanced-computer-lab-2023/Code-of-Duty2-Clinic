import { HealthPackagesRoute } from "../routes/adminRoutes";
import PersonIcon from '@mui/icons-material/Person';

export const adminSidebarItems = [
   { title: 'General',
        items: [
            {
                title: 'Health Packages ',
                href: HealthPackagesRoute.path,
                icon: <PersonIcon />
            },
            
        ]
   }
];