import * as React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface PageErrorProps {
  title: string;
  message: string;
  children?: React.ReactNode;
}

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh"
});

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2)
}));

const ImageWrapper = styled("div")({
  marginBottom: "16px", // Adjust the margin as needed
  display: "flex",
  justifyContent: "center",
  maxWidth: "40%" // Adjust the width as needed
});

const PageError: React.FC<PageErrorProps> = ({ title, message, children }) => {
  return (
    <Root>
      <Title variant="h1">{title}</Title>
      {children && <ImageWrapper>{children}</ImageWrapper>}
      <Typography variant="h4" align="center">
        {message}
      </Typography>
      <Link to="/">Go to Home</Link>
    </Root>
  );
};

export default PageError;
