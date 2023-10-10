import { useState } from "react"


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Modal  from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { FormControl, FormLabel } from '@mui/material';
import axios from "axios";

interface IPrescription {
    _id: string
    patientName:string,
    doctorName:string,
    status:string, 
    medicines: [
        {
            medicineId: string,
            dosage: string,
            _id: string
        }
    ],
    updatedAt:Date
}
enum stat{
    filled,unfilled
}

interface IMedicine {
        
    medicineId: string,
    dosage: string,
    _id: string
        
}
interface ISearch{
    doctorName:string,
    updatedAt:string,
    status:stat
}
const deleteModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function PatientPrescriptions(){
    const [modal,setModal] = useState(true)
    const [viewModal,setviewModal] = useState(false)
    const [selectedPrescription,setSelectedPrescription] = useState<IPrescription>()
    const [id,setId] = useState("")
    const [searchOptions,setSearchOptions] = useState<ISearch>()
    const [preState, setPreState] =  useState('1');

    const [prescriptions,setPrescriptions] = useState([])
   

    const getPrescriptions=async ()=>{
       const fetchedPrescription:[] =  await (await axios.get(`http://localhost:8080/prescription/patient/${id}`)).data.prescriptionsWithNames
       console.log(fetchedPrescription)
        setPrescriptions(fetchedPrescription)
      
        setModal(false)
    }
    function printDate(date :string ) :string{
        const dateObj:Date  = new Date(date);
        return `${dateObj.getDate()} - ${dateObj.getMonth()} - ${dateObj.getFullYear()}`
    }

    function viewSelectedPrescription(index:number){
        setSelectedPrescription(prescriptions[index])
        setviewModal(true)
    }
    function handleStatus(event:SelectChangeEvent){
        
       // setPreState(event.target.value as number)
    }
    return (
       <div>
        <h1>Prescriptions</h1>
            {/* {prescriptions.map(prescription=>(
                
                    <div>
                       <h1> {prescription}</h1>
                    </div>
                
            ))} */}

            
<FormControl style={{width:'100%'}}>
                        <FormLabel>Doctor Name</FormLabel>
                        <TextField type="text" size='small' onChange={ ev =>setSearchOptions((old)=>{
                            if(old)
                               old.doctorName=ev.target.value;
                            return old;
                        })} />
                        <FormLabel>status</FormLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={preState}
                                label="Age"
                                onChange={handleStatus}
                                >
                                <MenuItem value={'1'}>Filled</MenuItem>
                                <MenuItem value={'2'}>Unfilled</MenuItem>
                            </Select>
                        <FormLabel></FormLabel>
                        <TextField 
                            type="number" 
                            size='small' 
                            onChange={ ev =>selectedHealthPackage.packageDurationInYears=Number(ev.target.value)}
                            defaultValue={selectedHealthPackage?.packageDurationInYears}  />

                        <FormLabel>Doctor Session Discount</FormLabel>
                        
                        <FormLabel>Family Members Discount</FormLabel>
                       
                       
                        (<Button variant="contained" >Search</Button>)}
                    </FormControl>
                   
                   <TableContainer component={Paper}>
                   <Table sx={{ minWidth: 650 }} aria-label="simple table">
                   <TableHead>
                       <TableRow>
                       <TableCell>Doctor Name</TableCell>
                       <TableCell align="center">status</TableCell>
                       <TableCell align="center">Date</TableCell>
                       <TableCell align="center">medicines</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                   { !modal && prescriptions.map((prescription:IPrescription,index:number)=>(         
                       <TableRow
                           key={index}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                       >
                           <TableCell component="th" scope="row">
                            {prescription.doctorName}
                           </TableCell>
                           <TableCell align="center">{prescription.status}</TableCell>
                           <TableCell align="center">{printDate(prescription.updatedAt.toString())}</TableCell>
                           <TableCell align="center">
                                <IconButton onClick={()=>viewSelectedPrescription(index)} aria-label="delete">
                                    <EditIcon />
                                </IconButton>
                           </TableCell>
                       </TableRow>
                       ))}
                   </TableBody>
                   </Table>
               </TableContainer>
   
                   
                
            <Modal
                open={modal}
                onClose={()=>setModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={deleteModalStyle}>
                    <FormControl style={{width:'100%'}}>
                        <FormLabel>Patient Id</FormLabel>
                        <TextField onChange={(ev)=>setId(ev.target.value)} type="text" size='small'/>
                        <Button variant="contained" onClick={getPrescriptions}>Create</Button>
                    </FormControl>
                </Box>
            </Modal>



            <Modal
                open={viewModal}
                onClose={()=>setModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={deleteModalStyle}>
                <IconButton onClick={()=>setviewModal(false)} aria-label="delete">
                                
                                <CloseIcon />
                            </IconButton>
                <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell>Medicine</TableCell>
                                <TableCell align="center">Dosage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { !modal && selectedPrescription?.medicines.map((medicine:IMedicine,index:number)=>(         
                                <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{medicine._id}</TableCell>
                                    <TableCell align="center">{medicine.dosage}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
       </div>
       
    )
}