import { styled } from '@mui/material/styles';

export const FileViewModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '55%',
    height:'70%',
    bgcolor: 'white',
    borderRadius:'8px',
    boxShadow: 24,
    p: 4,
};

export const textFieldStyle = {
    '& label.Mui-focused': {
      color: '#103939',  // label color when focused
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#103939',  // underline color when not focused
    },
    '&:hover .MuiInput-underline:before': {
      borderBottomColor: '#103939',  // underline color when hovered
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#103939',  // underline color when focused
    },
    
  }
export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
export const uploadHealthRecordModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    borderRadius:'8px',
    boxShadow: 24,
    p: 4,
};