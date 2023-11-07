import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";

import Navbar from "../components/navigation/Navbar";
import UserPanel from "../components/navigation/UserPanel";
import Sidebar from "../components/navigation/Sidebar";
import Footer from "../components/navigation/Footer";
import {
  patientSignUpRoute,
  doctorSignUpRoute,
} from "../data/routes/guestRoutes";
import useFirstPath from "../hooks/useFirstPath";
import getRequiredSidebarItems from "../utils/getRequiredSidebarItems";
import {
  loginRoute,
  doctorLoginRoute,
} from "../data/routes/loginRoutes";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMediumScreenOrLarger = useMediaQuery(theme.breakpoints.up("md"));
  const sidebarWidth = "17rem";

  // We apply a left margin to the main content in the layout of
  // authenticated user pages when the sidebar is open (on medium screens and larger)
  // to prevent the main content from being hidden behind the sidebar. We don't apply
  //this margin on small screens because the sidebar is hidden on small screens.
  const marginLeft = isMediumScreenOrLarger ? sidebarWidth : "0";
  const firstPath = useFirstPath();

  const MainPageContent = () => {
    return <>{children}</>;
  };

  if (
    firstPath === "admin" ||
    firstPath === "doctor" ||
    firstPath === "patient"
  ) {
    const sidebarItems = getRequiredSidebarItems(firstPath);
    return (
      <Box display="flex">
        <Sidebar sidebarItems={sidebarItems} sidebarWidth={sidebarWidth} />
        <Box
          sx={{
            marginLeft,
            transition: "margin-left 0.2s ease-in-out",
            flexGrow: 1,
          }}
        >
          <UserPanel sidebarItems={sidebarItems} />
          <MainPageContent />
          <Footer />
        </Box>
      </Box>
    );
  } else if (
    location.pathname !== loginRoute.path &&
    location.pathname !== doctorLoginRoute.path &&
    location.pathname !== patientSignUpRoute.path &&
    location.pathname !== doctorSignUpRoute.path
  ) {
    return (
      <>
        <Navbar />
        <MainPageContent />
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <MainPageContent />
        <Footer />
      </>
    );
  }
};

export default Layout;
