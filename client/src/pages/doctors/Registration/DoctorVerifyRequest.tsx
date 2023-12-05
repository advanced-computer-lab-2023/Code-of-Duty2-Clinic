import React, { useContext, useRef } from "react";
import {
  Button,
  Container,
  Grid,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { config } from "../../../configuration";
import { uploadImage } from "../../../services/fileUploader";
import { ApplicationContext } from "./context/application";
import { useMutation } from "react-query";
import { AuthContext } from "../../../contexts/AuthContext";
import { VerificationStatus } from "../../../types/enums/VerificationStatus";

export interface IExperienceFile {
  url: string;
  DocumentType: string;
  name: string;
}

type IFiles = {
  identificationFile: File;
  medicalLicenseFile: File;
  medicalDegreeFile: File;
};

const uploadFiles = async ({
  identificationFile,
  medicalLicenseFile,
  medicalDegreeFile,
}: IFiles) => {
  const identificationUrl: string = await uploadImage(
    identificationFile,
    "idetification",
    ""
  );
  const medicalLicenseUrl: string = await uploadImage(
    medicalLicenseFile,
    "medicalLicense",
    ""
  );
  const medicalDegreeUrl: string = await uploadImage(
    medicalDegreeFile,
    "idetification",
    ""
  );
  const files = {
    identificationUrl: identificationUrl,
    medicalLicenseUrl: medicalLicenseUrl,
    medicalDegreeUrl: medicalDegreeUrl,
    status: "pending contract acceptance",
  };
  await axios.put(`${config.serverUri}/users/doctor-registration`, files);
};

const DoctorRegistrationRequestFormFiles: React.FC = () => {
  const { updateVerificationStatus } = useContext(AuthContext);
  useContext(ApplicationContext);
  const identificationFile = useRef<HTMLInputElement>(null!);
  const medicalLicenseFile = useRef<HTMLInputElement>(null!);
  const medicalDegreeFile = useRef<HTMLInputElement>(null!);

  const uploadFilesMutation = useMutation(uploadFiles, {
    onSuccess: () => {
      updateVerificationStatus(VerificationStatus.pendingContractAcceptance);
    },
  });
  const SaveFile = () => {
    uploadFilesMutation.mutate({
      identificationFile: identificationFile.current.files![0],
      medicalLicenseFile: medicalLicenseFile.current.files![0],
      medicalDegreeFile: medicalDegreeFile.current.files![0],
    });
  };

  return (
    <Stack
      minWidth={"300px"}
      margin={"auto"}
      maxWidth={"500px"}
      sx={{ backgroundColor: "gray" }}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography fontSize={20} fontWeight={500} textAlign={"center"}>
        Doctor Registration Request
      </Typography>
      <Container>
        <div>
          <Stack
            minHeight={400}
            direction={"row"}
            padding={5}
            alignItems={"start"}
          >
            <Grid
              container
              direction="row"
              justifyItems={"center"}
              alignItems={"center"}
              rowSpacing={1}
            >
              <div>
                <Grid
                  container
                  direction="row"
                  justifyItems={"start"}
                  alignItems={"end"}
                  marginBottom={10}
                >
                  <Grid item sm={12} xs={12}>
                    <label>Identification</label>
                    <Input
                      inputRef={identificationFile}
                      id="identification"
                      fullWidth
                      type="file"
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <label>Medical License</label>
                    <Input
                      inputRef={medicalLicenseFile}
                      id="medicalLicense"
                      fullWidth
                      type="file"
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <label>Medical Degree</label>
                    <Input
                      inputRef={medicalDegreeFile}
                      id="medicalDegree"
                      fullWidth
                      type="file"
                    />
                  </Grid>
                </Grid>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={SaveFile}
                disabled={uploadFilesMutation.isLoading}
              >
                Submit Request
              </Button>
            </Grid>
          </Stack>
        </div>
      </Container>
    </Stack>
  );
};

export default DoctorRegistrationRequestFormFiles;
