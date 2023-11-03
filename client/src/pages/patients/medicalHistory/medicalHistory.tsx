import { useState,useEffect,useRef } from 'react';
import { storage } from '../../../utils/firebase.config';
import { ref, deleteObject } from "firebase/storage";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {uploadImage} from '../../../services/fileUploader'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { config } from "../../../utils/config";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { EnhancedTableToolbar } from './components/tableToolBar';
import { EnhancedTableHead } from './components/tableHead';
import { CircularProgress, Divider, IconButton, Skeleton, Stack } from '@mui/material';
import TableLoadingSkeleton from '../../../components/tableLoadingSkeleton';
import {Image} from 'mui-image'
import image from '../../../assets/medicalDoc2.png'

const MedicalHistory:React.FC=()=> {

    const [files,setFiles] = useState<[string]>()
    const comment =useRef<HTMLInputElement>(null)
    const [file,setFile] = useState<File>()
    const [imgUrl, setImgUrl] = useState<string>();
    const [tableLoading, setTableLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [opacity, setOpacity] = useState(0);

    useEffect(()=>{
      const fadeIn = setTimeout(() => setOpacity(1), 1000); // Fade in after 1 second
    const fadeOut = setTimeout(() => setOpacity(0), 2000); // Then fade out after 1 more second

        getAllFiles()
        },[])
    const getAllFiles=()=>{
        axios.get(`${config.serverUri}/patients/health-records`).then(res=>{setFiles(res.data);setTableLoading(false)})
    }
    const SaveImage =async (e:any) => {
        setSaveLoading(true)
        e.preventDefault()
        if (!file) return;
       setImgUrl(await uploadImage(file,comment.current?.value||""))
       console.log(imgUrl)
       setSaveLoading(false)
      }
    const fileChange=(e:any)=>{
    setFile(e.target.files[0])
    } 
    const deleteImage = (file:string)=>{
    setDeleteLoading(true)
    const refd =ref(storage,'https://firebasestorage.googleapis.com/v0/b/clinic-pharmacy-21dea.appspot.com/o/files%2F16553829-644d-4221-849d-713c01bd5919?alt=media&token=219311e7-c212-4ad8-8e8a-bff484de80b3&_gl=1*1whi3wt*_ga*MTc3NzQ3MjIwMS4xNjk4NTE3NjYx*_ga_CW55HF8NVT*MTY5ODYwNTY0OS4xNC4xLjE2OTg2MDU3MjUuNTIuMC4w')
    deleteObject(refd).then((res)=>{setDeleteLoading(false)})
    }
    const [selected, setSelected] = useState<readonly number[]>([]);
    //   const [page, setPage] = React.useState(0);
    //   const [dense, setDense] = React.useState(false);
    //   const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
        const newSelected = files?.map((n,index) => index);
        setSelected(newSelected||[]);
        return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
        );
        }
        setSelected(newSelected);
    };


    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    
    return (
        <Stack position='relative' direction="row" justifyContent='center' sx={{ width: '100%' }}>
         
        <Paper sx={{mb: 2 ,width:'90%' }}>
        
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
            <Box
              component="img"
              className='my-img'
              alt="The house from the offer."
              src={image}
              />
            <Table
                sx={{ minWidth: 750, }}
                aria-labelledby="tableTitle"
                size={'medium'}
            >
                <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={files?.length||0}
                />
                <TableBody>
                {tableLoading ? (<TableLoadingSkeleton/>):
                files?.map((file, index) => {
                    const isItemSelected = isSelected(index);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                    <TableRow   
                        aria-checked={true}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        sx={{
                          '&.Mui-selected, &.Mui-selected:hover': {
                            backgroundColor: '#1039394D', // Change this to your desired color
                          },
                        }}
                    >
                        <TableCell padding="checkbox">
                        <Checkbox
                            onClick={(event) => handleClick(event,index)}
                            role="checkbox"
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                            'aria-labelledby': labelId,
                            }}
                        />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {file}
                        </TableCell>
                        <TableCell align="center">      
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" justifyContent='center' divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                              <a href={file} download="MyExample.jpg" rel="noopener noreferrer">
                                <IconButton>
                                  <DownloadIcon/>
                                </IconButton>    
                              </a>
                              <IconButton onClick={() => deleteImage(file)}>
                                {deleteLoading ? <CircularProgress size={24} /> : <DeleteIcon />}
                            </IconButton>
                          </Stack>
                        </TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
        </Stack>
    );
}
export default MedicalHistory
