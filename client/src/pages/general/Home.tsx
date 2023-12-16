import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { patientSignUpRoute } from "../../data/routes/guestRoutes";
import { doctorSignUpRoute } from "../../data/routes/guestRoutes";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import MedicationIcon from "@mui/icons-material/Medication";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import EventNoteIcon from "@mui/icons-material/EventNote";

interface SectionProps {
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ children }) => {
  const [ref, setRef] = useState(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOpacity(entry.intersectionRatio);
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i * 0.01)
      }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref]);

  return (
    <motion.div style={{ opacity }} transition={{ duration: 1 }}>
      <Box
        ref={setRef}
        sx={{
          width: "100%",
          padding: 2
        }}
      >
        {children}
      </Box>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        color: (theme) => theme.palette.common.white,
        background: (theme) => theme.palette.complexGradient
      }}
    >
      <Container maxWidth="lg">
        <Section>
          <Grid container alignItems="center">
            <Grid
              item
              xs={12}
              md={6}
              order={{ xs: 1, md: 1 }}
              container
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <img src="/el7a2ni_logo.png" alt="Description of the image" />
              {/* <MedicationIcon style={{ fontSize: 600 }} /> */}
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }}>
              <Typography variant="h2" gutterBottom>
                El7a2ni Clinic, your partner for online medical consultations.
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                We believe that healthcare should be simple, effective, and accessible to all. Our
                online clinic platform is designed with you in mind, providing a user-friendly
                interface to connect you with a wide range of medical consultations and services.
              </Typography>
            </Grid>
          </Grid>
        </Section>

        <Box mt={8} />

        <Section>
          <Grid container justifyContent="center">
            <SettingsSystemDaydreamIcon style={{ fontSize: 240 }} />
          </Grid>
          <Typography variant="h2" gutterBottom>
            Part of the El7a2ni Healthcare System
          </Typography>
          <Typography variant="body1" gutterBottom>
            Our online clinic is one of two platforms on the{" "}
            <strong>El7a2ni Online Healthcare System</strong>, which also includes the{" "}
            <strong>El7a2ni Pharmacy platform</strong>. Together, these platforms provide a
            comprehensive suite of healthcare services, from online consultations with licensed
            physicians to the delivery of prescription medications and wellness products.
          </Typography>
        </Section>

        <Box mt={8} />

        <Section>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }}>
              <Typography variant="h2" gutterBottom>
                Schedule Doctor Appointments
              </Typography>
              <Typography variant="body1" gutterBottom>
                Schedule appointments with our experienced doctors at your convenience. Whether you
                need a routine check-up or a consultation for a specific condition, we're here to
                help. Our user-friendly interface makes it easy to find the right specialist and
                book an appointment.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              order={{ xs: 1, md: 2 }}
              container
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <EventNoteIcon style={{ fontSize: 240 }} />
            </Grid>
          </Grid>
        </Section>

        <Box mt={8} />

        <Section>
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              xs={12}
              md={3}
              order={{ xs: 1, md: 1 }}
              container
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <CreditCardIcon style={{ fontSize: 240 }} />
            </Grid>
            <Grid item xs={12} md={9} order={{ xs: 2, md: 2 }}>
              <Typography variant="h2" gutterBottom>
                Payment Options
              </Typography>
              <Typography variant="body1" gutterBottom>
                Pay with your credit card, use the El7a2ni e-wallet, or opt for cash on delivery.
                Choose the method that suits you best. We understand that everyone has different
                preferences when it comes to payment methods. That's why we offer a variety of
                options to cater to your needs.
              </Typography>
            </Grid>
          </Grid>
        </Section>

        <Box mt={8} />

        <Section>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }}>
              <Typography variant="h2" gutterBottom>
                Prescribing Medications
              </Typography>
              <Typography variant="body1" gutterBottom>
                Our doctors at El7a2ni Clinic are equipped to prescribe the necessary medications
                for your health conditions. After a thorough consultation and diagnosis,
                prescriptions are assigned to patients directly on the platform. This ensures
                accuracy and convenience, allowing you to focus on your recovery.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              order={{ xs: 1, md: 2 }}
              container
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <MedicationIcon style={{ fontSize: 240 }} />
            </Grid>
          </Grid>
        </Section>

        <Box mt={8} />

        <Section>
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              xs={12}
              md={3}
              order={{ xs: 1, md: 1 }}
              container
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <ChatIcon style={{ fontSize: 240 }} />
            </Grid>
            <Grid item xs={12} md={9} order={{ xs: 2, md: 2 }}>
              <Typography variant="h2" gutterBottom>
                Chat with Doctors
              </Typography>
              <Typography variant="body1" gutterBottom>
                Need assistance or have medical inquiries? Connect with our professional medical
                team to get the help you need. Our team of experienced doctors and medical staff is
                available to answer any questions you may have about your patients' conditions.
                Whether you're unsure about the diagnosis, treatment options, or possible
                interactions with other conditions, our medical team can provide the information you
                need. With our chat feature, you can get your questions answered right from your
                clinic.
              </Typography>
            </Grid>
          </Grid>
        </Section>

        <Box mt={8}>{/* <Divider sx={{ backgroundColor: "white" }} /> */}</Box>

        <Section>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }}>
              <Typography variant="h2" gutterBottom>
                Join Us!
              </Typography>
              <Typography variant="body1" gutterBottom>
                Become a part of our community. Join us today and start your journey towards better
                health.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Create your{" "}
                <NavLink to={patientSignUpRoute.path} style={{ color: "lightblue" }}>
                  patient account
                </NavLink>
                , or{" "}
                <NavLink to={doctorSignUpRoute.path} style={{ color: "lightblue" }}>
                  apply as a doctor
                </NavLink>{" "}
                here.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              order={{ xs: 1, md: 2 }}
              container
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <SpaRoundedIcon style={{ fontSize: 240 }} />
            </Grid>
          </Grid>
        </Section>

        <Box pb={20} />
      </Container>
    </Box>
  );
};

export default Home;
