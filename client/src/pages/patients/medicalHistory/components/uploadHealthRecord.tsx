import React, { useState, useRef, ChangeEvent, ChangeEventHandler } from "react";
import Box from "@mui/joy/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";

import { IHealthRecord } from "../medicalHistory";
import { uploadImage } from "../../../../services/fileUploader";
import { config } from "../../../../configuration";
import {
  uploadHealthRecordModalStyle,
  textFieldStyle,
  VisuallyHiddenInput,
} from "../medicalHistoryCSS";

interface UploadHealthRecordModalProps {
  openUpload: boolean;
  close: (healthrecord?: IHealthRecord) => void;
}
const UploadHealthRecordModal: React.FC<UploadHealthRecordModalProps> = ({
  openUpload,
  close,
}) => {
  const [open, setOpen] = useState(openUpload);
  const fileName = useRef<string>(null!);
  const file = useRef<File>();
  const imgUrl = useRef<string>(null!);
  const recordType = useRef<string>(null!);
  const [saveLoading, setSaveLoading] = useState(false);

  const SaveImage = async (e: any) => {
    e.preventDefault();
    setSaveLoading(true);
    if (!file || fileName.current === "") return;
    if (file.current)
      imgUrl.current = await uploadImage(
        file.current,
        recordType.current,
        fileName.current || ""
      );

    const healthrecord: IHealthRecord = {
      name: fileName.current,
      url: imgUrl.current,
      recordType: recordType.current,
      fileType: file.current?.type,
      createdAt: new Date(),
    };

    try {
      await axios.put(
        `${config.serverUri}/patients/health-records`,
        healthrecord
      );
      setSaveLoading(false);
      close(healthrecord);
    } catch (error) {
      setSaveLoading(false);
      close(healthrecord);
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
              onChange={(ev) => {
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
            <Select
            //inputRef={recordType}
            labelId="demo-simple-select-label"
            defaultValue={'option'}
            id="demo-simple-select"
            label="Options"
            onChange={(ev: SelectChangeEvent<any>) => {
              recordType.current = ev.target.value
            }}
      >
        <MenuItem value={'option1'}>Lab Result</MenuItem>
        <MenuItem value={'option2'}>X-Ray</MenuItem>
        <MenuItem value={'option3'}></MenuItem>
      </Select>
            {/* <TextField
              
              id="filled-multiline-flexible"
              label="Record Type"
              multiline
              maxRows={1}
              margin="normal"
              variant="standard"
              size="small"
              sx={textFieldStyle}
            /> */}
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
export default UploadHealthRecordModal;
