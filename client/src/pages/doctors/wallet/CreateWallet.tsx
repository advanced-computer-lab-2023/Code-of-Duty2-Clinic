import CreateWalletForm from "../../../features/wallets/wallet-creation/CreateWalletForm";

const CreateWallet: React.FC = () => {
  return (
    <CreateWalletForm
      walletExistsRoute="/doctors/wallets/exists"
      userWalletPageLink="/doctor/wallet"
      createNewWalletRoute="/doctors/wallets"
    />
  );
};

export default CreateWallet;
