import React, { useState, useRef } from "react";
import Box from "@mui/joy/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { Stack, Typography } from "@mui/material";

import { IHealthRecord } from "../../../../../patients/medicalHistory/medicalHistory";
import { uploadImage } from "../../../../../../services/fileUploader";
import { config } from "../../../../../../configuration";
import {
   uploadHealthRecordModalStyle,
   textFieldStyle,
   VisuallyHiddenInput,
} from "../../../../../patients/medicalHistory/medicalHistoryCSS";
import { useParams } from "react-router-dom";

interface UploadNotesModalProps {
   openUpload: boolean;
   close: (healthrecord?: IHealthRecord) => void;
}
const UploadNotesModal: React.FC<UploadNotesModalProps> = ({ openUpload, close }) => {
   const [open, setOpen] = useState(openUpload);
   const fileName = useRef<string>(null!);
   const file = useRef<File>();
   const imgUrl = useRef<string>(null!);
   const recordType = useRef<string>(null!);
   const [saveLoading, setSaveLoading] = useState(false);
   const { patientId } = useParams();

   const SaveImage = async (e: any) => {
      e.preventDefault();
      setSaveLoading(true);
      console.log(file.current?.type!);
      const validFileTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

      if (!file || fileName.current === "") return;

      if (!(file.current?.type && validFileTypes.includes(file.current?.type))) {
         // let isValidFileType = ;
         // if(isValidFileType)return
      }

      if (file.current)
         try {
            imgUrl.current = await uploadImage(
               file.current,
               "doctor-files",
               fileName.current || ""
            );

            const healthrecord: IHealthRecord = {
               name: fileName.current,
               url: imgUrl.current,
               recordType: recordType.current,
               fileType: file.current?.type,
               createdAt: new Date(),
            };

            await axios.put(
               `${config.serverUri}/doctors/patients/${patientId}/health-records`,
               healthrecord
            );
            setSaveLoading(false);
            close(healthrecord);
         } catch (error) {
            setSaveLoading(false);
            close();
         }
   };
   const fileChange = (e: any) => {
      console.log(fileName.current);
      file.current = e.target.files[0];
   };
   return (
      <div>
         <Modal
            open={open}
            onClose={() => {
               setOpen(false);
               close();
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={uploadHealthRecordModalStyle}>
               <Typography
                  align="center"
                  color="#103939"
                  fontFamily="Inter"
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
               >
                  Upload Health Record
               </Typography>
               <Stack
                  direction="column"
                  component="form"
                  sx={{
                     "& .MuiTextField-root": { mt: 3, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <TextField
                     onChange={ev => {
                        fileName.current = ev.target.value;
                     }}
                     id="filled-multiline-flexible"
                     label="File Name"
                     multiline
                     maxRows={1}
                     margin="normal"
                     variant="standard"
                     size="small"
                     sx={textFieldStyle}
                  />
                  <TextField
                     onChange={ev => {
                        recordType.current = ev.target.value;
                     }}
                     id="filled-multiline-flexible"
                     label="Record Type"
                     multiline
                     maxRows={1}
                     margin="normal"
                     variant="standard"
                     size="small"
                     sx={textFieldStyle}
                  />
                  <Button
                     sx={{ backgroundColor: "#103939", maxWidth: 200 }}
                     component="label"
                     variant="contained"
                     startIcon={<CloudUploadIcon />}
                  >
                     Select file
                     <VisuallyHiddenInput onChange={fileChange} type="file" />
                  </Button>

                  <LoadingButton
                     sx={{
                        marginTop: 10,
                        backgroundColor: "#103939",
                        maxWidth: 100,
                        color: "white",
                        ":hover": { color: "black", borderColor: "#103939" },
                     }}
                     loading={saveLoading}
                     //loadingPosition="start"
                     variant="outlined"
                     onClick={SaveImage}
                  >
                     Upload
                  </LoadingButton>
               </Stack>
            </Box>
         </Modal>
      </div>
   );
};
export default UploadNotesModal;
