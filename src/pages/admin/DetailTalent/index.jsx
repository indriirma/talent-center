import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Typography, Box, Button, InputAdornment, Grid, Card, Stack, Divider, TextField, Avatar, Chip } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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

const skillSet = ['Java', 'Laravel', 'Php', 'FrontEnd'];

export default function DetailTalent() {
  const [value, setValue] = React.useState(0);
  const [talentData, setTalentData] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

   const {talentId} = useParams();
   const apiUrl = `http://localhost:8080/api/talent-management/talents/${talentId}`;

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        setTalentData(data);
      })
      .catch((error) => {
        console.error('There was a problem fetching talent data:', error);
      });
  }, []);

  console.log(talentData);

  const handleEdit = (talentId) => {
    // Assuming you have a route for talent detail page, navigate to it
    navigate(`/admin/edit-talent/${talentId}`);
  };

  return (
    <AdminLayout>
      <Box>
        <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="delete">
            <WestIcon onClick={() => navigate('/admin/daftar-talent')} sx={{ color: '#3B4758' }} />
          </IconButton>
          <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#3B4758', fontFamily: 'Roboto' }}>Kembali</Typography>
        </Stack>
        <Card sx={{ marginTop: 3 }}>
          <Box sx={{ margin: 3 }}>
            <Typography sx={{ fontFamily: 'Roboto', fontSize: '18px', fontWeight: 500 }}>Detail Talent</Typography>
          </Box>
          <Divider />
          <Box>
            <Box sx={{ marginRight: 4 }}>
              <Grid container spacing={1} marginTop={3} marginBottom={3} alignItems="center" justifyContent="space-between">
                <Grid item marginLeft={3}>
                  <Stack direction="row" spacing={3}>
                    <Stack direction="row" spacing={3}>
                      <Avatar
                        //src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
                        src={talentData?.talentPhotoUrl}
                        variant="rounded"
                        sx={{ width: '100px', height: '100px' }}
                      />
                      <Stack direction="column" spacing={1}>
                        <Typography noWrap sx={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: '24px' }}>
                          {talentData?.talentName}
                        </Typography>
                        {talentData?.about}
                      </Stack>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Chip label={talentData?.employeeStatus} sx={{ backgroundColor: 'green', color: 'white' }} />
                      <Chip label={talentData?.talentStatus} sx={{ backgroundColor: '#586A84', color: 'white' }} />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => handleEdit(talentId)}
                    variant="outlined"
                    startIcon={<ModeEditIcon />}
                    sx={{ textTransform: 'none', borderColor: '#2C8AD3' }}
                  >
                    Edit Profile
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ height: '60px' }}>
                <Tab label="Profile" {...a11yProps(0)} sx={{ textTransform: 'none', fontSize: '16px', fontWeight: 500 }} />
                <Tab label="Statistic" {...a11yProps(1)} sx={{ textTransform: 'none', fontSize: '16px', fontWeight: 500 }} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Nama Talent</Typography>
                    <Typography sx={childText}>{talentData?.talentName}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Nomor Induk Pegawai</Typography>
                    <Typography sx={childText}>{talentData?.employeeNumber}</Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Grid container spacing={1} marginTop={2}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Jenis Kelamin</Typography>
                    <Typography sx={childText}>
                      {talentData?.sex === 'P' ? 'Perempuan' : talentData?.sex === 'L' ? 'Laki-laki' : 'Tidak Diketahui'}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Tanggal Lahir</Typography>
                    <Typography sx={childText}>19-08-1997</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CustomTabPanel>
            <Divider />
            <CustomTabPanel value={value} index={0}>
              <Stack spacing={1}>
                <Typography sx={{ headText }}>CV</Typography>
                <Button
                  variant="contained"
                  startIcon={<NoteAddIcon />}
                  sx={{ backgroundColor: '#2C8AD3', color: 'white', textTransform: 'none', width: '150px', height: '40px' }}
                >
                  Download CV
                </Button>
              </Stack>
              <Grid container spacing={1} marginTop={2}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Pengalaman</Typography>
                    <Typography sx={childText}>{talentData?.talentExperience} Tahun</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Level</Typography>
                    <Typography sx={childText}>{talentData?.talentLevel}</Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Stack spacing={1} marginTop={2}>
                <Typography sx={headText}>Skillset</Typography>
                <Stack direction="row" spacing={1}>
                  {talentData?.skillSet.map((skill) => (
                    <Chip key={skill.skillsetId} label={skill.skillsetName} variant="outlined" sx={{ borderRadius: '4px' }} />
                  ))}
                </Stack>
              </Stack>
            </CustomTabPanel>
            <Divider />
            <CustomTabPanel value={value} index={0}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>E-mail</Typography>
                    <Typography sx={childText}>{talentData?.email}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>No. Hp/Whatsapp</Typography>
                    <Typography sx={childText}>{talentData?.employeeNumber}</Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Stack spacing={1} marginTop={2}>
                <Typography sx={headText}>Biografi Video</Typography>
                <Typography sx={childText}>{talentData?.biographyVideoUrl}</Typography>
              </Stack>
            </CustomTabPanel>
            <Divider />
            <CustomTabPanel value={value} index={1}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Card sx={{ backgroundColor: '#E4EEF6', height: '95px' }}>
                    <Box sx={{ margin: 2 }}>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Stack>
                            <Typography sx={headTotal}>Total Request</Typography>
                            <Typography sx={totalText}>{talentData?.totalRequested}</Typography>
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
                            <Typography sx={totalText}>{talentData?.projectCompleted}</Typography>
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
