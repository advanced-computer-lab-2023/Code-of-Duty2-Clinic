import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import HomeIcon from '@mui/icons-material/Home';
import AboutIcon from '@mui/icons-material/Info';
import ContactUsIcon from '@mui/icons-material/ContactSupport';
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <Sidebar 
                items={
                    [{
                        title: 'General',
                        items: [
                            {
                                title: 'Home',
                                href: '/',
                                icon: <HomeIcon />
                            },
                            {
                                title: 'About',
                                href: '/about',
                                icon: <AboutIcon />
                            },
                            {
                                title: 'Contact Us',
                                href: '/contact-us',
                                icon: <ContactUsIcon />
                            }
                        ]
                    }]
                }
            />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
