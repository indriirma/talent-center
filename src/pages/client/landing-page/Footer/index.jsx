import { Typography,Grid } from "@mui/material";
import { Copyright, Facebook, Instagram, YouTube } from '@mui/icons-material';

const Footer=()=>{
    return (
        <>
        <footer style={{ background: '#142B51', padding: '80px' }}>
        <Grid container spacing={10} sx={{ justifyContent: 'center' }}>
          <Grid
            item
            md={3}
            sx={{
              '@media (max-width: 600px)': {
                textAlign: 'center',
              },
            }}
          >
            <Typography
              sx={{
                lineHeight: 2,
                color: 'white',
                fontFamily: 'Poppins',
                fontSize: '18px',
                fontWeight: 700,
              }}
            >
              Useful Links
            </Typography>
            <Typography
              sx={{
                borderBottom: '2px solid #FF6E1D',
                width: '80px',
                mb: 2,
                '@media (max-width: 600px)': {
                  display: 'inline-block',
                },
              }}
            ></Typography>
            <div>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                Home
              </p>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                Our Technologies
              </p>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                Why Choose Us
              </p>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                Testimonials
              </p>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                Contact
              </p>
            </div>
          </Grid>
          <Grid
            item
            md={3}
            sx={{
              diplay: 'right',
              '@media (max-width: 600px)': {
                textAlign: 'center',
              },
            }}
          >
            <Typography
              color="white"
              sx={{
                lineHeight: '35px',
                color: 'white',
                fontFamily: 'Poppins',
                fontSize: '18px',
                fontWeight: 700,
              }}
            >
              Contact Us
            </Typography>
            <Typography
              sx={{
                color: '#142B51',
                borderBottom: '2px solid #FF6E1D',
                width: '80px',
                mb: 2,
                '@media (max-width: 600px)': {
                  display: 'inline-block',
                },
              }}
            ></Typography>
            <div color="white">
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                <Typography component="span" fontWeight="bold">
                  Address:
                </Typography>
                Kompleks Terasana No.6A <br />
                Jalan Cihampelas (Bawah) <br />
                Bandung 40171
              </p>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '35px',
                }}
              >
                <Typography component="span" fontWeight="bold">
                  Phone:
                </Typography>{' '}
                (022) 20505455
              </p>
              <p
                style={{
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  lineHeight: '35px',
                }}
              >
                Follow Us On
              </p>
              <Grid mt={2}>
                <Facebook style={{ marginRight: '15px', color: 'white' }} />
                <Instagram style={{ marginRight: '15px', color: 'white' }} />
                <YouTube style={{ marginRight: '15px', color: 'white' }} />
              </Grid>
              <Grid
                sx={{
                  marginTop: '20px',
                  '@media (max-width: 600px)': {
                    justifyContent: 'center',
                  },
                }}
              >
                <img src={`${process.env.PUBLIC_URL}/resource/image/logotujuhsembilan2.svg`} alt="logotujuhsembilan" />
              </Grid>
            </div>
          </Grid>
        </Grid>
      </footer>
      <footer style={{ background: '#081E43', padding: '40px', textAlign: 'center' }}>
        <Typography variant="body2" color="white">
          &copy;
          <Typography component="span" color="white" fontWeight="bold">
            Copyright 2020
          </Typography>
          <br />
          Privacy Policy Design <br />
          By Tujuh Sembilan
        </Typography>
      </footer>
        </>
    )
}


export default Footer;