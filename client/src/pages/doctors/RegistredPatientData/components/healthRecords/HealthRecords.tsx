import React, { useState, useEffect } from "react";
import { config } from "../../../../../configuration";
import { useParams } from "react-router-dom";
import axios from "axios";
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
  Typography
} from "@mui/material";
import UploadNotesModal from "./table-components/uploadHealthRecord";
import TableLoadingSkeleton from "../../../../../components/tableLoadingSkeleton";
import DownloadIcon from "@mui/icons-material/Download";
import { EnhancedTableToolbar } from "./table-components/tableToolBar";
import { IHealthRecord } from "../../../../patients/medicalHistory/medicalHistory";
import { FileViewModalStyle } from "../../../../patients/medicalHistory/medicalHistoryCSS";
import { useQueryParams } from "../../../../../hooks/useQueryParams";

const HealthRecords: React.FC = () => {
  const [TableFiles, setTableFiles] = useState<Array<IHealthRecord>>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [upload, setUpload] = useState(false);
  const [selected, _setSelected] = useState<readonly number[]>([]);
  const [viewFileModal, setViewFileModal] = useState(false);
  const [_fileType, setFileType] = useState<string>();
  const [viewFileUrl, setViewFileUrl] = useState<string>();
  const [viewFileName, setViewFileName] = useState<string>();

  const patientId = useParams().patientId!;
  const supervisingPatientId = useQueryParams().get("spId");

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(
        `${config.serverUri}/doctors/patients/${patientId}/health-records`,
        { params: { supervisingPatientId } }
      );
      setTableFiles(response.data);
      setTableLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addFileToTable = async (healthrecord?: IHealthRecord) => {
    console.log(healthrecord);
    if (healthrecord)
      setTableFiles((old) => {
        return [...old, healthrecord];
      });
    setUpload(false);
  };

  const downloadFile = async (url: string, fileName: string) => {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    saveAs(blob, fileName);
  };
  const openViewFileModal = (file: IHealthRecord) => {
    setViewFileName(file.name);
    setViewFileUrl(file.url);
    setFileType(file.fileType?.split("/")[1]);
    setViewFileModal(true);
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  if (false) return <div>Loading...</div>;
  return (
    <div className="view-patient-data">
      <Stack position="relative" direction="row" justifyContent="center" sx={{ width: "100%" }}>
        {upload && <UploadNotesModal openUpload={true} close={addFileToTable} />}
        <Paper sx={{ mb: 2, width: "80%" }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            openModal={() => {
              setUpload(true);
            }}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"medium"}>
              <TableHead sx={{ backgroundColor: "#103939", color: "white" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>File Name</TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Health Record Type
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    File Type
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Upload Date
                  </TableCell>
                  <TableCell sx={{ color: "white" }} id="options" align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableLoading ? (
                  <TableLoadingSkeleton />
                ) : (
                  TableFiles?.map((file: IHealthRecord, index: number) => (
                    <TableRow
                      role="checkbox"
                      hover
                      onClick={() => openViewFileModal(file)}
                      tabIndex={-1}
                      key={index}
                      sx={{
                        "&.Mui-selected, &.Mui-selected:hover": {
                          backgroundColor: "#1039394D", // Change this to your desired color
                          cursor: "pointer"
                        }
                      }}
                    >
                      <TableCell id={"enhanced-table-checkbox-" + index} scope="row">
                        {file.name}
                      </TableCell>
                      <TableCell align="center">{file.recordType}</TableCell>
                      <TableCell align="center">{file.fileType}</TableCell>
                      <TableCell align="center">
                        {new Date(file.createdAt).toDateString()}
                      </TableCell>
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
                            <DownloadIcon color="action" sx={{ color: "#103939" }} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Modal
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
            <iframe
              style={{ width: "100%", height: "100%" }}
              width="500px"
              height="400px"
              src={viewFileUrl}
            ></iframe>
          </Box>
        </Modal>
      </Stack>
    </div>
  );
};
export default HealthRecords;
