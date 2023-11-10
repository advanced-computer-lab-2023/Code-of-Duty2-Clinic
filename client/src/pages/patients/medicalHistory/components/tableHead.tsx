import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import {FC} from 'react'


interface Data {
  name: string;
  recordType:string;
  fileType:string;
  uploadDate:Date;
  options: number;
  }
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
  
const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'File Name',
  },
  {
    id: 'recordType',
    numeric: false,
    disablePadding: false,
    label: 'Health Record Type',
  },
  {
    id: 'fileType',
    numeric: false,
    disablePadding: false,
    label: 'File Type',
  },
  {
    id: 'uploadDate',
    numeric: false,
    disablePadding: false,
    label: 'Upload Date',
  },
  {
    id: 'options',
    numeric: false,
    disablePadding: false,
    label: '',
  },  
];
interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
  }
export const  EnhancedTableHead:FC<EnhancedTableProps>=(props: EnhancedTableProps) =>{
    const { onSelectAllClick,numSelected, rowCount } = props;

    return (
      <TableHead sx={{backgroundColor:'#103939',color:'white'}}>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              sx={{color:'white'}}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              sx={{textAlign:headCell.id=='name'?'left':'center',color:"white"}}
              key={headCell.id}
              align={headCell.id=='name'?'left':'center'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              color="white"
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  