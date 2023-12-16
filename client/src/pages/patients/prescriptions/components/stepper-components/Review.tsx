import { Fragment, useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
import { IOrder } from "../../interfaces";
import { PrescriptionCheckoutContext } from "../context";
const Review: React.FC = () => {
   const { order, updateOrder, setStep, prescription } = useContext(
      PrescriptionCheckoutContext
   );
   console.log(order);
   useEffect(() => {}, [order]);
   const handleSubmit = () => {
      const addressData: Partial<IOrder> = {
         patientAddress: "Sample Address 1",
      };
      updateOrder(addressData);
      setStep(prev => prev + 1);
   };
   return (
      <Fragment>
         <Box sx={{ position: "relative" }}>
            <Typography variant="h6" gutterBottom>
               Order summary
            </Typography>
         </Box>

         <List>
            {prescription?.medicines && prescription?.medicines.map(medicine => (
               <Card
                  key={medicine.medicineId}
                  elevation={0}
                  sx={{
                     p: 2,
                     display: "flex",
                     alignItems: "start",
                     mb: 2,
                     backgroundColor: "transparent",
                     border: "2px solid #103939   ",
                  }}
               >
                  <CardMedia
                     component="img"
                     sx={{ width: 80, height: 80, marginRight: 3 }}
                     image={medicine.pictureUrl}
                     alt="Live from space album cover"
                  />
                  <Box
                     sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        "& .MuiCardContent-root": {
                           padding: 0,
                        },
                     }}
                  >
                     <CardContent sx={{ flex: "1 0 auto", m: 0, py: 0 }}>
                        <Box
                           sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                           }}
                        >
                           <Typography color="primary" component="div" sx={{ fontWeight: 500 }}>
                              {medicine.name}
                           </Typography>
                           <Typography sx={{ color: "gray" }} component="div" variant="h5">
                              x{medicine.quantity}
                           </Typography>
                        </Box>

                        <Typography
                           sx={{ textDecoration: "line-through", color: "gray", opacity: 0.4 }}
                           variant="subtitle1"
                           color="text.secondary"
                           component="div"
                        >
                           EGP {medicine.priceBefore}
                        </Typography>
                        <Typography
                           sx={{ sisplay: "inline", color: "green", fontWeight: 600 }}
                           variant="subtitle1"
                           color="text.secondary"
                           component="div"
                        >
                           EGP {medicine.priceAfter}{" "}
                        </Typography>
                     </CardContent>
                  </Box>
               </Card>
            ))}
            <ListItem key={"smdfkm"} sx={{ py: 1, px: 0 }}>
               <ListItemText primary="Total" />
               <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {prescription?.medicines && prescription?.medicines.reduce(
                     (sum, medicine) => sum + (medicine.priceAfter || 0) * medicine.quantity,
                     0
                  )}
               </Typography>
            </ListItem>
         </List>
         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3, ml: 1 }}>
               Next
            </Button>
         </Box>
      </Fragment>
   );
};

export default Review;
