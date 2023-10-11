import * as React from 'react';
import { Typography, Container } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  marginTop: '2rem',
  marginBottom: '2rem',
});

const About: React.FC = () => {
  return (
    <StyledContainer>
      <Typography variant="h2" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" align="justify">
        We are a team of passionate individuals dedicated to creating the best user experiences. Our mission is to make the web a better place, one application at a time. We believe in the power of design and code, and we strive to push the boundaries of what's possible.
      </Typography>
    </StyledContainer>
  );
};

export default About;
