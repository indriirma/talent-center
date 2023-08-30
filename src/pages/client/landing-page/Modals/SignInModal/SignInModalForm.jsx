import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import RegisterModalForm from '../RegisterModal/RegisterModalForm';

const SignInModalForm = ({ signInOpen, signInClose }) => {
  // const navigate = useNavigate();

  const validation = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  //const url = 'http://localhost:8080/api/user-management/users/signin';
  const url = 'http://localhost:8080/api/user-management/users/login';

  const onSubmit = async (data) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await axios.post(
        url,
        {
          email: data.email,
          password: data.password,
        },
        config
      );

      if (response.status === 200) {
        // Sign in successful, handle the result as needed
        console.log('Sign in successful:', response.data);
        // navigate('/client');
      } else {
        // Sign in failed, handle the error
        console.log('Sign in failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(signInOpen);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((hidePassword) => !hidePassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setIsSignInModalOpen(signInOpen);
  }, [signInOpen]);

  const closeSignInModal = () => {
    setIsSignInModalOpen(!signInOpen);
    signInClose(!signInOpen);
  };

  return (
    isSignInModalOpen && (
      <Dialog open={isSignInModalOpen} onClose={closeSignInModal} fullWidth maxWidth="xs" inputprops={{ style: { borderRadius: '10px' } }}>
        <DialogTitle>
          <IconButton onClick={closeSignInModal} style={{ float: 'right' }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
          <Grid item>
            <Typography data-testid="signin-head" variant="h4" fontFamily="Poppins" align="center">
              <b>Welcome Back</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontFamily="Poppins" align="center">
              {' '}
              Please sign in first to explore furher on our website
            </Typography>
          </Grid>
        </DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} data-testid="signin-form">
          <DialogContent>
            <Grid container spacing={2 / 1}>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  sx={{ width: 1, display: 'flex', pr: 1 }}
                  inputprops={{ style: { borderRadius: '10px' } }}
                  id="email"
                  size="small"
                  required
                  type="email"
                  fullWidth
                  placeholder="Email"
                  autoFocus
                  variant="outlined"
                  {...register('email', validation.email)}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  sx={{ width: 1, display: 'flex', pr: 1 }}
                  inputprops={{ style: { borderRadius: '10px' } }}
                  id="password"
                  size="small"
                  required
                  fullWidth
                  placeholder="Password"
                  autoFocus
                  variant="outlined"
                  {...register('password')}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  type={showPassword ? 'text' : 'password'}
                  inputProps={{
                    style: {
                      borderRadius: '10px',
                    },
                    endadornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="visibility-button-pass" onClick={handleShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid item mt={2} />
            <Grid item>
              <Button sx={{ textTransform: 'none' }} variant="contained" fullWidth type="submit" inputprops={{ style: { borderRadius: '10px' } }}>
                Sign In
              </Button>
            </Grid>
            <Grid item my={1}></Grid>
            <Grid item sx={{ color: 'gray' }}>
              <Button
                sx={{ color: 'gray', borderColor: 'grey.500', textTransform: 'none' }}
                variant="outlined"
                startIcon={<GoogleIcon />}
                inputprops={{
                  style: {
                    borderRadius: '10px',
                  },
                }}
                fullWidth
              >
                Continue with Google
              </Button>
            </Grid>
            <Grid item mt={1} />
            <Grid item mt={5} sx={{ alignSelf: 'center' }}>
              <Typography display="inline" variant="body1" fontFamily="Poppins">
                <span style={{ textAlign: 'center', display: 'block', width: '100%' }}>
                  Don't have an account?{' '}
                  <Link fontFamily="Poppins" display="inline" href=<RegisterModalForm />>
                    Register Here
                  </Link>
                </span>
              </Typography>
            </Grid>
          </DialogContent>
        </Box>
      </Dialog>
    )
  );
};

export default SignInModalForm;
