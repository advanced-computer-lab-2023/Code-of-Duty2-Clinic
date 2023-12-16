import React from "react";
import {
   PDFDownloadLink,
   Document,
   Page,
   View,
   Text,
   StyleSheet,
   Image,
} from "@react-pdf/renderer";
import { Button } from "@mui/material";
import pdfLogo from "../assets/PDF_file_icon.svg";
import websiteLogo from "../assets/el7a2ni_logo.png";
const styles = StyleSheet.create({
   page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
   },
   headerSection: {
      borderBottom: "5px solid #000",
      padding: 12,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
   },
   doctorName: {
      fontSize: 24,
      color: "black",
      marginBottom: "3px",
   },
   speciality: {
      fontSize: 13,
      color: "black",
   },
   patientName: {
      marginTop: 40,
      fontSize: 13,
      color: "black",
   },
   card: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: "white",
      width: "600px",
      border: "1px solid #000",
   },
   cardTitle: {
      marginBottom: 10,
      fontSize: 16,
      fontWeight: "bold",
   },
   cardDescriptionView: {
      flexDirection: "row",
      display: "flex",
      gap: 10,
   },
   cardText: {
      fontSize: 14,
      marginBottom: 5,
   },
});

const MyPDF: React.FC<{ prescription: any }> = ({ prescription }) => {
   return (
      <Document>
         <Page style={styles.page}>
            <View>
               <View style={styles.headerSection}>
                  <View>
                     <Text style={styles.doctorName}>Dr. {prescription.doctor?.name}</Text>
                     <Text style={styles.speciality}>{prescription.doctor?.name}</Text>
                     <Text style={styles.patientName}>
                        Patient Name: {prescription.patient?.name}{" "}
                     </Text>
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

const DownloadablePDF: React.FC<{ prescription: any }> = ({ prescription }) => {
   const fileName = "medications-document.pdf";

   return (
      <div>
         <PDFDownloadLink
            style={{ textDecoration: "none" }}
            document={<MyPDF prescription={prescription} />}
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
                     opacity: 0.7,
                  },
               }}
            >
               <img width={24} src={pdfLogo} alt="PDF Icon" />
               Export as PDF
            </Button>
         </PDFDownloadLink>
      </div>
   );
};

export default DownloadablePDF;
