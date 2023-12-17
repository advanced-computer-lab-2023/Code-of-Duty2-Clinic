import React, { useEffect, useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import { Button } from "@mui/material";
import pdfLogo from "../assets/PDF_file_icon.svg";
import websiteLogo from "../assets/el7a2ni_logo.png";
import axios from "axios";
import { config } from "../configuration";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  headerSection: {
    borderBottom: "5px solid #000",
    padding: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  doctorName: {
    fontSize: 24,
    color: "black",
    marginBottom: "3px"
  },
  speciality: {
    fontSize: 13,
    color: "black"
  },
  patientName: {
    marginTop: 40,
    fontSize: 13,
    color: "black"
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "white",
    width: "600px",
    border: "1px solid #000"
  },
  cardTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  cardDescriptionView: {
    flexDirection: "row",
    display: "flex",
    gap: 10
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5
  }
});

export interface mypdfProps {
  prescription: any;
  info: any;
}
const MyPDF: React.FC<mypdfProps> = ({ prescription, info }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View>
          <View style={styles.headerSection}>
            <View>
              <Text style={styles.doctorName}>Dr. {info.doctorName}</Text>
              <Text style={styles.speciality}>Speciality: {info.doctorSpeciality}</Text>
              <Text style={styles.patientName}>Patient Name: {info.patientName} </Text>
            </View>
            <View>
              <Image style={{ width: "100px" }} src={websiteLogo} />
            </View>
          </View>
          {prescription.medicines?.map((medicine: any, index: number) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{medicine.name}</Text>
              <View style={styles.cardDescriptionView}>
                <Text style={styles.cardText}>Description: </Text>
                <Text style={styles.cardText}>{medicine.dosage}</Text>
              </View>
              <Text style={styles.cardText}>Quantity: {medicine.quantity}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
export interface downloadablePDFProps {
  prescription: any;
  patientId?: string;
  doctorId?: string;
  supervisingPatientId?: string;
}
const DownloadablePDF: React.FC<downloadablePDFProps> = ({
  prescription,
  patientId,
  doctorId,
  supervisingPatientId
}) => {
  const [data, setData] = useState<any>();
  const fetchData = async () => {
    var res;
   console.log(!!doctorId)
    if (!!doctorId)
      res = await axios.get(`${config.serverUri}/patients/general-info`, {
        params: { doctorId, supervisingPatientId }
      });
    else
      res = await axios.get(`${config.serverUri}/doctors/general-info`, {
        params: { patientId, doctorId, supervisingPatientId }
      });

    setData(res?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fileName = "medications-document.pdf";

  if (data)
    return (
      <div>
        <PDFDownloadLink
          style={{ textDecoration: "none" }}
          document={<MyPDF prescription={prescription} info={data} />}
          fileName={fileName}
        >
          <Button
            sx={{
              display: "flex",
              gap: 1,
              maxHeight: "40px",
              backgroundColor: "#8B0000",
              paddingX: 2,
              color: "white",
              transition: "opacity 0.2s ease-in",
              "&:hover": {
                backgroundColor: "#8B0000",
                opacity: 0.7
              }
            }}
          >
            <img width={24} src={pdfLogo} alt="PDF Icon" />
            Export as PDF
          </Button>
        </PDFDownloadLink>
      </div>
    );
  else return <div>LOADING EXPORT..</div>;
};

export default DownloadablePDF;
