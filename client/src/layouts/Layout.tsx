import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import { doctorSidebarItems, guestSidebarItems, patientSidebarItems } from '../data/sidebarItems';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <Sidebar 
                items={getRequiredSidebarItems()}
            />
            {children}
            <Footer />
        </div>
    );
};


function getRequiredSidebarItems() {
    const firstPath = getFirstPath();
    switch (firstPath) {
        case 'patient':
            return patientSidebarItems;
        case 'doctor':
            return doctorSidebarItems;
        case 'admin':
            return [];
        default:
        return guestSidebarItems;
    }
}

function getFirstPath() {
  const location = useLocation();
  const parts = location.pathname.split('/');
  return parts[1];
};


export default Layout;
