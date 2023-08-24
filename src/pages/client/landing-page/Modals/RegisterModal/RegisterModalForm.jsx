import {useForm,Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Typography,Box,Button,Radio,RadioGroup,
    Dialog, FormControlLabel,Checkbox, DialogTitle,DialogContent, IconButton, 
    Grid, TextField, InputAdornment,Link,FormControl,FormLabel, Autocomplete, FormHelperText} from "@mui/material";  
import { useState,useEffect } from 'react';  
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from '@mui/icons-material/Google';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider,DatePicker} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  

const RegisterModalForm=({regOpen,regClose})=>{
    let clientPositionId=[{label:'HRD',id:1},
    {label: 'Manager', id:2}];
    const validation = Yup.object().shape({
        userName:Yup.string()
        .required('Username is required')
        .min(6,'Username must be at least 6 character')
        .max(20,'Username must not exceed 20 character'),
        firstName:Yup.string()
        .required('Firstname is required')
        .matches(/^[a-zA-Z]+$/,'Firstname must contain only alphabetic characters'),
        lastName:Yup.string()
        .required('Lastname is required')
        .matches(/^[a-zA-Z]+$/,'Lastname must contain only alphabetic characters'),
        email:Yup.string()
        .required('Email is required')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Email is invalid'),
        password:Yup.string()
        .required('Password is required')
        .min(8,'x')
        .matches(/^(?=.*\d)(?=.*[0-9])(?=.*[a-zA-Z]).{0,255}$/,'n'),
        confirmPassword:Yup.string()
        .required('Retype Password is required')
        .oneOf([Yup.ref('password'),null],'Retype Password does not match'),
        sex:Yup.string()
        .required('Gender is required'),
        birthDate:Yup.date()
        .required('Birthdate is required'),
        clientPositionId:Yup.string()
        .required('Position is required'),
        agencyName:Yup.string()
        .required('Agency Name is required'),
        agencyAddress:Yup.string()
        .required('Agency Address is required')        
    });
    const{register,handleSubmit,formState:{errors},reset}=useForm({
       resolver:yupResolver(validation)
    }); 
     
    const onSubmit = data =>{
        console.log(JSON.stringify(data,null,2));
        // fetch('http://localhost:8080/api/user-management/users/register', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(data)
        //     }).then(() => {
        //     console.log('success');
        //     reset();
        //     alert('data berhasil didaftarkan');
        // })
    };
    const [isModOpen,setIsRegMoOpen]=useState(regOpen);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword((hidePassword) => !hidePassword);
    };    
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword((hidePassword) => !hidePassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    useEffect(()=>{
        setIsRegMoOpen(isModOpen)
    },[isModOpen])
    
    const closeRegisterModal=()=>{
        setIsRegMoOpen(!regOpen)
        regClose(!regOpen)
    }
        
    return(
        isModOpen &&
        <Dialog open={isModOpen} onClose={closeRegisterModal} fullWidth maxWidth="sm"  inputProps={{
            style: {borderRadius: "10px"}
            }}>
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
                        {...register("userName")}
                        error={Boolean(errors.userName)}
                        helperText={errors.userName?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                    <TextField 
                        sx={{width: 1, display: 'flex', pr: 1}}
                        id="firstName"
                        size="small"
                        required
                        type="text"   
                        placeholder="First Name"
                        autoFocus
                        variant="outlined"
                        {...register("firstName")}
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
                        placeholder="Last Name"
                        autoFocus
                        variant="outlined"
                        {...register("lastName")}
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
                    <Checkbox checked={!errors.password?true:false}  
                    sx={{width:100}} disabled />
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
                    <Checkbox checked={!errors.password?true:false} 
                    sx={{width:100}} disabled />
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
                    <FormLabel id="sex">Gender</FormLabel>
                    <RadioGroup   
                        error={Boolean(errors.sex)}                     
                        row                        
                        fullWidth
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="sex-radio-button" >
                        <FormControlLabel value="L" control={<Radio {...register('sex',validation.sex)} />} label="Male"/>                        
                           <Grid item mr={2} />
                        <FormControlLabel value="M" control={<Radio {...register('sex',validation.sex)} />} label="Female"/>                            
                    </RadioGroup>
                </FormControl>
            </Grid>
                <FormHelperText style={{color:'#d32f2f'}}>{errors.sex?.message}</FormHelperText>
            <Grid item mt={1} />
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker                         
                        sx={{width: 1, display: 'flex', pr: 1}}
                        label="Birthdate"  
                        required
                        slots={{
                            toolbar:()=>(
                                <TextField 
                                {...register('birthDate',validation.birthDate)}  
                                    error={Boolean(errors.birthDate)}             
                                    helperText={errors.birthDate?.message} 
                                    size = "small"
                                    fullWidth
                                />
                            )
                        }} 
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Grid> 
            <Grid item mt={1} />
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <Autocomplete 
                    error={Boolean(errors.clientPositionId)}
                    sx={{width: 1, display: 'flex', pr: 1}}
                    inputProps={{
                        style:{
                            borderRadius:"10px"
                        }
                    }}
                    disablePortal 
                    size="small"
                    id="position-name"
                    options={clientPositionId} 
                    fullWidth
                    renderInput={(params)=><TextField 
                        {...register('clientPositionId',validation.clientPositionId)}
                        {...params} placeholder="Position Name" 
                        fullWidth />}
                />
            </Grid>
                <FormHelperText style={{color:'#d32f2f'}}>{errors.clientPositionId?.message}</FormHelperText>
            <Grid item mt={1}/>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <TextField
                    sx={{width: 1, display: 'flex', pr: 1}}
                    inputProps={{
                        style:{
                            borderRadius:"10px"
                        }
                    }}
                    id="agencyName"
                    size="small"
                    required
                    type="agencyName" 
                    fullWidth 
                    label="Agency Name"
                    autoFocus 
                    variant="outlined"
                    {...register("agencyName")}
                    error={Boolean(errors.agencyName)}
                    helperText={errors.agencyName?.message}
                />
            </Grid>
            <Grid item mt={1}/>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <TextField
                    sx={{width: 1, display: 'flex', pr: 1}}
                    inputProps={{
                        style:{
                            borderRadius:"10px"
                        }
                    }}
                    id="outlined-multiline-static"
                    label="Agency Address"
                    multiline
                    fullWidth
                    autoFocus
                    rows={4}  
                    variant="outlined"
                    {...register("agencyAddress")}
                    error={Boolean(errors.agencyAddress)}
                    helperText={errors.agencyAddress?.message}
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
    );
}
export default RegisterModalForm