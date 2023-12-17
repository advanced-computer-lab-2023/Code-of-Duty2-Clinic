import { Typography } from "@mui/material";
import { FC } from "react";

const Wallet: FC = () => {
   return (
      <div style={{color:'gray'}}>
         <Typography variant="h6" sx={{color:'gray'}} gutterBottom>
            Pay via Wallet
         </Typography>
         <p>Experience the convenience of digital wallet payments.</p>
         <p>
            No need for cash or cards. Just place your order and payusing your<br/>  El7a2ni digital
            wallet. Enjoy this modern and reliable method of payment.
         </p>
      </div>
   );
};

export default Wallet;
