import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Navbar from './Navbar';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Navbar />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Clinic
                    </Typography>
                    <Button color="inherit" href="/">
                        <img src="/logo.png" alt="App Logo" style={{ height: '50px', marginRight: 16 }} />
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
