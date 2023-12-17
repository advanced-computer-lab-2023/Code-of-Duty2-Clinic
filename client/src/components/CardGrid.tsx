import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import '@fontsource/roboto';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import '../css/CardGrid.css';


export default function CardGrid ({title, list, primaryAttribute, secondaryAttribute, showButton, buttonText}: {title: string, primaryAttribute: string, secondaryAttribute: string, list: any[], showButton: boolean, buttonText: string}) {
    return (
        <>
            <Typography variant="h4" sx={[{margin: '2vw'}, {textAlign: 'center'}]}>
                {title}
            </Typography>
            <Grid container spacing={3}>
                {list.map((listItem: { [key: string]: string }) => (
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <CardGridCard primary={listItem[primaryAttribute]} secondary={listItem[secondaryAttribute]} buttonText={buttonText} showButton={showButton}  buttonLink={`/patient-info/${listItem._id}`} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}


function CardGridCard ({primary, secondary, showButton, buttonText, buttonLink}: { primary: string, secondary: string, showButton: boolean, buttonText: string, buttonLink: string}) {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div" sx={{textAlign: 'center'}}>
                   {primary}
                </Typography> 
                <Typography variant="h6" color="text.secondary" sx={{textAlign: 'center'}}>
                    {secondary}
                </Typography>
                {showButton && <Button variant = "contained" href={buttonLink}>{buttonText}</Button>}
            </CardContent>
        </Card>
    );
}