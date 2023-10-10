import HomeIcon from '@mui/icons-material/Home';
import MedicineIcon from '@mui/icons-material/Medication';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import { addFamilyMemberRoute, homeRoute, searchForDoctorsRoute, viewAllDoctorsRoute } from '../routes/patientRoutes';


export const patientSidebarItems = [
    {
        title: "Home",
        items: [
            {
                title: "Home",
                href: homeRoute.path,
                icon: <HomeIcon />
            }
        ]
    },
    {
        title: "Interact with Doctors",
        items: [
            {
                title: "View Doctors",
                href: viewAllDoctorsRoute.path,
                icon: <MedicineIcon />
            },
            {
                title: "Search for Doctors",
                href: searchForDoctorsRoute.path,
                icon: <SearchIcon />
            }
        ]
    },
    {
        title: "My Account",
        items: [
            {
                title: "Add a family member",
                href: addFamilyMemberRoute.path,
                icon: <PeopleIcon />
            }
        ]
    }
];
