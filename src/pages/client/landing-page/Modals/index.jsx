import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import RegisterModal from './RegisterModal';
import SignInModal from './SignInModal'; // Pastikan Anda mengimpor komponen SignInModal yang sesuai

const Modals = () => {
  const [openRegis, setOpenRegis] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleOpenRegis = () => setOpenRegis(!openRegis);
  const handleOpenSignIn = () => setOpenSignIn(!openSignIn);

  useEffect(() => {
    setOpenRegis(openRegis);
  }, [openRegis]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h3">
          Landing Page
        </Typography>
        <Button onClick={handleOpenRegis} color="primary" variant="contained">
          Register
        </Button>
        <Button
          onClick={handleOpenSignIn}
          variant="contained"
          sx={{ marginTop: 2 }} // Tambahkan margin di sini untuk memberikan jarak
        >
          Sign In
        </Button>
        {openRegis && <RegisterModal open={openRegis} close={setOpenRegis} />}
        {openSignIn && <SignInModal open={openSignIn} close={setOpenSignIn} />}
      </Box>
    </Container>
  );
};

export default Modals;
