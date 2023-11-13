import HomeIcon from '@mui/icons-material/Home';
import AboutIcon from '@mui/icons-material/Info';
import ContactUsIcon from '@mui/icons-material/ContactSupport';
import PeopleIcon from '@mui/icons-material/People';
import { aboutRoute, contactUsRoute, welcomeRoute } from '../routes/guestRoutes';
import { patientRegistrationRoute } from '../routes/patientRoutes';


export const guestSidebarItems = [
    {
        title: 'General',
        items: [
            {
                title: 'Home',
                href: welcomeRoute.path,
                icon: <HomeIcon />
            },
            {
                title: 'About',
                href: aboutRoute.path,
                icon: <AboutIcon />
            },
            {
                title: 'Contact Us',
                href: contactUsRoute.path,
                icon: <ContactUsIcon />
            }
        ]
    },
    {
        title: 'Sign Up as Patient',
        items: [
            {
                title: 'Sign up as Patient',
                href: patientRegistrationRoute.path,
                icon: <PeopleIcon />
            }

        ]

    }
];
