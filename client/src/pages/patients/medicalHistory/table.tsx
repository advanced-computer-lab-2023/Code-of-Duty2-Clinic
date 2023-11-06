// import { useState,useRef, useEffect } from "react";
// import { storage } from '../../../utils/firebase.config';
// import { ref, deleteObject } from "firebase/storage";
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import {uploadImage} from '../../../services/fileUploader'
// import LoadingButton from '@mui/lab/LoadingButton';
// import SaveIcon from '@mui/icons-material/Save';
// import { config } from "../../../utils/config";
// import { useLocation } from "react-router-dom";
// import axios from "axios";


// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });
// const MedicalHistory:React.FC=()=> {
  
//   const patientId = useLocation().pathname.split('/')[2];
//   const [files,setFiles] = useState<[string]>()
//   const comment =useRef<HTMLInputElement>(null)
//   const [file,setFile] = useState<File>()
//   const [imgUrl, setImgUrl] = useState<string>();
//   const [saveLoading, setSaveLoading] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   useEffect(()=>{
//     getAllFiles()
//   },[])
//   const getAllFiles=()=>{
//      axios.get(`${config.serverUri}/patients/${patientId}/health-records`).then(res=>setFiles(res.data))
//   }
//   const SaveImage =async (e:any) => {
//     setSaveLoading(true)
//     e.preventDefault()
//     if (!file) return;
//    setImgUrl(await uploadImage(file,comment.current?.value||""))
//    console.log(imgUrl)
//    setSaveLoading(false)
//   }
//   const fileChange=(e:any)=>{
//     setFile(e.target.files[0])
//   } 
//   const deleteImage = ()=>{
//     setDeleteLoading(true)
//     const refd =ref(storage,imgUrl)
//     deleteObject(refd)
//     setDeleteLoading(false)
//   }
//   const onDownload = () => {
//     window.open(imgUrl,'_blank')
//   };
 
//   return (
    
//     <div className="App">
//       <form className='form flex flex-col'>
//         <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
//           Upload file
//           <VisuallyHiddenInput onChange={fileChange} type="file" />
//         </Button>
//         <span className="block">{file?.name}</span>
//         <input type='text' ref={comment} placeholder='Enter file name' />      
//         <LoadingButton
//           loading={saveLoading}
//           loadingPosition="start"
//           startIcon={<SaveIcon />}
//           variant="outlined"
//           onClick={SaveImage}
//         >
//           Save
//         </LoadingButton>
//         </form>
//       {
//         imgUrl &&
//         <img src={imgUrl} alt="" height={200} />
//       }
//       {files?.map((file,index) =>(
//         <div key={index}>
//            <img  height={200} src={file} />
//            <a href={imgUrl} download="MyExample.jpg" rel="noopener noreferrer">
//             <Button variant="contained" color="primary">
//               Download
//             </Button>
//            </a>
//            <LoadingButton
//           loading={deleteLoading}
//           loadingPosition="start"
//           startIcon={<SaveIcon />}
//           variant="outlined"
//           onClick={deleteImage}
//         >
//           Delete
//         </LoadingButton>
            
//         </div>
       
//       ))}
//     </div>
//   );
// }

// export default MedicalHistory;