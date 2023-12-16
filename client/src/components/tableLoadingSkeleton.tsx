import { Skeleton, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { v4 as generateID } from "uuid";
const TableLoadingSkeleton: FC<{ columns?: number }> = ({ columns }) => {
   return Array.from(new Array(7)).map((index: number) => (
      <TableRow key={generateID()}>
         {[...Array(columns || 5)].map(_ => (
            <TableCell key={generateID()}>
               <Skeleton />
            </TableCell>
         ))}
      </TableRow>
   ));
};

export default TableLoadingSkeleton;
