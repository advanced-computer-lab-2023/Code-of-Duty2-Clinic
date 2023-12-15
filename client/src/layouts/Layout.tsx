import React, { useCallback, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";

import Navbar from "../components/navigation/Navbar";
import UserPanel from "../components/navigation/UserPanel";
import Sidebar from "../components/navigation/Sidebar";
// import Footer from "../components/navigation/Footer";
import { patientSignUpRoute, doctorSignUpRoute } from "../data/routes/guestRoutes";
import useFirstPath from "../hooks/useFirstPath";
import getRequiredSidebarItems from "../utils/getRequiredSidebarItems";
import { loginRoute, doctorLoginRoute } from "../data/routes/loginRoutes";
import { doctorUnverifiedRoute } from "../data/routes/unverifiedRoutes";
import { Session } from "@talkjs/react";
import { config } from "../configuration";
import { SidebarItem } from "../types";
import Talk from "talkjs";
import { UserContext } from "../contexts/UserContext";

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

  const currentUser = useContext(UserContext).user;

  const createUser = useCallback(() => {
    return new Talk.User(currentUser as Talk.UserOptions);
  }, [currentUser]);

  const sessionRef = useRef<Talk.Session>();

  const onPermission = useCallback(() => {
    alert("permission request coming up!");
  }, []);

  if (firstPath === "doctor" || firstPath === "patient") {
    const sidebarItems = getRequiredSidebarItems(firstPath);
    return (
      <Session
        appId={config.talkJsAppId}
        syncUser={createUser}
        onBrowserPermissionNeeded={onPermission}
        sessionRef={sessionRef}
      >
        <MainUserLayout
          sidebarItems={sidebarItems}
          sidebarWidth={sidebarWidth}
          marginLeft={marginLeft}
        >
          {children}
        </MainUserLayout>
      </Session>
    );
  } else if (firstPath === "admin") {
    const sidebarItems = getRequiredSidebarItems(firstPath);
    return (
      <MainUserLayout
        sidebarItems={sidebarItems}
        sidebarWidth={sidebarWidth}
        marginLeft={marginLeft}
      >
        {children}
      </MainUserLayout>
    );
  } else if (
    location.pathname === doctorUnverifiedRoute.path ||
    (location.pathname !== loginRoute.path &&
      location.pathname !== doctorLoginRoute.path &&
      location.pathname !== patientSignUpRoute.path &&
      location.pathname !== doctorSignUpRoute.path)
  ) {
    return (
      <>
        <Navbar />
        {children}
        {/* <Footer /> */}
      </>
    );
  } else {
    return (
      <>
        {children}
        {/* <Footer /> */}
      </>
    );
  }
};

type MainUserLayoutProps = {
  sidebarItems: SidebarItem[];
  sidebarWidth: string;
  marginLeft?: string;
  children: React.ReactNode;
};
const MainUserLayout: React.FC<MainUserLayoutProps> = ({
  sidebarItems,
  sidebarWidth,
  marginLeft = "0",
  children
}) => {
  return (
    <Box display="flex">
      <Sidebar sidebarItems={sidebarItems} sidebarWidth={sidebarWidth} />
      <Box
        sx={{
          marginLeft,
          transition: "margin-left 0.2s ease-in-out",
          flexGrow: 1
        }}
      >
        <UserPanel sidebarItems={sidebarItems} />
        {children}
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};
export default Layout;
