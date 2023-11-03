import { IconButton, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileCopyIcon from '@mui/icons-material/FileCopy';
interface EnhancedTableToolbarProps {
    numSelected: number;
  }
  
  export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
  
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
          <Typography
            sx={{ flex: '1 1 100%',justifySelf:'center' }}
            variant="h6"
            id="tableTitle"
            component="div"
            color="#103939"
            fontFamily="Inter"
          >
            <FileCopyIcon/>Health Records
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }