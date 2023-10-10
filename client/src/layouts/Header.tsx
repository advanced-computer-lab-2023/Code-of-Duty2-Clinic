import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Navbar from './Navbar';

const Header = () => {
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" sx={{
                        flexGrow: 1 ,
                        marginRight: 'auto',
                    }}>
                        Clinic
                    </Typography>
                    <Navbar />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
