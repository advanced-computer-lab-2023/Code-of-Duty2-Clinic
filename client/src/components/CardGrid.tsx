import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import '@fontsource/roboto';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import '../css/CardGrid.css';


export default function CardGrid ({title, list, primary, secondary, buttonText}: {title: string, primary: string, secondary: string, list: never[], buttonText: string}) {
    return (
        <>
        <div className='gridTitle'>
        <h1 className='gridTitleText'>{title}</h1>
        </div>
        <div className="container">
            <Grid container spacing={3}>
                {list.map((listItem: { [key: string]: string }) => (
                    <Grid item xs={3}>
                        <CardGridCard primary={listItem[primary]} secondary={listItem[secondary]} buttonText={buttonText}  buttonLink={`/patient-info/${listItem._id}`} />
                    </Grid>
                ))}
            </Grid>
        </div>
        </>
    );
}


function CardGridCard ({primary, secondary, buttonText, buttonLink}: { primary: string, secondary: string, buttonText: string, buttonLink: string}) {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                   {primary}
                </Typography> 
                <Typography sx={{ mb: 1.5}} color="text.secondary">
                    {secondary}
                </Typography>
                <Button variant = "contained" href={buttonLink}>{buttonText}</Button>
            </CardContent>
        </Card>
    );
}