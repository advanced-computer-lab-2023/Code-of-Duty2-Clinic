import { Button, IconButton, Stack, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface EnhancedTableToolbarProps {
    numSelected: number;
    openModal:()=>void
  }
  
  export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected,openModal } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
         
        }}
      >
      <Stack position='relative' direction="row" alignItems={'center'} justifyContent='space-between' sx={{ width: '100%' }}>
        
        {numSelected > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="#103939"
              variant="subtitle1"
              component="div"
              fontFamily="Inter"
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Stack direction="row" alignItems='center' gap='5px'>
              <FileCopyIcon/>
               <Typography
              sx={{ flex: '1 1 100%',justifySelf:'center' }}
              variant="h6"
              id="tableTitle"
              component="div"
              color="#103939"
              fontFamily="Inter"
            >
              Health Records
            </Typography>
            </Stack>
           
          )}
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Button sx={{height:48,backgroundColor:'#103939'}} onClick={()=>openModal()} component="label" variant="contained">
            <CloudUploadIcon />
            </Button>
            // <Tooltip title="Filter list">
            //   <IconButton>
            //     <FilterListIcon />
            //   </IconButton>
            // </Tooltip>
           
          )}

        
        </Stack>
        
        </Toolbar>
    );
  }