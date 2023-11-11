import CreateWalletForm from "../../../features/wallets/wallet-creation/CreateWalletForm";

const CreateWallet: React.FC = () => {
  return (
    <CreateWalletForm
      walletExistsRoute="/patients/wallets/exists"
      userWalletPageLink="/patient/wallet"
      createNewWalletRoute="/patients/wallets"
    />
  );
};

export default CreateWallet;
