import axios from "axios"
import { useEffect, useState } from "react"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import Modal  from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { FormControl, FormLabel } from '@mui/material';

export default function(){

    const [doctors,setDoctors] = useState([])

    useEffect(()=>{
    axios.get('http://localhost:8080/doctor').then((response)=>{setDoctors(response.data)})
      
    })

    return (
        <div>
             
             <TableContainer component={Paper}>
                   <Table sx={{ minWidth: 650 }} aria-label="simple table">
                   <TableHead>
                       <TableRow>
                       <TableCell>Doctor Name</TableCell>
                       <TableCell align="center">date</TableCell>
                       <TableCell align="center">package Duration (Years)</TableCell>
                       <TableCell align="center">Doctor Session Discount</TableCell>
                       <TableCell align="center">Pharamcy Medicines Discount</TableCell>
                       <TableCell align="center">Family Members Discount</TableCell>
                       <TableCell align="center">options</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                   {doctors.map((doctor,index)=>(         
                       <TableRow
                           key={index}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                       >
                           <TableCell component="th" scope="row">
                            
                           </TableCell>
                           <TableCell align="center">{doctor}</TableCell>
                           <TableCell align="center">{}</TableCell>
                           <TableCell align="center">{}</TableCell>
                           <TableCell align="center">{}</TableCell>
                           <TableCell align="center">{}</TableCell>
                           <TableCell align="center">
                             
                           </TableCell>
                       </TableRow>
                       ))}
                   </TableBody>
                   </Table>
               </TableContainer>
        </div>
    )
}