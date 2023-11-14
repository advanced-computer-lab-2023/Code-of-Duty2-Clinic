import { useState,useEffect } from "react"
import {  useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal  from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InfoIcon from '@mui/icons-material/Info';
import { FormControl, FormLabel } from '@mui/material';
import axios, { AxiosResponse } from "axios";
import { config } from "../../configuration";

const searchstyle = {

    display:'flex',
    flexDirection:'column',
    justify:'center',
    gap:'20px',
    margin:'20px'
}

interface IMedicine {
        
    medicineId: {
        _id: string,
        name: string,
        price: number
    }
    dosage: string,
        
}

interface IPrescription {
    _id: string
    patientName:string,
    doctorId:{
        _id:string
        name:string
    },
    status:string, 
    medicines: [IMedicine],
    updatedAt:Date
}


interface ISearch{
    doctorName?:string,
    updatedAt?:string,
    status?:string
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


  const PrescriptionsPage: React.FC = () => {

    const [viewModal,setviewModal] = useState(false)
    const [selectedPrescription,setSelectedPrescription] = useState<IPrescription>()
    const [searchOptions,setSearchOptions] = useState<ISearch>({status:"none"})
    const [status,setStatus] = useState<string>("none")

    const [prescriptions,setPrescriptions] = useState([])

    useEffect(()=>{
        axios.get(`${config.serverUri}/patients/prescriptions`).then((response:AxiosResponse)=>{
            setPrescriptions(response.data)
        })
    },[])

    function printDate(date :string ) :string{
        const dateObj:Date  = new Date(date);
        return `${dateObj.getDate()} - ${dateObj.getMonth()+1} - ${dateObj.getFullYear()}`
    }

    function viewSelectedPrescription(index:number){
        setSelectedPrescription(prescriptions[index])
        setviewModal(true)
    }

    function handleStatusChange(event: SelectChangeEvent){
       
        if(event.target.value==='none')
            setSearchOptions(old=>{
                let nn:ISearch|undefined = {};
                if(old){
                    nn=old
                }
                delete nn['status'] 
                
                return nn
            })
        else
            setSearchOptions(old=>{
                let nn:ISearch|undefined = {};
                if(old){
                    nn=old
                }
                nn.status = event.target.value
                
                return nn
            })
        setStatus(event.target.value)
    }

    function handleDateChange(event:React.ChangeEvent<HTMLInputElement>){
       setSearchOptions(old=>{
            let nn:ISearch|undefined = {};
            if(old){
                nn=old
            }
            nn.updatedAt =event.currentTarget.value
            return nn
       })
    }


    async function search(){
        const data:any={}
        if(searchOptions?.updatedAt) data.updatedAt = searchOptions.updatedAt
        if(searchOptions?.doctorName) data.doctorName = searchOptions.doctorName 
        if(searchOptions?.status&&searchOptions?.status!='none')data.status = searchOptions.status
        const searchResults:[]=await (await axios.get(`${config.serverUri}/patients/prescriptions`,{params:data})).data
        setPrescriptions(searchResults)
    }
    return (
       <div className="px-12 my-10 flex-col gap-11 align-center">
        <h1 className="text-xl mb-11 mx-auto">Prescriptions</h1>
                    {/* Search Feature */}
                    <FormControl sx={searchstyle}>
                        <FormLabel>Doctor Name</FormLabel>
                        <TextField type="text" size='small' onChange={ ev =>setSearchOptions((old)=>{
                            let nn :ISearch|undefined;
                            if(old)
                                nn = {
                                    ...old,
                                    doctorName:ev.target.value
                                }
                            else
                                nn={
                                    doctorName: ev.target.value
                                }
                            return nn;
                        })} />
                        <FormLabel>status</FormLabel>
                        
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="status"
                                onChange={handleStatusChange}
                                >
                                 <MenuItem value={'none'}>None</MenuItem>
                                <MenuItem value={'unfilled'}>unfilled</MenuItem>
                                <MenuItem value={'filled'}>filled</MenuItem>
                                
                            </Select>
                        <FormLabel>Date</FormLabel>
                        <TextField 
                            type="date" 
                            size='small' 
                            onChange={handleDateChange}
                        />
                       
                        <Button variant="contained" sx={{width:'100px'}} onClick={search} >Search</Button>
                    </FormControl>
                   
                   <TableContainer component={Paper}>
                   <Table sx={{ minWidth: 650,minHeight:100,width:'100%',margin:'auto'}} aria-label="simple table">
                   <TableHead>
                       <TableRow>
                       <TableCell>Doctor Name</TableCell>
                       <TableCell align="center">status</TableCell>
                       <TableCell align="center">Date</TableCell>
                       <TableCell align="center">medicines</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                   {prescriptions.map((prescription:IPrescription,index:number)=>(         
                       <TableRow
                           key={index}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                       >
                           <TableCell component="th" scope="row">
                            {prescription.doctorId.name}
                           </TableCell>
                           <TableCell align="center">{prescription.status}</TableCell>
                           <TableCell align="center">{printDate(prescription.updatedAt.toString())}</TableCell>
                           <TableCell align="center">
                                <IconButton onClick={()=>viewSelectedPrescription(index)} aria-label="delete">
                                    <InfoIcon />
                                </IconButton>
                           </TableCell>
                       </TableRow>
                       ))}
                   </TableBody>
                   </Table>
               </TableContainer>

            <Modal
                open={viewModal}
                onClose={()=>setviewModal(false)}
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
                                <TableCell align="center">Medicine</TableCell>
                                <TableCell align="center">Dosage</TableCell>
                                <TableCell align="center">price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { selectedPrescription?.medicines.map((medicine:IMedicine,index:number)=>(         
                                <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{medicine.medicineId.name}</TableCell>
                                    <TableCell align="center">{medicine.dosage}</TableCell>
                                    <TableCell align="center">{medicine.medicineId.price}</TableCell>

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

export default PrescriptionsPage