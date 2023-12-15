import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";



interface FamilyMemberListProps {
    title: string;
    members: any[];
    onClick: (id: string) => void;
}

const FamilyMemberList: React.FC<FamilyMemberListProps> = ({
    title,
    members,
    onClick,
}) => {
    return (
        <Box>
            <Box sx={{alignContent: 'center'}}>
            <Typography variant="h4" gutterBottom sx={{marginBottom: '5%'}}>
                {title}
            </Typography>
            </Box>
            <Box sx={{ padding: 4 }}>
      <Box>
        <Grid container spacing={3}>
          {members?.map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member.id}>
                <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h5">{member.name}</Typography>
                  <Typography variant="h6">
                    {member.relation}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    onClick={() => onClick(member.id)}
                  >
                    View More Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
        </Box>
    );
};

export default FamilyMemberList;