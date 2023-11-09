import { FC,useEffect,useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";


import { CircularProgress, Divider, IconButton, Stack } from '@mui/material';
interface IDefaultBasicTableProps{
  data:any
}

export const  DefaultBasicTable:FC<IDefaultBasicTableProps> =({data}) =>{
    const [files, setFiles] = useState<any>(data);
    const [deleteLoading, setDeleteLoading] = useState(false);
    // const addFileToTable = async (healthrecord:any) => {
    //     if (healthrecord)
    //       setFiles((old:any) => {
    //         return [...old, healthrecord];
    //       });
    //     //setUpload(false);
    //   };
    useEffect(()=>{
      setFiles(data)
    },[])
  return (
    <TableContainer sx={{ maxWidth: 550 ,minHeight:200}} component={Paper}>
      <Table sx={{ }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell align="right">File Type</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file:any) => (
            <TableRow
              key={file.fileType}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {file.fileType}
              </TableCell>
              <TableCell align="right">{}</TableCell>
              <TableCell align="right">
              <Stack
                        direction="row"
                        justifyContent="center"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                      >
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            //downloadFile(file.url, file.name);
                          }}
                        >
                          <DownloadIcon
                            color="action"
                            sx={{ color: "#103939" }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            //deleteFile(file.url, index);
                          }}
                        >
                          {deleteLoading ? (
                            <CircularProgress size={24} />
                          ) : (
                            <DeleteIcon />
                          )}
                        </IconButton>
                      </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}