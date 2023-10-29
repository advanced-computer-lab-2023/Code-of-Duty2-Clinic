import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <Button color="inherit" component={Link} to="/login">
                Log in
            </Button>
            <Button color="inherit" component={Link} to="/doctor-login">
                For doctors
            </Button>
            <Button color="inherit" component={Link} to="/">
                Home
            </Button>
            <Button color="inherit" component={Link} to="/about">
                About
            </Button>
            <Button color="inherit" component={Link} to="/contact-us">
                Contact
            </Button>
        </>
    );
};

export default Navbar;
