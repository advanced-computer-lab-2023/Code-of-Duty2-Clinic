import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            padding: (theme) => theme.spacing(6, 0),
        }}>
            <Container maxWidth="lg">
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: (theme) => theme.spacing(2),
                }}>
                    <img src="/logo.png" alt="Logo" style={{height: 50, marginRight: 16}} />
                    <Typography variant="h6" component="span">
                        My Company
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{color: (theme) => theme.palette.text.secondary}}>
                    © {new Date().getFullYear()} My Company. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
