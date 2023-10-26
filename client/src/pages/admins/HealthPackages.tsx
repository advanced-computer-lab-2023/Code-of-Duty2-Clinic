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
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
//import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { FormControl, FormLabel } from '@mui/material';
// import HealthPackages from "../healthPackages";
import HealthPackagesModal from "../../components/HealthPackagesModal";
import { config } from "../../utils/config";

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
    discounts: {
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
    discounts: {
        gainedDoctorSessionDiscount: 0,
        gainedPharamcyMedicinesDiscount: 0,
        gainedFamilyMembersDiscount: 0,
    },
    packageDurationInYears: 0
}
const HealthPackagesPage:React.FC=()=>{

    
    const [selectedHealthPackage,setSelectedHealthPackage] = useState<IHealthPackage>(HealthPackageResetter)
    const [healthpackages,setHealthPackages] = useState([])
    const [openEditingModal, setOpenEditingModal] = useState(false);
    const [openDeletingModal, setOpenDeletingModal] = useState(false);
    const [create, setCreate] = useState(false);
    

// inefficient cause on every change we get all packages from databse (solution: push and pop from list)
   function fetchHealthPackages(){
        axios.get(`${config.serverUri}/admins/health-packages`).then(response =>{setHealthPackages(response.data) })

    }
   const handleCallback = (fetch:boolean):void =>{
       
       if(fetch)fetchHealthPackages()
    }
    useEffect(()=>{fetchHealthPackages()},[openEditingModal]);
   
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


    const deleteHealthPackage =async ()=>{
        
        await axios.delete(`${config.serverUri}/admins/health-packages/${selectedHealthPackage._id}`).then(response =>{console.log(response.status) })
        //inefficient
        fetchHealthPackages()
        setOpenDeletingModal(false);
    }
    return (
        <div className="px-12 !felx !flex-col justify-center align-middle my-10">
            <h1 className="mx-auto px-auto">
                Health Packages
            </h1>
            <Button sx={{backgroundColor: '#1976d2'}} onClick={createModal} variant="contained"><AddCircleOutlineOutlinedIcon/></Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{
    background: 'linear-gradient(to right, #1976d2, #00d4ff)',color:'width',
  }}>
                    <TableRow>
                    <TableCell sx={{color:"white"}}>Name</TableCell>
                    <TableCell sx={{color:"white"}}>Price</TableCell>
                    <TableCell sx={{color:"white"}}>Package Duration (Years)</TableCell>
                    <TableCell sx={{color:"white"}}>Doctor Session Discount</TableCell>
                    <TableCell sx={{color:"white"}}>Pharamcy Medicines Discount</TableCell>
                    <TableCell sx={{color:"white"}}>Family Members Discount</TableCell>
                    <TableCell sx={{color:"white"}}>options</TableCell>
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
                        <TableCell align="center">{healthpackage.discounts.gainedDoctorSessionDiscount*100 }%</TableCell>
                        <TableCell align="center">{healthpackage.discounts.gainedPharamcyMedicinesDiscount*100 }%</TableCell>
                        <TableCell align="center">{healthpackage.discounts.gainedFamilyMembersDiscount*100 }%</TableCell>
                        <TableCell align="center">
                            <IconButton  aria-label="edit">
                                
                                <EditIcon onClick={()=>editModal(index)} />
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
            {openEditingModal &&  <HealthPackagesModal onClos={(closed)=>{setOpenEditingModal(false)}} onSubmit={handleCallback} healthPackage={selectedHealthPackage} create={create} open={openEditingModal}/>}
           
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

        </div>
    )
}
export default HealthPackagesPage