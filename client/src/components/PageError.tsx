import * as React from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface pageError {
    title: string;
    message: string;
}

const Root = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
});

const Title = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));


const PageError: React.FC<pageError> = ({title, message}) => {
    return (
        <Root>
            <Title variant="h1">
                {title}
            </Title>
            <Typography variant="h4" align="center">
                {message}
            </Typography>
            <Link to="/">
                Go to Home
            </Link>
        </Root>
    );
}

export default PageError;
