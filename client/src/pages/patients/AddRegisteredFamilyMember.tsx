import { useState } from "react";
import { TextField, Button, Grid, Snackbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Alert } from "@mui/material";
import { findPatientByEmail } from "../../utils/findPatientByEmail";
import { findPatientByPhone } from "../../utils/findPatientByPhone";


export default function AddRegisteredFamilyMember() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [open, setOpen] = useState(false);



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateEmail(email) && validatePhone(phone)) {
      setOpen(true);
      setEmailError(false);
      setPhoneError(false);

      const familyMember = findPatientByEmail(email) || findPatientByPhone(phone) || null;

      console.log(familyMember);

      if (await familyMember) {
        // add family member to patient's familyMembers array
      } else {
        // display error alert
        setOpen(false);
        setEmailError(true);
        setPhoneError(true);
        alert("Family member not found. Please enter a valid email or phone number.");
      }

      
    } else {
      setEmailError(!validateEmail(email));
      setPhoneError(!validatePhone(phone));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleClose = () => {
    setOpen(false);
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
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              error={phoneError}
              helperText={phoneError ? "Invalid phone number" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button type="submit" variant="contained" sx={{ marginBottom: '2vh' }}>
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "-6vh" }}>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert variant= "filled" onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    Family member added successfully!
                  </Alert>
                </Snackbar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
