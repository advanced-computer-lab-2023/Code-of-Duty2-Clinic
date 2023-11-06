import { useState } from "react";
import { TextField, Button, Grid, AlertColor } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Alert } from "@mui/material";
import { findPatientByEmail } from "../../utils/findPatientByEmail";
import { findPatientByMobile } from "../../utils/findPatientByMobile";
import { Patient } from "../../types";


export default function AddRegisteredFamilyMember() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState(false);
  const [alert, setAlert] = useState<{ open: boolean, message: string, severity: AlertColor }>({ open: false, message: '', severity: 'success' });
  const [familyMember, setFamilyMember] = useState<Patient | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(false);

    let foundFamilyMember: Patient | null = null;
    let mobileError = false;
    let emailError = false;
    let formError = false;


    console.log(email, mobile)
    console.log(familyMember)
    console.log(foundFamilyMember)
    
    if (email && !mobile) {
      formError = false;
      mobileError = false;
      if (!validateEmail(email)) {
        emailError = true;
      } else {
        emailError = false;
        setOpen(true);
        foundFamilyMember = await findPatientByEmail(email) || null;
      }
    } else if (mobile && !email) {
      emailError = false;
      formError = false;
      if (!validatePhone(mobile)) {
        mobileError = true;
      } else {
        mobileError = false;
        setOpen(true);
        foundFamilyMember = await findPatientByMobile(mobile) || null;
      }
    } else if (email && mobile) {
      if (!validateEmail(email)) {
        emailError = true;
      } else {
        emailError = false;
      }

      if (!validatePhone(mobile)) {
        mobileError = true;
      } else {
        mobileError = false;
      }

      if (!emailError && !mobileError) {
        setOpen(true);
        const emailMember = await findPatientByEmail(email);
        const mobileMember = await findPatientByMobile(mobile);
        if (emailMember && mobileMember) {
          foundFamilyMember = emailMember; // or mobileMember, depending on your logic
        } else {
          foundFamilyMember = null;
  }
      }

    } else {
      setFormError(true);
    }

    setFamilyMember(foundFamilyMember);

    if (emailError) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (mobileError) {
      setMobileError(true);
    } else {
      setMobileError(false);
    }

    if (formError) {
      setFormError(true);
    } else {
      setFormError(false);
    }

    if (foundFamilyMember) {
      console.log('found')
      setAlert({ open: true, message: `Successfully added ${foundFamilyMember.name}`, severity: 'success' });
    } else {
      console.log('not found')
      setAlert({ open: true, message: 'Family member not found', severity: 'error' });
    }

    console.log(foundFamilyMember);
    console.log(familyMember)

  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleClose = () => {
    setOpen(false);
    setFamilyMember(null);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Registered Family Member
        </Typography>

        <Typography variant="h6">
          Here you can add a patient that is already registered on the
          platform as a family member.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ marginBottom: "2vh" }}
        >
          Enter the email and/or phone number of the family member you would like
          to add.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={emailError}
              helperText={emailError ? "Invalid email" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              error={mobileError}
              helperText={mobileError ? "Invalid phone number" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            {open && (
          <Alert onClose={handleClose} severity={alert.severity}>
                    {alert.message}
            </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button type="submit" variant="contained" sx={{ marginBottom: '2vh' }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
