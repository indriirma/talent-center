import React from 'react';
import { Box, Button, Container, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import RegisterModal from './RegisterModal';
import SignInModal from './SignInModal'; // Pastikan Anda mengimpor komponen SignInModal yang sesuai

const Navbar = () => {
  const logoP79 = `${process.env.PUBLIC_URL}/resource/image/logotujuhsembilan-without-text.svg`;
  const [openRegis, setOpenRegis] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleOpenRegis = () => setOpenRegis(true);
  const handleOpenSignIn = () => setOpenSignIn(true);

  return (
    <Box sx={{ padding: { xs: '17px 10px', sm: '25px 20px' }, backgroundColor: { xs: 'rgba(21,21,21,0.8)', sm: 'transparent' } }}>
      <Container maxWidth="false">
        <Grid
          container
          justifyContent="space-between"
          sx={{
            '@media (max-width: 400px)': {
              gap: '5px',
            },
          }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            sx={{
              width: 'fit-content',
              gap: '15px',
              '@media (max-width: 400px)': {
                gap: '5px',
              },
            }}
          >
            <Grid item sx={{ width: { xs: '20%', sm: 'auto' } }}>
              <img
                src={logoP79}
                alt="PT Padepokan 79 Logo"
                width="100%"
                height="auto"
                sx={{
                  '@media (max-width: 400px)': {
                    height: '5px',
                  },
                }}
              />
            </Grid>
            <Grid item>
              <Typography fontFamily="Poppins">Talent Center 79</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="center" sx={{ width: 'fit-content', gap: '10px' }}>
            <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button onClick={handleOpenRegis} sx={{ color: 'white', textTransform: 'none', borderRadius: '25px' }}>
                <Typography fontFamily="Inter">Register</Typography>
              </Button>
              {openRegis && <RegisterModal open={openRegis} close={() => setOpenRegis(false)} signInOpen={() => setOpenSignIn(true)} />}
            </Grid>
            <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button
                variant="outlined"
                onClick={handleOpenSignIn}
                sx={{ color: 'white', textTransform: 'none', borderWidth: '2px', borderColor: 'white', borderRadius: '25px' }}
              >
                <Typography fontFamily="Inter">Sign In</Typography>
              </Button>
              {openSignIn && <SignInModal open={openSignIn} close={() => setOpenSignIn(false)} regOpen={() => setOpenRegis(true)} />}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Navbar;
