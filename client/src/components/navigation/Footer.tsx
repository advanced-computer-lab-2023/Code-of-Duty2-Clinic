import { Box, Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: grey[900],
        padding: (theme) => theme.spacing(12, 0),
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        position: "static",
        bottom: 0,
        width: "100%",
        color: grey[500]
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          © {new Date().getFullYear()} El7a2ni. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
