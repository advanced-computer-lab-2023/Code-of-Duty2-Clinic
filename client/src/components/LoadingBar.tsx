import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingBar = () => {
    return (
        <Box 
        sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <CircularProgress />
        </Box>
    );
}

export default LoadingBar;

