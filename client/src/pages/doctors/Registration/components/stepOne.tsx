import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { IFormOneData } from "../DoctorRegistrationRequestForm";

interface IStepOneProps {
  passFormDataToParent: (data: IFormOneData) => void;
}
const StepOneForm: React.FC<IStepOneProps> = ({ passFormDataToParent }) => {
  const methods = useForm<IFormOneData>({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
      gender: "choose your gender",
      dateOfBirth: "",
      mobileNumber: "",
    },
  });
  const { control } = methods;

  return (
    <form onSubmit={methods.handleSubmit((data) => passFormDataToParent(data))}>
      <Grid
        container
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        minHeight={400}
        rowSpacing={1}
        padding={5}
      >
        <Grid item sm={12} xs={12}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  fullWidth
                  {...field}
                  variant="standard"
                  label="Username"
                  placeholder="Enter Your Username"
                />
              </div>
            )}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  fullWidth
                  {...field}
                  variant="standard"
                  type="password"
                  label="Password"
                  placeholder="Enter Your Password"
                />
              </div>
            )}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  fullWidth
                  {...field}
                  variant="standard"
                  type="email"
                  label="Email"
                  placeholder="Enter Your Email"
                />
              </div>
            )}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  fullWidth
                  {...field}
                  variant="standard"
                  type="text"
                  label="Name"
                  placeholder="Enter Your Full Name"
                />
              </div>
            )}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Select
                  fullWidth
                  variant="standard"
                  {...field}
                  defaultValue="choose your gender"
                  label="Gender"
                >
                  <MenuItem value="choose your gender">
                    choose your gender
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </div>
            )}
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <Controller
            name="mobileNumber"
            control={control}
            render={({ field }) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  {...field}
                  variant="standard"
                  type="number"
                  label="Mobile Number"
                  placeholder="Enter Your Mobile Number"
                />
              </div>
            )}
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  {...field}
                  variant="standard"
                  focused
                  placeholder="s"
                  type="date"
                  label="Date of Birth"
                />
              </div>
            )}
          />
        </Grid>
      </Grid>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default StepOneForm;
