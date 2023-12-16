import {Box, Skeleton } from "@mui/material";
import { FC } from "react";

const PrescriptionListSkeleton: FC = () => {
   let cardsNumber = [1, 1, 1];
   return (
      <>
         <Skeleton
            width={140}
            height={60}
            sx={{ marginBottom: 3, display: "block" }}
            variant="text"
         />
         {cardsNumber.map(_ => {
            return (
               <Box
                  boxShadow={"-moz-initial"}
                  sx={{ display: "flex", border: "1px solid gray ", padding: 2, marginBottom: 5 }}
               >
                  <Box
                     sx={{
                        height: 80,
                        width: "100%",
                     }}
                  >
                     <Skeleton
                        width={40}
                        height={40}
                        sx={{ display: "block" }}
                        variant="circular"
                     />
                     <Skeleton
                        width={40}
                        height={40}
                        sx={{ marginTop: 2, display: "block" }}
                        variant="text"
                     />
                  </Box>
                  <Skeleton
                     sx={{ marginLeft: "auto", display: "block" }}
                     variant="rounded"
                     width={180}
                     height={30}
                  ></Skeleton>
               </Box>
            );
         })}
      </>
   );
};

export default PrescriptionListSkeleton;
