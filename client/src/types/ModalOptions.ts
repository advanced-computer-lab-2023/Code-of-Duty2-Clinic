type ModalOptions = {
  title: string;
  description: string;
  handleConfirm: () => void;
  handleCancel?: () => void;
};

export default ModalOptions;
