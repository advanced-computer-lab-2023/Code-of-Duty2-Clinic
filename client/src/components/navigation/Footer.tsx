import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        padding: (theme) => theme.spacing(6, 0),
        marginTop: (theme) => theme.spacing(10),
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        position: "static",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          © {new Date().getFullYear()} El7a2ni. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
