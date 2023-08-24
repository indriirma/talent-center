import { Container, Typography,Box,Button,Radio,RadioGroup,
    Dialog, FormControlLabel,Checkbox, DialogTitle,DialogContent, IconButton, 
    Grid, TextField, InputAdornment,Link,FormControl,FormLabel, Autocomplete} from "@mui/material";  
import { useState,useCallback } from 'react';
import CloseIcon from "@mui/icons-material/Close"
import { useForm } from "react-hook-form"; 
import GoogleIcon from '@mui/icons-material/Google';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider,DatePicker,AdapterDayjs} from '@mui/x-date-pickers'

const LandingPage=()=>{  
    const {register,handleSubmit,formState:{errors},reset}=useForm(); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    //const [successMsg,setSuccessMsg]=useState("");
    const [statusModal,setOpenModal] = useState(false); 
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      let positionName=[{label:'HRD',value:1},
    {label: 'Manager', value:2}];
    
      const handleTextChange = useCallback(
        (field) => (event) => {
          setFormState((prev) => ({
            ...prev,
            [field]: event.target.value,
          }));
        },
        []
      );
    const openRegisterModal=()=>{
        setOpenModal(true);
    } 
    const closeRegisterModal=()=>{
        setOpenModal(false);
    } 
    const onSubmit=(data)=>{
        console.log(data);
        //setSuccessMsg("The registration is successfull");
        reset();
        alert("The registration is successfull");
    }; 
    
    const handleShowPassword = () => {
        setShowPassword((hidePassword) => !hidePassword);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword((hidePassword) => !hidePassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const validation={
        firstName:{required:"First Name is required!"},
        lastName:{required:"Last Name is required!"},
        email:{
            required:"Email is required!",
            pattern:{
                value:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message:"Email isn't valid!"

            }
        },
        password:{
            required:"Password is required!", 
            minLength:{
                value:8,
                message:"Password should be at-least 8 character"
            },           
            pattern:{
                value:/^(?=.*\d)(?=.*[0-9])(?=.*[a-zA-Z]).{0,255}$/,
                message:"Password should contain at least one letter and one number!"
            }
        },
        confirmPassword:{
            required:"Confirmation Password is required!" 
        }        
    }

    return(
        <Container component="main" maxWidth='xs'>
            <Box component="form" sx={{
                marginTop:8,
                display: 'flex',
                flexDirection:'column',
                alignItems:'center',
            }}>
                <Typography component="h1" variant="h3">
                    Landing Page
                </Typography>
                <Button onClick={openRegisterModal} color="primary" variant="contained">
                    Register
                </Button> 
                <Dialog open={statusModal} onClose={closeRegisterModal} fullWidth maxWidth="sm"  inputProps={{
                        style: {borderRadius: "10px"}}}>
                    <DialogTitle>
                        <IconButton onClick={closeRegisterModal} style={{float:'right'}} >
                            <CloseIcon color="primary"></CloseIcon>  
                        </IconButton>
                        <Grid item>
                            <Typography data-testid="reg-head" variant="h4" fontFamily = 'Poppins' align="center">
                            <b>Register</b>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography fontFamily = 'Poppins' align="center"> Register so you can choose and request our talent</Typography>
                        </Grid> 
                    </DialogTitle>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt:1}}>
                    <DialogContent>
                            {/* <FormHelperText style={{color:'#7ca936'}} >{successMsg}</FormHelperText> */}
                            <Grid container spacing={2/1}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <TextField
                                        sx={{width: 1, display: 'flex', pr: 1}}
                                        inputProps={{
                                            style:{
                                                borderRadius:"10px"
                                            }
                                        }}
                                        id="userName"
                                        size="small"
                                        required
                                        type="userName" 
                                        fullWidth 
                                        placeholder="Username"
                                        autoFocus
                                        variant="outlined"
                                        {...register("email",validation.email)}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <TextField 
                                        sx={{width: 1, display: 'flex', pr: 1}}
                                        id="firstName"
                                        size="small"
                                        required
                                        type="text"   
                                        // onChange={handleTextChange('firstName')}
                                        // value={formState.firstName}
                                        placeholder="First Name"
                                        autoFocus
                                        variant="outlined"
                                        {...register("firstName",validation.firstName)}
                                        error={Boolean(errors.firstName)}
                                        helperText={errors.firstName?.message}
                                        inputProps={{
                                            style: {
                                              borderRadius: "10px",
                                            }
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <TextField
                                        sx={{width: 1, display: 'flex', pr: 1}}
                                        id="lastName"
                                        required
                                        size="small"
                                        type="text"  
                                        // onChange={handleTextChange('lastName')}
                                        // value={formState.lastName}
                                        placeholder="Last Name"
                                        autoFocus
                                        variant="outlined"
                                        {...register("lastName",validation.lastName)}
                                        error={Boolean(errors.lastName)}
                                        helperText={errors.lastName?.message}
                                        inputProps={{
                                            style: {
                                              borderRadius: "10px",
                                            }
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <TextField
                                        sx={{width: 1, display: 'flex', pr: 1}}
                                        inputProps={{
                                            style:{
                                                borderRadius:"10px"
                                            }
                                        }}
                                        id="email"
                                        size="small"
                                        required
                                        type="email"
                                        // onChange={handleTextChange('email')}
                                        // value={formState.email}
                                        fullWidth 
                                        placeholder="E-mail"
                                        autoFocus
                                        variant="outlined"
                                        {...register("email",validation.email)}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <TextField
                                        sx={{width: 1, display: 'flex', pr: 1}}
                                        id="password"
                                        size="small"
                                        required 
                                        fullWidth
                                        // onChange={handleTextChange('password')}
                                        // value={formState.password} 
                                        placeholder="Password"
                                        autoFocus
                                        variant="outlined"
                                        {...register("password",validation.password)}
                                        error={Boolean(errors.password)}
                                        helperText={errors.password?.message}
                                        type={showPassword ? 'text' : 'password'}
                                        inputProps={{
                                            style:{
                                                borderRadius:"10px"
                                            },
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="visibility-button-pass"
                                                onClick={handleShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end">
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>                                
                            <Grid>
                            <FormControlLabel
                                sx={{ml:'0.5rem',
                                fontFamily: 'Poppins',
                                fontSize:5                                
                            }}                                
                                label="Password is at least 8 characters long"
                                control={
                                    <Checkbox disabled />
                                }
                                />
                                <Grid item mt={0} />
                            <FormControlLabel
                                sx={{ml:'0.5rem',
                                fontFamily: 'Poppins',
                                fontSize:5
                            }}
                                label="Password contains at least one letter and one number"
                                control={
                                    <Checkbox disabled />
                                }
                                />
                            </Grid>
                            <Grid item mt={1} />
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                    <TextField
                                        sx={{width: 1, display: 'flex', pr: 1}}
                                        id="confirmPassword" 
                                        required
                                        fullWidth 
                                        placeholder="Type your password again"
                                        size="small"
                                        // onChange={handleTextChange('confirmPassword')}
                                        // value={formState.confirmPassword}
                                        autoFocus
                                        variant="outlined"
                                        {...register("confirmPassword",validation.confirmPassword)}
                                        error={Boolean(errors.confirmPassword)}
                                        helperText={errors.confirmPassword?.message}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        inputProps={{
                                            style:{
                                                borderRadius:"10px"
                                            },
                                          endAdornment: (
                                            <InputAdornment position="end">
                                              <IconButton
                                              aria-label="visibility-button"
                                                onClick={handleShowConfirmPassword}
                                                onMouseDown={handleShowConfirmPassword}
                                                edge="end">
                                                  {showConfirmPassword ? <VisibilityOff /> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                          )
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item mt={1} />
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <FormControl>
                                    <FormLabel id="gender">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="gender-radio-button"
                                    >
                                        <FormControlLabel value="L" control={<Radio/>} label="Male"/>
                                        <FormControlLabel value="M" control={<Radio/>} label="Female"/>                            
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item mt={1} />
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Birthdate"/>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item mt={1} />
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Autocomplete
                                    disablePortal
                                    id="position-name"
                                    options={positionName}
                                    sx={{width:300}}
                                    renderInput={(params)=><TextField {...params} label="Position Name" />}
                                />

                            </Grid>
                        <Grid item m={3} />
                        <Grid item>
                            <Button sx={{
                                textTransform: 'none'}} variant="contained"  
                                fullWidth   
                                type="submit"
                                inputProps={{
                                    style:{
                                        borderRadius:"10px"
                                    }
                                }}
                                >
                            Register
                            </Button>
                        </Grid>
                        <Grid item my={1}>
                            <hr  sx={{ color: 'gray' }}/>
                        </Grid>
                        <Grid item sx={{ color: 'gray' }}>
                            <Button 
                            sx={{ color: 'gray', borderColor: 'grey.500', textTransform: 'none' }} 
                            variant="outlined" 
                            startIcon={<GoogleIcon/>}
                            inputProps={{
                                style:{
                                    borderRadius:"10px"
                                }
                            }}
                            fullWidth>
                            Continue with Google
                            </Button>
                        </Grid>                        
                        <Grid item mt={5} sx={{alignSelf:'center'}}>
                        <Typography display="inline" variant="body1" fontFamily = 'Poppins'>Already have an Account?</Typography>
                        <Link fontFamily = 'Poppins'  display="inline" href="#"> Sign In Here</Link>
                        </Grid> 
                    </DialogContent> 
                    </Box>
                </Dialog>                
            </Box>
        </Container>
    );
};

export default LandingPage