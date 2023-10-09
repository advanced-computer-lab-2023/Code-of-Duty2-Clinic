import { useEffect, useState } from "react";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal  from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

const deleteModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

interface IHealthPackage {
    _id?:string,
    name: string;
    amountToPay: number;
    discount: {
        gainedDoctorSessionDiscount: number;
        gainedPharamcyMedicinesDiscount: number;
        gainedFamilyMembersDiscount: number;
    };
    packageDurationInYears: number;
}

const HealthPackageResetter = {
    _id:"",
    name: "",
    amountToPay: 0,
    discount: {
        gainedDoctorSessionDiscount: 0,
        gainedPharamcyMedicinesDiscount: 0,
        gainedFamilyMembersDiscount: 0,
    },
    packageDurationInYears: 0
}
export default function HealthPackages (){

    
    const [selectedHealthPackage,setSelectedHealthPackage] = useState<IHealthPackage>(HealthPackageResetter)
    const [healthpackages,setHealthPackages] = useState([])
    const [openEditingModal, setOpenEditingModal] = useState(false);
    const [openDeletingModal, setOpenDeletingModal] = useState(false);
    const [create, setCreate] = useState(false);

// inefficient cause on every change we get all packages from databse (solution: push and pop from list)
   function fetchHealthPackages(){
        axios.get('http://localhost:8080/healthPackage').then(response =>{setHealthPackages(response.data) })

    }
    useEffect(()=>{fetchHealthPackages()},[]);
   
    function editModal(index:number) {
        setCreate(false)
        setSelectedHealthPackage(healthpackages[index])
        setOpenEditingModal(true);
        
    }

    function deleteModal(index:number) {
        setSelectedHealthPackage(healthpackages[index])
        setOpenDeletingModal(true);
    }

    function createModal(){
        setCreate(true)
        setSelectedHealthPackage(HealthPackageResetter)
        setOpenEditingModal(true);
    }

    const createHealthPackage = async()=>{
        const data = {  
            name: selectedHealthPackage.name,
            amountToPay: selectedHealthPackage.amountToPay,
            discount: {
                gainedDoctorSessionDiscount: selectedHealthPackage.discount.gainedDoctorSessionDiscount,
                gainedPharamcyMedicinesDiscount: selectedHealthPackage.discount.gainedPharamcyMedicinesDiscount,
                gainedFamilyMembersDiscount: selectedHealthPackage.discount.gainedFamilyMembersDiscount,
            },
            packageDurationInYears: selectedHealthPackage.packageDurationInYears
        }
        await axios.post('http://localhost:8080/healthPackage',data).then(response =>{console.log(response.status) })
        //inefficient
         fetchHealthPackages()
        setOpenEditingModal(false);

    }

    const saveHealthPackage = async ()=>{
        const data = {  
            name: selectedHealthPackage.name,
            amountToPay: selectedHealthPackage.amountToPay,
            discount: {
                gainedDoctorSessionDiscount: selectedHealthPackage.discount.gainedDoctorSessionDiscount,
                gainedPharamcyMedicinesDiscount: selectedHealthPackage.discount.gainedPharamcyMedicinesDiscount,
                gainedFamilyMembersDiscount: selectedHealthPackage.discount.gainedFamilyMembersDiscount,
            },
            packageDurationInYears: selectedHealthPackage.packageDurationInYears
        }
        await axios.put(`http://localhost:8080/healthPackage/${selectedHealthPackage._id}`,data).then(response =>{console.log(response.status) })
        //inefficient
        fetchHealthPackages()
        setOpenEditingModal(false);
    }

    const deleteHealthPackage =async ()=>{
        
        await axios.delete(`http://localhost:8080/healthPackage/${selectedHealthPackage._id}`).then(response =>{console.log(response.status) })
        //inefficient
        fetchHealthPackages()
        setOpenDeletingModal(false);
    }
    return (
        <div>
            <h1>Health Packages</h1>
            <Button onClick={createModal} variant="contained">Create Health Package</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">package Duration (Years)</TableCell>
                    <TableCell align="center">Doctor Session Discount</TableCell>
                    <TableCell align="center">Pharamcy Medicines Discount</TableCell>
                    <TableCell align="center">Family Members Discount</TableCell>
                    <TableCell align="center">options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {healthpackages.map((healthpackage:IHealthPackage,index)=>(       
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {healthpackage.name} 
                        </TableCell>
                        <TableCell align="center">{healthpackage.amountToPay}</TableCell>
                        <TableCell align="center">{healthpackage.packageDurationInYears}</TableCell>
                        <TableCell align="center">{healthpackage.discount.gainedDoctorSessionDiscount}</TableCell>
                        <TableCell align="center">{healthpackage.discount.gainedFamilyMembersDiscount}</TableCell>
                        <TableCell align="center">{healthpackage.discount.gainedDoctorSessionDiscount}</TableCell>
                        <TableCell align="center">
                            <IconButton onClick={()=>editModal(index)} aria-label="delete">
                                
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete">
                            <DeleteIcon onClick={()=>deleteModal(index)} color="error" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>


            {/* Modal for deleting Health Package */}
            <Modal 
                open={openDeletingModal}
                onClose={()=>setOpenDeletingModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={deleteModalStyle}>
                    
                    <Button onClick={deleteHealthPackage} variant="contained" color="error" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </Box>
            </Modal>

            {/* Modal for editing Health Package */}
            <Modal 
                open={openEditingModal}
                onClose={()=>setOpenEditingModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={deleteModalStyle}>
                    <FormControl style={{width:'100%'}}>
                        <FormLabel>Name</FormLabel>
                        <TextField type="text" size='small' onChange={ ev =>selectedHealthPackage.name=ev.target.value} defaultValue={selectedHealthPackage?.name} />

                        <FormLabel>Price</FormLabel>
                        <TextField 
                            type="number" 
                            size='small' 
                            onChange={ ev =>selectedHealthPackage.amountToPay=Number(ev.target.value)} 
                            defaultValue={selectedHealthPackage?.amountToPay} />

                        <FormLabel>Duration</FormLabel>
                        <TextField 
                            type="number" 
                            size='small' 
                            onChange={ ev =>selectedHealthPackage.packageDurationInYears=Number(ev.target.value)}
                            defaultValue={selectedHealthPackage?.packageDurationInYears}  />

                        <FormLabel>Doctor Session Discount</FormLabel>
                        <TextField 
                            type="number" 
                            size='small'
                            onChange={ ev =>selectedHealthPackage.discount.gainedDoctorSessionDiscount=Number(ev.target.value)}
                            defaultValue={selectedHealthPackage?.discount.gainedDoctorSessionDiscount}  />

                        <FormLabel>Family Members Discount</FormLabel>
                        <TextField type="number"
                         size='small' 
                         onChange={ ev =>selectedHealthPackage.discount.gainedFamilyMembersDiscount=Number(ev.target.value)}
                         defaultValue={selectedHealthPackage?.discount.gainedFamilyMembersDiscount} />

                        <FormLabel>Pharmacy Medicines Discount</FormLabel>
                        <TextField 
                            type="number" 
                            size='small' 
                            onChange={ ev =>selectedHealthPackage.discount.gainedPharamcyMedicinesDiscount=Number(ev.target.value)}
                            defaultValue={selectedHealthPackage?.discount.gainedPharamcyMedicinesDiscount}  />

                        {create&& (<Button variant="contained" onClick={createHealthPackage}>Create</Button>)}
                        {!create &&(<Button variant="contained" onClick={saveHealthPackage}>Save</Button>)}
                    </FormControl>           
                </Box>
            </Modal>
        </div>
    )
}