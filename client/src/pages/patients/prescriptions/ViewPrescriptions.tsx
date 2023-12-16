import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MedicationIcon from "@mui/icons-material/Medication";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Menu, Skeleton } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { config } from "../../../configuration";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import SearchIcon from "@mui/icons-material/Search";
import { IMedicine, IPrescription, ISearch } from "./interfaces";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DownloadablePDF from "../../../components/PDF_File";
import TableLoadingSkeleton from "../../../components/tableLoadingSkeleton";

const deleteModalStyle = {
   position: "absolute" as "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   bgcolor: "background.paper",
   border: "2px solid #000",
   boxShadow: 24,
   p: 4,
};

const PrescriptionsPage: React.FC = () => {
   const [viewModal, setviewModal] = useState(false);
   const [selectedPrescription, setSelectedPrescription] = useState<IPrescription>();
   const [searchOptions, setSearchOptions] = useState<ISearch>({ status: "none" });
   const [status, setStatus] = useState<string>("none");

   const [prescriptions, setPrescriptions] = useState([]);
   const navigate = useNavigate();
   useEffect(() => {
      axios.get(`${config.serverUri}/patients/prescriptions`).then((response: AxiosResponse) => {
         setPrescriptions(response.data);
      });
   }, []);

   function printDate(date: string): string {
      const dateObj: Date = new Date(date);
      return `${dateObj.getDate()} - ${dateObj.getMonth() + 1} - ${dateObj.getFullYear()}`;
   }

   function viewSelectedPrescription(index: number) {
      setSelectedPrescription(prescriptions[index]);
      setviewModal(true);
   }

   function handleStatusChange(event: SelectChangeEvent) {
      if (event.target.value === "none")
         setSearchOptions(old => {
            let nn: ISearch | undefined = {};
            if (old) {
               nn = old;
            }
            delete nn["status"];

            return nn;
         });
      else
         setSearchOptions(old => {
            let nn: ISearch | undefined = {};
            if (old) {
               nn = old;
            }
            nn.status = event.target.value;

            return nn;
         });
      setStatus(event.target.value);
   }

   function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
      setSearchOptions(old => {
         let nn: ISearch | undefined = {};
         if (old) {
            nn = old;
         }
         nn.updatedAt = event.currentTarget.value;
         return nn;
      });
   }

   async function search() {
      const data: any = {};
      if (searchOptions?.updatedAt) data.updatedAt = searchOptions.updatedAt;
      if (searchOptions?.doctorName) data.doctorName = searchOptions.doctorName;
      if (searchOptions?.status && searchOptions?.status != "none")
         data.status = searchOptions.status;
      const searchResults: [] = await (
         await axios.get(`${config.serverUri}/patients/prescriptions`, { params: data })
      ).data;
      setPrescriptions(searchResults);
   }
   return (
      <Box>
         <h1
            style={{ marginBottom: "70px", textAlign: "center", fontWeight: 500 }}
            className="text-xl mb-11 mx-auto"
         >
            Prescriptions
         </h1>
         {/* Search Feature */}

         <TableContainer sx={{ p: 0, mx: "auto", maxWidth: 850 }} component={Paper}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
               <Box sx={{ display: "flex", justifyContent: "start" }}>
                  <TextField
                     sx={{
                        "& .MuiInputBase-root": {
                           height: "60px",
                        },
                     }}
                     placeholder="Doctor Name"
                     type="text"
                     size="small"
                     onChange={ev =>
                        setSearchOptions(old => {
                           let nn: ISearch | undefined;
                           if (old)
                              nn = {
                                 ...old,
                                 doctorName: ev.target.value,
                              };
                           else
                              nn = {
                                 doctorName: ev.target.value,
                              };
                           return nn;
                        })
                     }
                  />

                  <Select
                     sx={{ width: "200px" }}
                     inputProps={{
                        sx: {
                           height: "15px !important",
                        },
                     }}
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={status}
                     placeholder="Status"
                     onChange={handleStatusChange}
                  >
                     <MenuItem value={"none"}>choose status</MenuItem>
                     <MenuItem value={"unfilled"}>unfilled</MenuItem>
                     <MenuItem value={"filled"}>filled</MenuItem>
                  </Select>

                  <TextField
                     sx={{
                        "& .MuiInputBase-root": {
                           height: "60px",
                        },
                     }}
                     variant="outlined"
                     type="date"
                     size="small"
                     onChange={handleDateChange}
                  />
               </Box>
               <Button
                  variant="contained"
                  color="primary"
                  sx={{
                     marginRight: "10px important",
                     width: "150px",
                     backgroundColor: "white",
                     color: "#103939",
                     border: "1px solid #103938",
                     "&:hover": {
                        color: "white",
                        backgroundColor: "#103938",
                     },
                  }}
                  onClick={search}
               >
                  <SearchIcon />
                  Search
               </Button>
            </Box>
            <Table
               sx={{ maxWidth: 850, minHeight: 100, width: "100%", margin: "auto" }}
               aria-label="simple table"
            >
               <TableHead sx={{ backgroundColor: "#103939", color: "white" }}>
                  <TableRow>
                     <TableCell sx={{ color: "white" }}>Doctor Name</TableCell>
                     <TableCell sx={{ color: "white" }} align="center">
                        status
                     </TableCell>
                     <TableCell sx={{ color: "white" }} align="center">
                        Date
                     </TableCell>
                     <TableCell sx={{ color: "white" }} align="center">
                        options
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {!prescriptions ? (
                     <TableLoadingSkeleton columns={4} />
                  ) : (
                     prescriptions?.map((prescription: IPrescription, index: number) => (
                        <TableRow
                           key={index}
                           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                           <TableCell component="th" scope="row">
                              {prescription.doctorId.name}
                           </TableCell>
                           <TableCell align="center">{prescription.status}</TableCell>
                           <TableCell align="center">
                              {printDate(prescription.updatedAt.toString())}
                           </TableCell>
                           <TableCell align="center">
                              <PopupState variant="popover" popupId="demo-popup-menu">
                                 {popupState => (
                                    <React.Fragment>
                                       <Button
                                          variant="contained"
                                          sx={{ boxShadow:'none',backgroundColor: "white", color: "black",'&:hover':{
                                             backgroundColor: "white"
                                          } }}
                                          {...bindTrigger(popupState)}
                                       >
                                          <MoreHorizIcon/>
                                       </Button>
                                       <Menu {...bindMenu(popupState)}>
                                          <MenuItem
                                             onClick={() => {
                                                popupState.close;
                                                viewSelectedPrescription(index);
                                             }}
                                          >
                                             <Button
                                                endIcon
                                                fullWidth
                                                sx={{ border: "1px solid #103939" }}
                                             >
                                                <MedicationIcon />
                                                View Medicines
                                             </Button>
                                          </MenuItem>
                                          <MenuItem
                                             onClick={() => {
                                                popupState.close;
                                                navigate(`./payment/${prescription._id}`);
                                             }}
                                          >
                                             {" "}
                                             <Button
                                                endIcon
                                                fullWidth
                                                sx={{ border: "1px solid #103939" }}
                                             >
                                                <ShoppingCartIcon />
                                                Pay
                                             </Button>
                                          </MenuItem>
                                          <MenuItem>
                                             <DownloadablePDF prescription={prescription} />
                                          </MenuItem>
                                       </Menu>
                                    </React.Fragment>
                                 )}
                              </PopupState>
                           </TableCell>
                        </TableRow>
                     ))
                  )}
               </TableBody>
            </Table>
         </TableContainer>
         <Modal
            open={viewModal}
            onClose={() => setviewModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={deleteModalStyle}>
               <IconButton onClick={() => setviewModal(false)} aria-label="delete">
                  <CloseIcon />
               </IconButton>
               <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                     <TableHead>
                        <TableRow>
                           <TableCell align="center">Medicine</TableCell>
                           <TableCell align="center">Dosage</TableCell>
                           <TableCell align="center">price</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {selectedPrescription?.medicines.map(
                           (medicine: IMedicine, index: number) => (
                              <TableRow
                                 key={index}
                                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                              >
                                 <TableCell align="center">{medicine.name}</TableCell>
                                 <TableCell align="center">{medicine.dosage}</TableCell>
                                 <TableCell align="center">{medicine.price}</TableCell>
                              </TableRow>
                           )
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
            </Box>
         </Modal>
      </Box>
   );
};

export default PrescriptionsPage;
