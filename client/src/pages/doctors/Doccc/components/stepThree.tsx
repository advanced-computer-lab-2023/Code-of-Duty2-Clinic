import { Button, Grid, Input, Stack, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { DefaultBasicTable } from './table';
import { uploadImage } from '../../../../services/fileUploader';
import { IExperienceFile } from '../DoctorRegistrationRequestForm';

interface IFile{
  url:string,
  type:string
  file:File
}


interface IStepThreeProps {
    passFormDataToParent:(files:IExperienceFile[])=>void
}
const StepThreeForm : React.FC<IStepThreeProps> = ({passFormDataToParent}) =>{
    
    const [filesForTableChild,setFilesForTable] = useState<IFile[]>([]);
    const file = useRef<File>(null!)
    const files = useRef<IExperienceFile[]>([])
    const fileName = useRef<string>(null!)
    const [tableKey,setTableKey] = useState<number>(0)

      const SaveFile =async (e:any) => {
        let fileUrl:string =''
        try{ fileUrl= await uploadImage(file.current,'',fileName.current||"")}catch(error){}
        console
        const experinceFile:IExperienceFile= {
            name:fileName.current,
            url:fileUrl,
            type:'',
        }
        if(!files.current) return
        files.current = [...files.current,experinceFile]
        
        const data:IFile = {
          file:file.current,
          url:fileUrl,
          type:fileName.current
        }     
        setFilesForTable(old=>{
            return [...old,data]
        })

        passFormDataToParent(files.current)

        setTableKey(old=>1+old)
      }

      const SaveTo =async () => {
        //setSaveLoading(true)
        if (!file||fileName.current==="") return;
        if(file.current)
        try{   
            const fileUrl = await uploadImage(file.current,'',fileName.current||"")

            const experinceFile:IExperienceFile= {
            name:fileName.current,
            url:fileUrl,
            type:'',
            }
            files.current = [...files.current,experinceFile]    
            //await axios.put(`${config.serverUri}/patients/health-records`,healthrecord)
            //setSaveLoading(false)
            //   close(healthrecord)
        }catch(error){
        //   setSaveLoading(false)
        //   close(healthrecord)
        }
       
       
      }

    return (
        <Stack         minHeight={400}
        direction={'row'} padding={5} alignItems={'start'}>
            
            <Grid container  
        direction="row"
        justifyItems={'center'}
        alignItems={'center'}
        rowSpacing={1}
        >
            
            <div>
                <Grid container  
                direction="row"
                justifyItems={'start'}
                alignItems={'end'}
                marginBottom={10}
                > 
                  <Grid item sm={3} xs={12}>
                      <TextField
                      onChange={e=>fileName.current = e.target.value}
                      variant="standard"
                      type='text'
                      label="File Name"
                      placeholder=""
                    />
                  </Grid>
                  <Grid item sm={3} xs={12}>
                      <Input ref={file}  sx={{padding:0}} type="file"/>
                  </Grid>
                  <Grid item sm={12} xs={12}>
                      <Button onClick={SaveFile}>ADD</Button>
                  </Grid>
                </Grid>

            </div>
        </Grid>
        {filesForTableChild &&<DefaultBasicTable key={tableKey} data={filesForTableChild}/>}
        </Stack>
       
    );
}
    

export default StepThreeForm