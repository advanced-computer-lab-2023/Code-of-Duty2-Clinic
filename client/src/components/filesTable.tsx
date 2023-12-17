import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

export const FileViewModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "auto",
  bgcolor: "white",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};
export interface IExperienceFile {
  url: string;
  DocumentType: string;
  name: string;
}

interface ITableProps {
  files: IExperienceFile[];
}
const FilesTable: React.FC<ITableProps> = ({ files }) => {
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [viewFileModal, setViewFileModal] = useState(false);
  const [fileType, setFileType] = useState<string>();
  const [viewFileUrl, setViewFileUrl] = useState<string>();
  const [viewFileName, setViewFileName] = useState<string>();

  const { patientId } = useParams();
  const downloadFile = async (url: string, fileName: string) => {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    saveAs(blob, fileName);
  };
  const openViewFileModal = (file: IExperienceFile) => {
    setViewFileName(file.name);
    setViewFileUrl(file.url);
    setFileType(file.DocumentType?.split("/")[1]);
    setViewFileModal(true);
  };

  return (
    <div className="view-patient-data">
      <Stack
        position="relative"
        direction="row"
        justifyContent="center"
        sx={{ width: "400px" }}
      >
        <Paper sx={{ mb: 2, width: "80%" }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 300 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <TableHead sx={{ backgroundColor: "#103939", color: "white" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }} align="center">
                    {" "}
                    File Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                    id="options"
                    align="right"
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files?.map((file: IExperienceFile, index: number) => (
                  <TableRow
                    role="checkbox"
                    hover
                    onClick={() => openViewFileModal(file)}
                    tabIndex={-1}
                    key={index}
                    sx={{
                      "&.Mui-selected, &.Mui-selected:hover": {
                        backgroundColor: "#1039394D", // Change this to your desired color
                        cursor: "pointer",
                      },
                    }}
                  >
                    {/* <TableCell
                  id={"enhanced-table-checkbox-" + index}
                  scope="row"
                >
                  {file.DocumentType}
                </TableCell> */}
                    <TableCell align="center">{file.name}</TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                      >
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(file.url, file.name);
                          }}
                        >
                          <DownloadIcon
                            color="action"
                            sx={{ color: "#103939" }}
                          />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Modal
          sx={{ width: "100%", height: "100%" }}
          open={viewFileModal}
          onClose={() => {
            setViewFileModal(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={FileViewModalStyle}>
            <Typography
              align="center"
              color="#103939"
              fontFamily="Inter"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {viewFileName}
            </Typography>
            <iframe width="400px" height="500px" src={viewFileUrl}></iframe>
          </Box>
        </Modal>
      </Stack>
    </div>
  );
};

export default FilesTable;
