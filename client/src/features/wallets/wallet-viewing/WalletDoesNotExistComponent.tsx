import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type CreateNewWalletProps = {
  walletCreationLink: string;
};
const WalletDoesNotExistComponent: React.FC<CreateNewWalletProps> = ({
  walletCreationLink,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Typography variant="h6">You don't have a wallet yet</Typography>
      <Button onClick={() => navigate(walletCreationLink)}>
        Create Wallet
      </Button>
    </div>
  );
};

export default WalletDoesNotExistComponent;
