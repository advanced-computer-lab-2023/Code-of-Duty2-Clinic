import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import HealingIcon from '@mui/icons-material/Healing';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';


const MedicineInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const medicine = location.state.medicine;
  const handleBack = () => {
    navigate(-1);
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
      <Paper elevation={3} sx={{ padding: '2rem', width: '100%' }}>
      <Typography variant="h3" component="h2" sx={{ marginBottom: '5rem', textAlign: 'center' }}>
        <img src={medicine.medicineId.pictureUrl} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
        {medicine.medicineId.name}
      </Typography>
        <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
        <LocalPharmacyIcon fontSize="small" /> Dosage: {medicine.dosage}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
        <DescriptionIcon fontSize="small" /> Description: {medicine.medicineId.description}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
        <AttachMoneyIcon fontSize="small" /> Price: {medicine.medicineId.price}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
        <Inventory2Icon fontSize="small" /> Available Quantity: {medicine.medicineId.availableQuantity} 
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
        <HealingIcon fontSize="small" /> Active Ingredients: {medicine.medicineId.activeIngredients.join(', ')}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
        <HealingIcon fontSize="small" /> Usages: {medicine.medicineId.usages.join(', ')}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
        <CalendarTodayIcon fontSize="small" /> Created At: {new Date(medicine.medicineId.createdAt).toLocaleDateString('de-DE')}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
        <UpdateIcon fontSize="small" /> Updated At: {new Date(medicine.medicineId.updatedAt).toLocaleDateString('de-DE')}
      </Typography>
      <Button variant="contained" onClick={handleBack} sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem' }}>
  Back to Prescription
</Button>

      </Paper>
    </Box>
  );
}

export default MedicineInfo;
