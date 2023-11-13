import HomeIcon from "@mui/icons-material/Home";
import AboutIcon from "@mui/icons-material/Info";
import ContactUsIcon from "@mui/icons-material/ContactSupport";
import {
  aboutRoute,
  contactUsRoute,
  welcomeRoute,
} from "../routes/guestRoutes";

export const guestSidebarItems = [
  {
    title: "General",
    items: [
      {
        title: "Home",
        href: welcomeRoute.path,
        icon: <HomeIcon />,
      },
      {
        title: "About",
        href: aboutRoute.path,
        icon: <AboutIcon />,
      },
      {
        title: "Contact Us",
        href: contactUsRoute.path,
        icon: <ContactUsIcon />,
      },
    ],
  },
];
