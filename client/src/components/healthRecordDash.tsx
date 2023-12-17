import saveAs from 'file-saver'; // Import saveAs from file-saver
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { config } from "../configuration";
import { getFormattedDateTime } from "../utils/formatter";

interface HealthRecord {
  name: string;
  url: string;
  recordType: string;
  fileType: string;
  createdAt: string;
}

const LatestHealthRecordCard: React.FC = () => {
  const [latestHealthRecord, setLatestHealthRecord] = useState<HealthRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLatestHealthRecord = async () => {
      try {
        const response = await axios.get<any>(`${config.serverUri}/patients/health-records`);
        const healthRecords: HealthRecord[] = response.data || [];

        if (healthRecords.length > 0) {
          // Assuming the healthRecords array is already sorted by createdAt
          setLatestHealthRecord(healthRecords[0]);
        } else {
          setLatestHealthRecord(null);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching latest health record:", error);
        setLoading(false);
      }
    };

    fetchLatestHealthRecord();
  }, []);

  const downloadLatestHealthRecord = () => {
    if (latestHealthRecord) {
      saveAs(latestHealthRecord.url, latestHealthRecord.name);
    }
  };

  return (
    <Card style={{width:'50%'}}>
      <CardContent >
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </div>
        ) : latestHealthRecord ? (
          <div>
            <Typography variant="h6" fontWeight='bold' style={{ marginBottom: "8px" }}>
              Latest Health Record
            </Typography>
            <Typography variant="body1" fontSize='1.02rem'>
              <strong>Name:</strong> {latestHealthRecord.name}
            </Typography>
            <Typography variant="body1" fontSize='1.02rem'>
              <strong>Record Type:</strong> {latestHealthRecord.recordType}
            </Typography>
            <Typography variant="body1" fontSize='1.02rem'>
              <strong>Created At:</strong> {getFormattedDateTime(latestHealthRecord.createdAt)}
            </Typography>
            <Button variant="contained" onClick={downloadLatestHealthRecord}>
              Download Health Record
            </Button>
          </div>
        ) : (
          <Typography variant="body1">No health records available.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default LatestHealthRecordCard;
