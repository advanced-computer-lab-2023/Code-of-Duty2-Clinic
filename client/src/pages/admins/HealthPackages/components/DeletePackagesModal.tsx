import { Box, Button, Modal } from '@mui/material';
import axios from 'axios';
import {useState} from 'react'
import { config } from '../../../../utils/config';
import DeleteIcon from '@mui/icons-material/Delete';

const ModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


interface IDeletePackageModalProps {
    close:()=>void;
    onSubmit:()=>void;
    open:boolean;
    id:string|undefined
}
const DeletePackageModal : React.FC<IDeletePackageModalProps> = ({close,onSubmit,open,id}) =>{
    const [openDeletingModal,setOpenDeletingModal]= useState(open);

    const deleteHealthPackage =async ()=>{
        
        await axios.delete(`${config.serverUri}/health-packages/${id}`).then(response =>{console.log(response.status) })
        setOpenDeletingModal(false);
        onSubmit();
        close();
    }

    return (
        <Modal 
        open={openDeletingModal}
        onClose={()=>setOpenDeletingModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={ModalStyle}>
            
            <Button onClick={deleteHealthPackage} variant="contained" color="error" startIcon={<DeleteIcon />}>
                Delete
            </Button>
        </Box>
    </Modal>
    );
}


export default DeletePackageModal