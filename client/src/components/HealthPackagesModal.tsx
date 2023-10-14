import React, { useEffect,useState,Component,FC } from 'react';
import axios from 'axios';
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
    discounts: {
        gainedDoctorSessionDiscount: number;
        gainedPharamcyMedicinesDiscount: number;
        gainedFamilyMembersDiscount: number;
    };
    packageDurationInYears: number;
}
interface HealthPackagesModalProps {
  healthPackage: IHealthPackage;
  create:boolean;
  onSubmit?:(fetch:boolean)=>void;
  onClos?:(closed:boolean)=>void;
  open:boolean
}

const HealthPackagesModal:React.FC<HealthPackagesModalProps> =({healthPackage,create,onSubmit,open,onClos}) => {
    
        
        const [openEditingModal, setOpenEditingModal] = React.useState(open);
        useEffect(()=>{
            console.log(healthPackage)
        },[])
        const createHealthPackage = async()=>{
            const data = {  
                name: healthPackage.name,
                amountToPay: healthPackage.amountToPay,
                discounts: {
                    gainedDoctorSessionDiscount: healthPackage.discounts.gainedDoctorSessionDiscount,
                    gainedPharamcyMedicinesDiscount: healthPackage.discounts.gainedPharamcyMedicinesDiscount,
                    gainedFamilyMembersDiscount: healthPackage.discounts.gainedFamilyMembersDiscount,
                },
                packageDurationInYears: healthPackage.packageDurationInYears
            }
            await axios.post('http://localhost:8080/api/healthPackages',data)
            //inefficient
             //fetchHealthPackages()  request fetching from parent
             onSubmit?.(true);
            setOpenEditingModal(false);
            onClos?.(false)
    
        }

        const saveHealthPackage = async ()=>{
            const data = {  
                name: healthPackage.name,
                amountToPay: healthPackage.amountToPay,
                discounts: {
                    gainedDoctorSessionDiscount: healthPackage.discounts.gainedDoctorSessionDiscount,
                    gainedPharamcyMedicinesDiscount: healthPackage.discounts.gainedPharamcyMedicinesDiscount,
                    gainedFamilyMembersDiscount: healthPackage.discounts.gainedFamilyMembersDiscount,
                },
                packageDurationInYears: healthPackage.packageDurationInYears
            }
            console.log(data)
           console.log(await axios.put(`http://localhost:8080/api/healthPackages/${healthPackage._id}`,data).then(response =>{console.log(response.status) }))
            //inefficient
           // fetchHealthPackages() 
           onSubmit?.(true); 
            setOpenEditingModal(false);
            onClos?.(false)
        }

        // function createModal(){
        //     setCreate(true)
        //     setSelectedHealthPackage(HealthPackageResetter)
        //     setOpenEditingModal(true);
        // }
        
        return (
            <div>
                 <Modal 
                open={openEditingModal}
                onClose={()=>{onClos?.(false);setOpenEditingModal(false)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={deleteModalStyle}>
                    <FormControl style={{width:'100%'}}>
                        <FormLabel>Name</FormLabel>
                        <TextField type="text" size='small' onChange={ ev =>healthPackage.name=ev.target.value} defaultValue={healthPackage?.name} />

                        <FormLabel>Price</FormLabel>
                        <TextField 
                            type="number" 
                            size='small' 
                            onChange={ ev =>healthPackage.amountToPay=Number(ev.target.value)} 
                            defaultValue={healthPackage?.amountToPay} />

                        <FormLabel>Duration</FormLabel>
                        <TextField 
                            type="number" 
                            size='small' 
                            onChange={ ev =>healthPackage.packageDurationInYears=Number(ev.target.value)}
                            defaultValue={healthPackage?.packageDurationInYears}  />

                        <FormLabel>Doctor Session Discount</FormLabel>
                        <TextField 
                            type="number" 
                            size='small'
                            onChange={ ev =>healthPackage.discounts.gainedDoctorSessionDiscount=Number(ev.target.value)/100}
                            defaultValue={healthPackage?.discounts.gainedDoctorSessionDiscount*100}  />

                        <FormLabel>Family Members Discount</FormLabel>
                        <TextField type="number"
                         size='small' 
                         onChange={ ev =>healthPackage.discounts.gainedFamilyMembersDiscount=Number(ev.target.value)/100}
                         defaultValue={healthPackage?.discounts.gainedFamilyMembersDiscount*100} />

                        <FormLabel>Pharmacy Medicines Discount</FormLabel>
                        <TextField 
                            type="number" 
                            size='small' 
                            onChange={ ev =>healthPackage.discounts.gainedPharamcyMedicinesDiscount=Number(ev.target.value)/100}
                            defaultValue={healthPackage?.discounts.gainedPharamcyMedicinesDiscount*100}  />

                        {create&& (<Button variant="contained" onClick={createHealthPackage}>Create</Button>)}
                        {!create &&(<Button variant="contained" onClick={saveHealthPackage}>Save</Button>)}
                    </FormControl>           
                </Box>
            </Modal>
            </div>
        )
    
}

export default HealthPackagesModal