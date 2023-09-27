import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import {
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Card,
  Stack,
  Divider,
  Avatar,
  Chip,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Select,
  MenuItem,
  Checkbox,
} from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import IconButton from '@mui/material/IconButton';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ClearIcon from '@mui/icons-material/Clear';
import { getLevels, getEmployeeStatus, getSkills } from '../../../apis';

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

// Custom hook to fetch data from an API endpoint and manage related state
function useApiData(apiFunction) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiFunction();
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [apiFunction]);

  return { data, loading };
}

export default function EditTalent() {
  const [value, setValue] = React.useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [talentData, setTalentData] = useState(null);
  const [selectedForm, setSelectedForm] = useState({
    talentPhoto: null,
    talentName: '',
    nip: '',
    sex: '',
    dob: '',
    talentDescription: '',
    cv: null,
    experience: '',
    levelId: '',
    skillSet: [],
    position: [1],
    email: '',
    cellphone: '',
    employeeStatusId: '1',
    videoUrl: '',
  });
  const navigate = useNavigate();

  // console.log(talentData?.talentName);

  const { data: levelOptions, loading: levelLoading } = useApiData(getLevels);
  const { data: employeeStatusOptions, loading: employeeStatusLoading } = useApiData(getEmployeeStatus);
  const { data: skillSetOptions, loading: skillSetLoading } = useApiData(getSkills);

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

  const { talentId } = useParams();
  const apiUrl = `http://localhost:8080/api/talent-management/talents/${talentId}`;

  const handleFileImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedForm({ ...selectedForm, talentPhoto: file });

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileCVChange = (event) => {
    const file = event.target.files[0];
    setSelectedForm({ ...selectedForm, cv: file });

    console.log(file);
  };

  const handlePaperImageClick = () => {
    const fileInput = document.getElementById('fileImageInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handlePaperCVClick = () => {
    const fileInput = document.getElementById('fileCVInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleDeleteImageClick = () => {
    setSelectedForm({ ...selectedForm, talentPhoto: null });
    setPreviewImage(null);
  };

  const handleDeleteCVClick = () => {
    setSelectedForm({ ...selectedForm, cv: null });
  };

  const handleNamaTalentChange = (nama) => {
    if (nama.length <= 255) {
      // if (talentData) {
      //   setTalentData({ ...talentData, talentName: nama });
      // } else {
        setSelectedForm({ ...selectedForm, talentName: nama });
      // }
    }
  };

  const handleDescChange = (event) => {
    let desc = event.target.value;
    if (desc.length <= 255) {
      setSelectedForm({ ...selectedForm, talentDescription: desc });
    }
  };

  const handleNIPChange = (event) => {
    let newnip = event.target.value;
    if (newnip.length <= 50) {
      setSelectedForm({ ...selectedForm, nip: newnip });
    }
  };

  const handleExperienceChange = (newValue) => {
    if (newValue === '') {
      setSelectedForm({ ...selectedForm, experience: null });
    } else if (/^\d+$/.test(newValue)) {
      const intValue = parseInt(newValue, 10);
      console.log(intValue);
      if (intValue <= 10) {
        setSelectedForm({ ...selectedForm, experience: intValue });
      }
    }
  };

  const handleSkillChange = (skill, checked) => {
    let currSkill = [...selectedForm.skillSet];

    if (checked) {
      currSkill.push(skill);
    } else {
      currSkill = currSkill.filter((s) => s !== skill);
    }

    setSelectedForm({ ...selectedForm, skillSet: currSkill });
  };

  const handleNoHpChange = (event) => {
    const newValue = event.target.value;
    if (newValue === '') {
      setSelectedForm({ ...selectedForm, cellphone: null });
    } else if (/^\d+$/.test(newValue)) {
      if (newValue.length <= 13) {
        setSelectedForm({ ...selectedForm, cellphone: newValue });
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('talentPhoto', selectedForm.talentPhoto);
      formData.append('cv', selectedForm.cv);
      formData.append('talentName', selectedForm.talentName);
      formData.append('nip', selectedForm.nip);
      formData.append('sex', selectedForm.sex);
      formData.append('dob', selectedForm.dob);
      formData.append('talentDescription', selectedForm.talentDescription);
      formData.append('experience', selectedForm.experience);
      formData.append('statusId', 1);
      formData.append('levelId', selectedForm.levelId);
      formData.append('skillIds', selectedForm.skillSet);
      formData.append('email', selectedForm.email);
      formData.append('cellphone', selectedForm.cellphone);
      formData.append('employeeStatusId', selectedForm.employeeStatusId);
      formData.append('videoUrl', selectedForm.videoUrl);
      formData.append('positionIds', selectedForm.position.join(','));

      const response = await axios.put(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // useEffect(() => {
  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       const data = response.data;
  //       setTalentData(data);
  //     })
  //     .catch((error) => {
  //       console.error('There was a problem fetching talent data:', error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        setTalentData(data);
  
        // Set default values based on talentData
        setSelectedForm({
          talentPhoto: data?.talentPhotoUrl || null,
          talentName: data?.talentName || '',
          nip: data?.employeeNumber || '',
          sex: data?.sex || '',
          dob: data?.birthDate || '',
          talentDescription: data?.about || '',
          cv: data?.talentCvUrl || null,
          experience: data?.talentExperience || '',
          levelId: data?.talentLevelId || '',
          skillSet: data?.skillSet?.map((skill) => skill.skillsetId) || [],
          position: [1],
          email: data?.email || '',
          cellphone: data?.cellphone || '',
          employeeStatusId: data?.employeeStatusId || '1',
          videoUrl: data?.biographyVideoUrl || '',
        });
      })
      .catch((error) => {
        console.error('There was a problem fetching talent data:', error);
      });
  }, [apiUrl]);

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
            <Typography sx={{ fontFamily: 'Roboto', fontSize: '18px', fontWeight: 500 }}>Edit Talent</Typography>
          </Box>
          <Divider />
          <Box>
            <Box sx={{ marginRight: 4 }}>
              <Grid container spacing={1} marginTop={3} marginBottom={3} alignItems="center" justifyContent="space-between">
                <Grid item marginLeft={3}>
                  <Stack direction="row" spacing={3}>
                    <Stack direction="row" spacing={3}>
                      <Avatar src={talentData?.talentPhotoUrl} variant="rounded" sx={{ width: '100px', height: '100px' }} />
                      <Typography noWrap sx={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: '24px' }}>
                        {talentData?.talentName}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Chip label={talentData?.employeeStatus} sx={{ backgroundColor: 'green', color: 'white' }} />
                      <Chip label={talentData?.talentStatus} sx={{ backgroundColor: '#586A84', color: 'white' }} />
                    </Stack>
                  </Stack>
                </Grid>
                {/* <Grid item>
                  <Button variant="outlined" startIcon={<ModeEditIcon />} sx={{ textTransform: 'none', borderColor: '#2C8AD3' }}>
                    Simpan Perubahan
                  </Button>
                </Grid> */}
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
                    <TextField
                      value={selectedForm.talentName}
                      onChange={(e) => handleNamaTalentChange(e.target.value)}
                      id="talent_name"
                      placeholder="Masukkan Nama Talent"
                      variant="outlined"
                      sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
                      size="small"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Nomor Induk Pegawai</Typography>
                    <TextField
                      value={selectedForm.nip || talentData?.employeeNumber || ''}
                      onChange={handleNIPChange}
                      id="nip"
                      placeholder="Masukkan Nomor Induk Pegawai"
                      variant="outlined"
                      sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
                      size="small"
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid container spacing={1} marginTop={2}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Jenis Kelamin</Typography>
                    <RadioGroup
                      name="radio-buttons-group"
                      value={selectedForm.sex || talentData?.sex || ''}
                      onChange={(event) => setSelectedForm({ ...selectedForm, sex: event.target.value })}
                    >
                      <FormControlLabel value="L" control={<Radio />} label="Laki-laki" />
                      <FormControlLabel value="P" control={<Radio />} label="Perempuan" />
                    </RadioGroup>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Tanggal Lahir</Typography>
                    <TextField
                      fullWidth
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={selectedForm.dob || talentData?.birthDate || ''}
                      onChange={(e) => setSelectedForm({ ...selectedForm, dob: e.target.value })}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Deskripsi Talent</Typography>
                    <TextField
                      value={selectedForm.talentDescription || talentData?.about || ''}
                      onChange={handleDescChange}
                      multiline
                      rows={4}
                      placeholder="Write a description..."
                      sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </CustomTabPanel>
            {/* <Divider /> */}
            <CustomTabPanel value={value} index={0}>
              <Stack spacing={1}>
                {/* Talent CV */}
                <Typography sx={{ headText }}>CV</Typography>
                <input type="file" accept=".pdf" onChange={handleFileCVChange} style={{ display: 'none' }} id="fileCVInput" />
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: '10px',
                    border: '2px dashed #000',
                    textAlign: 'center',
                    width: '35%',
                    borderColor: '#2C8AD3',
                    background: '#EEF0F4',
                    color: '#2C8AD3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '20px 0px',
                    flexDirection: 'column',
                  }}
                  onClick={handlePaperCVClick}
                >
                  {selectedForm.cv || talentData?.talentCv !== null ? (
                    <>
                      <Typography>
                        {selectedForm.cv ? selectedForm.cv.name : talentData?.talentCv}{' '}
                        <IconButton onClick={handleDeleteCVClick}>
                          <ClearIcon />
                        </IconButton>
                      </Typography>
                    </>
                  ) : (
                    <>
                      <div>
                        <PictureAsPdfIcon sx={{ color: '#FF001F', fontSize: '250%' }} />
                      </div>
                      <Typography>Drag and drop file here or click to upload</Typography>
                    </>
                  )}
                </Paper>
                {/* End Talent CV */}
              </Stack>
              <Grid container spacing={1} marginTop={2}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Pengalaman</Typography>
                    <TextField
                      type="number"
                      value={selectedForm.experience || talentData?.talentExperience || ''}
                      onChange={(e) => handleExperienceChange(e.target.value)}
                      sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">Tahun</InputAdornment>,
                      }}
                      variant="outlined"
                      size="small"
                      // placeholder="Masukkan Tahun Pengalaman"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>Level</Typography>
                    <Select
                      displayEmpty
                      placeholder="Pilih Level"
                      //value={talentData && talentData.talentLevel === 'Junior' ? 1 : talentData && talentData.talentLevel === 'Senior' ? 2 : ''}
                      value={selectedForm.levelId || talentData?.talentLevelId || ''}
                      onChange={(event) => setSelectedForm({ ...selectedForm, levelId: event.target.value })}
                      sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
                      size="small"
                    >
                      <MenuItem value="" disabled>
                        Pilih Level
                      </MenuItem>
                      {levelOptions.map((levelOption) => (
                        <MenuItem key={levelOption.talentLevelId} value={levelOption.talentLevelId}>
                          {levelOption.talentLevelName}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
              </Grid>
              <Stack spacing={1} marginTop={2}>
                <Typography sx={headText}>Skillset</Typography>
                <Stack direction="row" spacing={1}>
                  <Grid container spacing={2}>
                    {skillSetOptions.map((skillOption) => (
                      <Grid item key={skillOption.skillsetId}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                selectedForm.skillSet.includes(skillOption.skillsetId) || talentData?.skillSet.includes(skillOption.skillsetId) || ''
                              }
                              onChange={(event) => handleSkillChange(skillOption.skillsetId, event.target.checked)}
                            />
                          }
                          label={skillOption.skillsetName}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Stack>
            </CustomTabPanel>
            <Divider />
            <CustomTabPanel value={value} index={0}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>E-mail</Typography>
                    <TextField
                      type="email"
                      value={selectedForm.email || talentData?.email || ''}
                      onChange={(event) => setSelectedForm({ ...selectedForm, email: event.target.value })}
                      placeholder="Masukkan E-mail"
                      sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
                      size="small"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography sx={headText}>No. Hp/Whatsapp</Typography>
                    <TextField
                      type="number"
                      value={selectedForm.cellphone || talentData?.cellphone || ''}
                      onChange={handleNoHpChange}
                      placeholder="Masukkan No. Hp / Whatsapp "
                      sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
                      size="small"
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Stack spacing={1} marginTop={2}>
                <Typography sx={headText}>Biografi Video</Typography>
                <TextField
                  value={selectedForm.videoUrl || talentData?.biographyVideoUrl || ''}
                  onChange={(event) => setSelectedForm({ ...selectedForm, videoUrl: event.target.value })}
                  placeholder="Masukkan URL Biografi Video "
                  sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
                  size="small"
                />
              </Stack>
              <Box sx={{ mb: '20px', mt: '20px', display: 'flex', justifyContent: 'end' }}>
                <Button variant="contained" sx={{ mr: 2, background: '#C4C4C4', color: '#FFFFFF', '&:hover': { backgroundColor: '#C4C4C4' } }}>
                  Batal
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                  Simpan Perubahan
                </Button>
              </Box>
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
