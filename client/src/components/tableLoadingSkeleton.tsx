import { Skeleton, TableCell, TableRow } from "@mui/material";
import { FC } from "react";

const TableLoadingSkeleton : FC = ()=>{
    return (
        Array.from(new Array(7)).map((index:number) => (
            <TableRow key={index}>
            <TableCell><Skeleton /></TableCell>
            <TableCell><Skeleton /></TableCell>
            <TableCell><Skeleton /></TableCell>
            <TableCell><Skeleton /></TableCell>
            </TableRow>
        ))
    )
}

export default TableLoadingSkeleton