import Wallet from "../../features/wallets/wallet-viewing/Wallet";

const ViewWallet: React.FC = () => {
  return (
    <div>
      <Wallet balance={100} />
    </div>
  );
};

export default ViewWallet;
