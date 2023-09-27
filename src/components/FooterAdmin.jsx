import React from 'react';
import { Typography, Paper } from '@mui/material';

function Footer() {
  return (
    <Paper
      sx={{
        backgroundColor: 'white',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography sx={{ color: 'black', fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}>&copy; 2023 - Talent Management 79</Typography>
    </Paper>
  );
}

export default Footer;
