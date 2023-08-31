import { Grid, Typography } from '@mui/material';

function Dashboard() {
  return (
    <Grid container direction="column" justifyContent="flex-start" spacing={2}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Poppins',
          fontSize: '30px',
          fontWeight: '500',
          marginBottom: '10px',
          textAlign: 'left',
          marginLeft: '15px',
          marginTop: '10px',
        }}
      >
        Dashboard
      </Typography>
    </Grid>
  );
}

export default Dashboard;
