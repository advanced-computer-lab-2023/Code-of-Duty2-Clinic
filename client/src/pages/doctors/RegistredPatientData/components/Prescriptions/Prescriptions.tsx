import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import List from "@mui/material/List";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useParams } from "react-router-dom";
import {
   Alert,
   AlertTitle,
   Button,
   Chip,
   Divider,
   IconButton,
   LinearProgress,
   ListSubheader,
} from "@mui/material";

import { getErrorMessage } from "../../../../../utils/displayError";
import { getFormattedDate } from "../../../../../utils/formatter";
import MedicineCrudGrid from "./components/MedicinesTable/MedicinesTable";
import {
   ServerResponse,
   fetchPrescriptions,
   useCreatePrescriptionMutation,
   useSubmitPrescriptionMutation,
} from "./prescriptionService";
import DownloadablePDF from "../../../../../components/PDF_File";
import { useInfiniteQuery } from "react-query";
import PrescriptionListSkeleton from "./components/PrescriptionsListSkeleton";
export interface ITodo {
   id: number;
   message: string;
}
export interface IInfinitePage {
   medicines: [any];
   hasNextPage: boolean;
   createdAt: string;
}
const Prescriptions: React.FC = () => {
   const [expanded, setExpanded] = useState<string | false>(false);

   const { patientId } = useParams();

   const submitPrescriptionMuatation = useSubmitPrescriptionMutation();

   const createPrescriptionMutation = useCreatePrescriptionMutation();

   const {
      data,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
      refetch,
      isLoading,
      isError,
      error,
      isSuccess,
      isRefetching,
   } = useInfiniteQuery<ServerResponse, Error>(
      "infinite",
      ({ pageParam = "3/2/3500" }) => fetchPrescriptions({ pageParam, patientId: patientId! }),
      {
         getNextPageParam: (lastPage, _) =>
            lastPage.hasNextPage ? lastPage.data[lastPage.data.length - 1].createdAt : undefined,
      }
   );

   const loadMoreRef = useRef<HTMLDivElement | null>(null);
   useEffect(() => {
      const observer = new IntersectionObserver(
         entries => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
               fetchNextPage();
            }
         },
         { threshold: 1 }
      );
      const currentRef = loadMoreRef.current;
      if (currentRef) observer.observe(currentRef);
      return () => {
         if (currentRef) observer.unobserve(currentRef);
      };
   }, [fetchNextPage, isFetchingNextPage, hasNextPage, isRefetching]);

   function sumbitPrescriptionToPharamcy(prescriptionId: string) {
      const mutationInput = {
         prescriptionId,
         patientId: patientId!,
      };
      submitPrescriptionMuatation.mutate(mutationInput);
      refetch();
   }
   function handleCreatePrescription() {
      createPrescriptionMutation.mutate({ patientId: patientId! });
      refetch();
   }
   const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
   };
   if (isLoading) return <PrescriptionListSkeleton />;
   return (
      <div>
         <Button
            onClick={() => handleCreatePrescription()}
            sx={{
               marginRight: "auto",
               marginY: 2,
               color: " white",
               backgroundColor: "#103939",
               "&:hover": {
                  backgroundColor: "#103939",
                  opacity: 0.7,
               },
            }}
         >
            Add Prescription
         </Button>
         {isError && (
            <Alert
               variant="outlined"
               severity="error"
               sx={{ mt: 4, mb: 2 }}
               action={
                  <IconButton
                     aria-label="close"
                     color="inherit"
                     size="small"
                     onClick={() => refetch()}
                  >
                     <CloseIcon fontSize="inherit" />
                  </IconButton>
               }
            >
               <AlertTitle>Oops!</AlertTitle>
               <strong>{getErrorMessage(error)}</strong>
            </Alert>
         )}
         {isLoading && <PrescriptionListSkeleton />}
         {isSuccess &&
            data?.pages.map((page, i) => (
               <React.Fragment key={i}>
                  {page.data.map(prescription => {
                     let id = prescription._id;
                     return (
                        <div>
                           <Accordion
                              sx={{
                                 marginY: "50px",
                                 minHeight: 100,
                                 border: "1.6px lightgray solid",
                              }}
                              expanded={expanded === id}
                              onChange={handleChange(id)}
                           >
                              <AccordionSummary
                                 sx={{ minHeight: 100 }}
                                 expandIcon={<ExpandMoreIcon />}
                                 aria-controls={`${id}bh-content`}
                                 id={`${id}bh-header`}
                              >
                                 <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                    {" "}
                                    <NoteAddIcon sx={{ fontSize: 50 }} />
                                    <Typography sx={{ marginLeft: "auto" }}>
                                       Last Updated {getFormattedDate(prescription.updatedAt)}
                                    </Typography>
                                 </Typography>
                                 <Typography
                                    sx={{ marginLeft: "auto", paddingX: "20px", color: "white" }}
                                 >
                                    {prescription.isSubmitted ? (
                                       <Chip
                                          label="Submitted"
                                          sx={{
                                             backgroundImage:
                                                "linear-gradient(to right, #178c36, #00ff99)",
                                             fontWeight: 500,
                                             color: "white",
                                             width: 180,
                                             opacity: 0.5,
                                          }}
                                          icon={<DoneIcon />}
                                       />
                                    ) : (
                                       <Chip
                                          label="Pending Submission"
                                          sx={{
                                             fontWeight: 500,
                                             color: "#0288d1",
                                             width: 180,
                                             backgroundColor: "lightblue",
                                             opacity: 0.5,
                                          }}
                                          icon={<EditIcon color="info" />}
                                       />
                                    )}
                                 </Typography>
                              </AccordionSummary>

                              <AccordionDetails>
                                 {!prescription.isSubmitted ? (
                                    <Button
                                       onClick={() =>
                                          sumbitPrescriptionToPharamcy(prescription._id)
                                       }
                                       sx={{
                                          marginBottom: 4,
                                          color: " white",
                                          backgroundImage:
                                             "linear-gradient(to right, #178c36, #00ff99)",
                                          "&:hover": {
                                             backgroundImage:
                                                "linear-gradient(to right, #178c36, #00ff99)",
                                             opacity: 0.7,
                                          },
                                       }}
                                    >
                                       Submit Prescription
                                    </Button>
                                 ) : (
                                    <DownloadablePDF prescription={prescription} />
                                 )}

                                 <Divider />
                                 <List
                                    sx={{ width: "100%", bgcolor: "background.paper" }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                       <ListSubheader
                                          sx={{
                                             fontSize: "20px",
                                             display: "flex",
                                             justifyContent: "space-between",
                                             paddingX: 0,
                                             paddingY: 2,
                                          }}
                                          component="div"
                                          id="nested-list-subheader"
                                       >
                                          Medicines{" "}
                                       </ListSubheader>
                                    }
                                 >
                                    <MedicineCrudGrid
                                       prescriptionId={prescription._id}
                                       isSubmitted={prescription.isSubmitted}
                                       medicines={prescription.medicines}
                                    />
                                 </List>
                              </AccordionDetails>
                              <Divider />
                           </Accordion>
                        </div>
                     );
                  })}
               </React.Fragment>
            ))}
         <div ref={loadMoreRef} /> {/* Invisible sentinel div */}
         {isFetchingNextPage && <LinearProgress />} {/* Loading indicator */}
      </div>
   );
};

export default Prescriptions;
