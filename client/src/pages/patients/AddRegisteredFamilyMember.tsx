import { TextField, Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Alert } from "@mui/material";



export default function AddRegisteredFamilyMember() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClose = () => {

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
          
              <Alert onClose={handleClose} severity="success">
                This is a success message!
              </Alert>

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
