import { Skeleton, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import {v4 as generateID} from 'uuid'
const TableLoadingSkeleton : FC = ()=>{
    return (
        Array.from(new Array(7)).map((index:number) => (
            <TableRow key={generateID()}>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
            </TableRow>
        ))
    )
}

export default TableLoadingSkeleton