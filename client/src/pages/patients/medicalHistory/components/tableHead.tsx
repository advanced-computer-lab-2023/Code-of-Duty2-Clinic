import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import {FC} from 'react'


interface Data {
    name: string;
    uploadDate:Date
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
      label: 'Name',
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
              color="primary"
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
              key={headCell.id}
              align={headCell.id=='name'?'left':'center'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              color="white"
            >
              <TableSortLabel sx={{color:"white"}} color="white">
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  