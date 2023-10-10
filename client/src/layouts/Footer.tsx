import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            padding: (theme) => theme.spacing(6, 0),
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            position: 'absolute',
            bottom: 0,
            width: '100%',
        }}>
            <Container maxWidth="lg">
                <Typography variant="body2" sx={{
                    color: (theme) => theme.palette.text.secondary,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    © {new Date().getFullYear()} My Company. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
