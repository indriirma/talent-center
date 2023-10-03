import { Grid, Container, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { Copyright, Facebook, Instagram, YouTube } from '@mui/icons-material';

const Footerx = () => {
  const footerLogo = `${process.env.PUBLIC_URL}/resource/image/logotujuhsembilan-with-text.svg`;
  const usefulLinks = [
    {
      linkTitle: 'Home',
      linkUrl: '/client',
    },
    {
      linkTitle: 'Our Technologies',
      linkUrl: '/client',
    },
    {
      linkTitle: 'Why Choose Us',
      linkUrl: '/client',
    },
    {
      linkTitle: 'Testimonials',
      linkUrl: '/client',
    },
    {
      linkTitle: 'Contact',
      linkUrl: '/client',
    },
  ];

  return (
    <>
      <Container maxWidth="false" sx={{ py: { xs: '2rem', sm: '5rem' }, backgroundColor: '#142B51', color: 'white' }}>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: { xs: 'center', sm: 'left' },
            width: '100%',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: '3rem', sm: '20rem' },
          }}
        >
          <Grid item>
            <Typography fontFamily="Poppins" sx={{ fontWeight: 'bold' }}>
              Useful Links
            </Typography>
            <Divider
              color="#FF6E1D"
              sx={{ width: '40%', marginLeft: { xs: 'auto', sm: '0px' }, marginRight: { xs: 'auto', sm: '0px' }, my: '0.5rem', height: '1.5px' }}
            />
            <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
              {usefulLinks.map((link, index) => {
                return (
                  <>
                    <Link key={index} href={link.linkUrl} style={{ my: '2.5rem', textDecoration: 'none', fontFamily: 'Inter', color: 'white' }}>
                      {link.linkTitle}
                    </Link>
                  </>
                );
              })}
            </Grid>
          </Grid>
          <Grid item>
            <Typography fontFamily="Poppins" sx={{ fontWeight: 'bold' }}>
              Contact Us
            </Typography>
            <Divider
              color="#FF6E1D"
              sx={{ width: '20%', marginLeft: { xs: 'auto', sm: '0px' }, marginRight: { xs: 'auto', sm: '0px' }, my: '0.5rem', height: '1.5px' }}
            />
            <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontFamily="Inter" sx={{ my: '0.25rem' }}>
                <span style={{ fontWeight: 'bold' }}> Address: </span> Kompleks Terasana No.6A
                <br />
                Jalan Cihampelas (Bawah)
                <br />
                Bandung 40171
              </Typography>
              <Typography fontFamily="Inter" sx={{ my: '0.25rem' }}>
                <span style={{ fontWeight: 'bold' }}> Phone: </span> (022) 20505455
              </Typography>
              <Typography fontFamily="Inter" sx={{ my: '0.25rem' }}>
                <span style={{ fontWeight: 'bold' }}> Follow Us On </span>
              </Typography>
              <Grid container sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, gap: '20px' }}>
                <Grid item>
                  <Link>
                    <Facebook style={{ marginRight: '15px', color: 'white' }} />
                  </Link>
                  <Link>
                    <Instagram style={{ marginRight: '15px', color: 'white' }} />
                  </Link>
                  <Link>
                    <YouTube style={{ marginRight: '15px', color: 'white' }} />
                  </Link>
                </Grid>
              </Grid>
              <Grid container sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <img src={footerLogo} alt="Logo Footer" style={{ marginTop: '1rem' }} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="false" sx={{ py: '1rem', backgroundColor: '#081E43', color: 'white' }}>
        <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
            <Copyright />
            <Typography fontFamily="Inter">Copyright 2020</Typography>
          </Grid>
          <Grid item sx={{ my: '0.25rem' }}>
            <Typography fontFamily="Inter">Privacy Policy Design</Typography>
          </Grid>
          <Grid item>
            <Typography fontFamily="Inter">By Tujuh Sembilan</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Footerx;
