import { Card, CardContent, Typography } from "@mui/material";
import { FaWallet } from "react-icons/fa";



export default function Wallet() {
    const balance = 500;

    return (
            <Card style={{ marginBottom: "0", width: "10vw" }}>
                <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FaWallet style={{ marginRight: "8px" }} /> 
                            <Typography variant="h5" style={{ marginLeft: "4px", textAlign: "center" }}>
                                Balance
                            </Typography>
                        </div>
                    </Typography>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6" style={{ marginLeft: "8px", textAlign: "center" }}>
                            ${balance}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
    );
}