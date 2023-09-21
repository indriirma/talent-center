import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Typography, Box, Button, InputAdornment, Grid, Card, Stack, Divider, TextField, Avatar, Chip, OutlinedInput } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Gaya Quill standar
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function EditTalent() {
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No Selected File');
  const [value, setValue] = React.useState(0);
  const [content, setContent] = useState('');
  const [select, setSelect] = React.useState('');

  const handleChangeSelect = (event) => {
    setSelect(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeContent = (value) => {
    setContent(value);
  };

  const headText = {
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontWeight: 500,
  };

  const childText = {
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 400,
  };

  const headTotal = {
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: 400,
  };

  const totalText = {
    fontFamily: 'Poppins',
    fontSize: '30px',
    fontWeight: 700,
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

  const formInput = {
    height: '50px',
    borderRadius: '6px',
    backgroundColor: '#F2F6FA',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#F2F6FA',
      height: '50px',
    },
  };

  const styleText = {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '12px',
  };

  return (
    <AdminLayout>
      <Box>
        <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="../daftarTalent">
            <IconButton aria-label="delete">
              <WestIcon sx={{ color: '#3B4758' }} />
            </IconButton>
          </Link>
          <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#3B4758', fontFamily: 'Roboto' }}>Kembali</Typography>
        </Stack>
        <Card sx={{ marginTop: 3 }}>
          <Box sx={{ margin: 3 }}>
            <Typography sx={{ fontFamily: 'Roboto', fontSize: '18px', fontWeight: 500 }}>Edit Talent</Typography>
          </Box>
          <Divider />
          <Box>
            <Box sx={{ marginRight: 4 }}>
              <Grid container spacing={1} marginTop={3} marginBottom={3} alignItems="center" justifyContent="space-between">
                <Grid item marginLeft={3}>
                  <Stack direction="row" spacing={3}>
                    <Stack direction="row" spacing={3}>
                      <Stack spacing={2} sx={{ alignItems: 'center' }}>
                        <Avatar
                          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
                          variant="rounded"
                          sx={{ width: '100px', height: '100px' }}
                        />
                        <FormControl onClick={() => document.querySelector('.input-field').click()}>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            className="input-field"
                            id="file-upload-input"
                            onChange={handleFileChange}
                          />
                          {image ? (
                            <img src={image} width="100px" height="100px" alt={fileName} />
                          ) : (
                            <Button variant="contained" sx={{ textTransform: 'none', backgroundColor: '#2C8AD3' }}>
                              Upload New Photo
                            </Button>
                          )}
                        </FormControl>
                      </Stack>
                      <Typography noWrap sx={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: '24px' }}>
                        Brad Pritt
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Chip label="Active" sx={{ backgroundColor: 'green', color: 'white' }} />
                      <Chip label="On Site" sx={{ backgroundColor: '#586A84', color: 'white' }} />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item>
                  <Button variant="contained" sx={{ textTransform: 'none', backgroundColor: '#2C8AD3' }}>
                    Simpan Perubahan
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ height: '60px' }}>
                <Tab label="Profile" {...a11yProps(0)} sx={{ textTransform: 'none', fontSize: '16px', fontWeight: 500 }} />
                <Tab label="Statistik" {...a11yProps(1)} sx={{ textTransform: 'none', fontSize: '16px', fontWeight: 500 }} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Nama Talent</Typography>
                    <TextField
                      label="Masukkan Nama Talent"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      sx={formInput}
                      InputLabelProps={{
                        shrink: false,
                        style: inputText ? { display: 'none' } : { fontSize: '1.2 rem' },
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Nomor Induk Pegawai</Typography>
                    <TextField
                      label="Masukkan Nomor Induk Pegawai"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      sx={formInput}
                      InputLabelProps={{
                        shrink: false,
                        style: inputText ? { display: 'none' } : { fontSize: '1.2 rem' },
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid container spacing={1} marginTop={2}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Jenis Kelamin</Typography>
                    <FormControl>
                      <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                        <FormControlLabel value="female" control={<Radio />} label="Laki-laki" sx={styleText} />
                        <FormControlLabel value="male" control={<Radio />} label="Perempuan" sx={styleText} />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Tanggal Lahir</Typography>
                    <TextField
                      sx={{
                        height: '50px',
                        borderRadius: '6px',
                        backgroundColor: '#F2F6FA',
                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#F2F6FA',
                          height: '50px',
                        },
                      }}
                      fullWidth
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      InputLabelProps={{
                        shrink: false,
                      }}
                      // onChange={(event) => setFormData({ ...formData, birthDate: event.target.value })}
                      // value={formData.birthDate}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Stack spacing={1} marginTop={2}>
                <Typography sx={styleText}>Deskripsi Talent</Typography>
                <ReactQuill
                  value={content}
                  onChange={handleChangeContent}
                  //style={customStylesQuill}
                />
              </Stack>
              <Stack spacing={1} marginTop={2}>
                <Typography sx={styleText}>Upload CV</Typography>
                <FormControl
                  onClick={() => document.querySelector('.input-field').click()}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px dashed #2C8AD3',
                    height: '122px',
                    width: '315px',
                    borderRadius: '5px',
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    className="input-field"
                    id="file-upload-input"
                    onChange={handleFileChange}
                  />
                  {image ? (
                    <img src={image} width="50px" height="50px" alt={fileName} />
                  ) : (
                    <Box>
                      <NoteAddIcon sx={{ height: '50px', width: '50px', color: '#2C8AD3', marginLeft: '40px' }} />
                      <Typography sx={{ fontFamily: 'Roboto', color: '#2C8AD3', fontSize: '14px' }}>Drop and drag file here</Typography>
                    </Box>
                  )}
                </FormControl>
              </Stack>
              <Grid container spacing={1} marginTop={2}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={styleText}>Pengalaman</Typography>
                    <TextField
                      label="Masukkan Nama Talent"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      sx={formInput}
                      InputLabelProps={{
                        shrink: false,
                        style: inputText ? { display: 'none' } : { fontSize: '1.2 rem' },
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={styleText}>Level</Typography>
                    <FormControl variant="outlined" size="small" fullwidth sx={formInput}>
                      <InputLabel shrink={false} sx={select ? { display: 'none' } : { fontSize: '1.2 rem' }}>
                        Select
                      </InputLabel>
                      <Select
                        height="50px"
                        value={select}
                        label="Pilih Level"
                        onChange={handleChangeSelect}
                        input={<OutlinedInput notched={false} />}
                      >
                        <MenuItem value="" sx={{ fontSize: '0.8rem' }}>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10} sx={{ fontSize: '0.8rem' }}>
                          Junior
                        </MenuItem>
                        <MenuItem value={20} sx={{ fontSize: '0.8rem' }}>
                          Senior
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
              </Grid>
              <Grid container spacing={1} marginTop={2}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>E-mail</Typography>
                    <TextField
                      label="Masukkan E-mail"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      sx={formInput}
                      InputLabelProps={{
                        shrink: false,
                        style: inputText ? { display: 'none' } : { fontSize: '1.2 rem' },
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>No.HP/WhatsApp</Typography>
                    <TextField
                      label="Masukkan No.HP/WhatsApp"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      sx={formInput}
                      InputLabelProps={{
                        shrink: false,
                        style: inputText ? { display: 'none' } : { fontSize: '1.2 rem' },
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid container spacing={1} marginTop={2}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Biografi Video</Typography>
                    <TextField
                      label="Masukkan Biografi Video"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      sx={formInput}
                      InputLabelProps={{
                        shrink: false,
                        style: inputText ? { display: 'none' } : { fontSize: '1.2 rem' },
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Box sx={{ marginTop: 5, display: 'flex', justifyContent: 'flex-end' }}>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" sx={{ backgroundColor: '#C4C4C4', color: 'white', textTransform: 'none' }}>
                    Batal
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: '#2C8AD3', color: 'white', textTransform: 'none' }}>
                    Simpan Perubahan
                  </Button>
                </Stack>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Card sx={{ backgroundColor: '#E4EEF6', height: '95px' }}>
                    <Box sx={{ margin: 2 }}>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Stack>
                            <Typography sx={headTotal}>Total Request</Typography>
                            <Typography sx={totalText}>0</Typography>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <Avatar sx={{ backgroundColor: '#82F8B1' }} variant="rounded">
                            <MonetizationOnIcon />
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ backgroundColor: '#E4EEF6', height: '95px' }}>
                    <Box sx={{ margin: 2 }}>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Stack>
                            <Typography sx={headTotal}>Project Completed</Typography>
                            <Typography sx={totalText}>0</Typography>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <Avatar sx={{ backgroundColor: '#82F8B1' }} variant="rounded">
                            <MonetizationOnIcon />
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </CustomTabPanel>
          </Box>
        </Card>
      </Box>
    </AdminLayout>
  );
}
