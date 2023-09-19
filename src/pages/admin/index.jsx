import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Toolbar,
  List,
  Typography,
  Badge,
  Avatar,
  ListItemButton,
  ListItemIcon,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { mainListItems } from 'components/admin/Sidebar';
import ComboBoxLang from 'components/admin/ComboBoxLang';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ClearIcon from '@mui/icons-material/Clear';
import { getLevels, getEmployeeStatus, getSkills } from '../../apis';
import axios from 'axios';

const drawerWidth = 240;

const listItemStyle = {
  color: '#586A84',
  fontFamily: 'Poppins',
  fontSize: '12px',
};

const circleButtonStyle = {
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: '#2C8AD3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
};

const collapseIconStyle = {
  width: 16,
  height: 16,
  position: 'absolute',
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

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


export default function Talent() {
  const [open, setOpen] = React.useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedForm, setSelectedForm] = useState({
    talentPhoto: null,
    talentName: 'Fimela',
    nip: '1234567890',
    sex: '',
    dob: '',
    talentDescription: 'Software Developer',
    cv: null,
    experience: '5',
    levelId: '2',
    skillSet: [],
    position: [1],
    email: 'fimela@example.com',
    cellphone: '085720071234',
    employeeStatusId: '1',
    videoUrl: 'https://www.youtube.com/',
  });

    const { data: levelOptions, loading: levelLoading } = useApiData(getLevels);
    const { data: employeeStatusOptions, loading: employeeStatusLoading } = useApiData(getEmployeeStatus);
    const { data: skillSetOptions, loading: skillSetLoading } = useApiData(getSkills);

  const handleFileImageChange = (event) => {
    const file = event.target.files[0];
    // setSelectedFileImage(file);
    setSelectedForm({ ...selectedForm, talentPhoto: file });

    // Menghasilkan pratinjau gambar
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileCVChange = (event) => {
    const file = event.target.files[0];
    // setSelectedFileCV(file);
    setSelectedForm({ ...selectedForm, cv: file });

    console.log(file);
  };

  const handlePaperImageClick = () => {
    // Simulasi klik pada input file saat kotak Paper diklik
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
    // setSelectedFileImage(null);
    setSelectedForm({ ...selectedForm, talentPhoto: null });
    setPreviewImage(null);
  };

  const handleDeleteCVClick = () => {
    // setSelectedFileCV(null);
    setSelectedForm({ ...selectedForm, cv: null });
  };

  const handleNamaTalentChange = (event) => {
    let nama = event.target.value;
    if (nama.length <= 255) {
      setSelectedForm({ ...selectedForm, talentName: nama });
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

  const handleExperienceChange = (event) => {
    const newValue = event.target.value;
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
      // Jika checkbox dicentang, tambahkan skill ke dalam array currSkill
      currSkill.push(skill);
    } else {
      // Jika checkbox tidak dicentang, hapus skill dari array currSkill
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
      formData.append('skillIds', selectedForm.skillSet); // Assuming skillSet is an array
      formData.append('email', selectedForm.email);
      formData.append('cellphone', selectedForm.cellphone);
      formData.append('employeeStatusId', selectedForm.employeeStatusId);
      formData.append('videoUrl', selectedForm.videoUrl);
      formData.append('positionIds', selectedForm.position.join(',')); // Assuming position is an array

      const response = await axios.post('http://localhost:8080/api/talent-management/talents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log('selected Form', selectedForm);
  }, [selectedForm]);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="absolute" open={open} style={{ backgroundColor: 'white', boxShadow: 'none', color: 'black' }}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              display: 'flex-end', // Set to flex-end to align items to the right
              alignItems: 'center',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Stack direction="row-reverse" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ marginLeft: 'auto' }}>
              <KeyboardArrowDownIcon />
              <Avatar
                alt="Cindy Baker"
                style={{ width: 40, height: 40, borderRadius: 200, marginRight: 20 }}
                src="https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk0OTczNTgyNDA3NzcxNjcy/kim-kardashian-net-worth-kardashian-family-net-worth.jpg"
              />
              <IconButton color="inherit" style={{ marginRight: 20 }}>
                <Badge overlap="circular" badgeContent=" " color="secondary" variant="dot">
                  <NotificationsIcon style={{ color: '#586A84' }} />
                </Badge>
              </IconButton>
              <ComboBoxLang style={{ marginRight: 20 }}></ComboBoxLang>
              <IconButton />
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <List component="nav">{mainListItems({ open })}</List>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: [1],
            }}
          >
            <ListItemButton
              onClick={toggleDrawer}
              style={{
                alignItems: 'center',
                justifyContent: open ? 'center' : 'flex-start', // Adjusted styling
              }}
            >
              <ListItemIcon style={listItemStyle}>
                <IconButton style={circleButtonStyle}>
                  {open ? <ArrowBackIosNewRoundedIcon style={collapseIconStyle} /> : <ArrowForwardIosRoundedIcon style={collapseIconStyle} />}
                </IconButton>
              </ListItemIcon>

              {open && (
                <div>
                  <Typography variant="body1" style={listItemStyle}>
                    Collapse
                  </Typography>
                </div>
              )}
            </ListItemButton>
          </Toolbar>
        </Drawer>
        {/* Main */}
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Button variant="text" sx={{ color: '#3B4758', mb: '1rem', mt: '4rem' }}>
            <ArrowBackIcon /> Kembali
          </Button>
          <Box sx={{ background: '#FFF', padding: 2, borderRadius: '12px 12px 0px 0px', mb: 1 }}>
            <Typography variant="h6">Tambah Talent</Typography>
          </Box>
          <Box sx={{ background: '#FFF', padding: 2, borderRadius: '0px 0px 12px 12px' }}>
            {/* Talent Photo */}
            <Typography sx={{ mb: '5px', mt: '20px' }}>Talent‘s Photo</Typography>
            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileImageChange} style={{ display: 'none' }} id="fileImageInput" />
            <Paper
              elevation={0}
              sx={{
                borderRadius: '10px',
                border: '2px dashed #000',
                textAlign: 'center',
                width: '100px',
                height: '100px',
                borderColor: '#2C8AD3',
                background: '#EEF0F4',
                color: '#2C8AD3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={handlePaperImageClick}
            >
              {previewImage ? (
                <>
                  <IconButton
                    onClick={handleDeleteImageClick}
                    sx={{
                      position: 'absolute',
                      top: '1px',
                      right: '1px',
                      color: '#FF0000',
                      background: '#FDFDFD',
                      borderRadius: '1px',
                      width: '1px',
                      height: '1px',
                    }}
                  >
                    <DeleteRoundedIcon sx={{ width: '20px', height: '20px' }} />
                  </IconButton>
                  <img src={previewImage} alt="Pratinjau Gambar" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }} />
                </>
              ) : (
                <AddPhotoAlternateRoundedIcon />
              )}
            </Paper>
            {/* End Talent Photo */}

            <Typography sx={{ mb: '5px', mt: '20px' }}>Nama Talent</Typography>
            <TextField
              value={selectedForm.talentName}
              onChange={handleNamaTalentChange}
              id="talent_name"
              placeholder="Masukkan Nama Talent"
              variant="outlined"
              sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
              size="small"
            />

            <Typography sx={{ mb: '5px', mt: '20px' }}>Nomor Induk Pegawai</Typography>
            <TextField
              value={selectedForm.nip}
              onChange={handleNIPChange}
              id="nip"
              placeholder="Masukkan Nomor Induk Pegawai"
              variant="outlined"
              sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
              size="small"
            />

            <Box sx={{ flexGrow: 1, mb: '5px', mt: '20px' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography sx={{ mb: '5px' }}>Jenis Kelamin</Typography>
                  <RadioGroup
                    name="radio-buttons-group"
                    value={selectedForm.sex}
                    onChange={(event) => setSelectedForm({ ...selectedForm, sex: event.target.value })}
                  >
                    <FormControlLabel value="L" control={<Radio />} label="Laki-laki" />
                    <FormControlLabel value="P" control={<Radio />} label="Perempuan" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ mb: '5px' }}>Tanggal Lahir</Typography>
                  <TextField
                    fullWidth
                    id="birthDate"
                    // label="Birth Date"
                    name="birthDate"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={selectedForm.dob}
                    onChange={(e) => setSelectedForm({ ...selectedForm, dob: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Box>

            <Typography sx={{ mb: '5px', mt: '20px' }}>Deskripsi Talent</Typography>
            <TextField
              value={selectedForm.talentDescription}
              onChange={handleDescChange}
              multiline
              rows={4}
              placeholder="Write a description..."
              sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
            />

            {/* Talent CV */}
            <Typography sx={{ mb: '5px', mt: '20px' }}>Upload CV</Typography>
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
              {selectedForm.cv ? (
                <>
                  <Typography>
                    {selectedForm.cv.name}{' '}
                    <IconButton onClick={handleDeleteCVClick}>
                      <ClearIcon />
                    </IconButton>
                  </Typography>
                </>
              ) : (
                <>
                  <div>
                    <PictureAsPdfIcon sx={{ color: '#FF001F', fontSize: '250%' }} /> {/* Sesuaikan ukuran ikon */}
                  </div>
                  <Typography>Drag and drop file here or click to upload</Typography>
                </>
              )}
            </Paper>
            {/* End Talent CV */}

            <Box sx={{ flexGrow: 1, mb: '5px', mt: '20px' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography sx={{ mb: '5px' }}>Pengalaman</Typography>
                  <TextField
                    type="number"
                    value={selectedForm.experience}
                    onChange={handleExperienceChange}
                    sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
                    InputProps={{
                      endAdornment: <InputAdornment position="start">Tahun</InputAdornment>,
                    }}
                    variant="outlined"
                    size="small"
                    placeholder="Masukkan Tahun Pengalaman"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ mb: '5px' }}>Level</Typography>
                  <Select
                    displayEmpty
                    placeholder="Pilih Level"
                    value={selectedForm.levelId}
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
                </Grid>
              </Grid>
            </Box>

            <Typography sx={{ mb: '5px', mt: '20px' }}>Skill Set</Typography>
            <Typography sx={{ mb: '5px', color: '#586A84' }} variant="caption">
              Pilih lebih dari 1
            </Typography>
            <Grid container spacing={2}>
              {skillSetOptions.map((skillOption) => (
                <Grid item key={skillOption.skillsetId}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedForm.skillSet.includes(skillOption.skillsetId)}
                        onChange={(event) => handleSkillChange(skillOption.skillsetId, event.target.checked)}
                      />
                    }
                    label={skillOption.skillsetName}
                  />
                </Grid>
              ))}
            </Grid>

            <Typography sx={{ mb: '5px', mt: '20px' }}>E-mail</Typography>
            <TextField
              type="email"
              value={selectedForm.email}
              onChange={(event) => setSelectedForm({ ...selectedForm, email: event.target.value })}
              placeholder="Masukkan E-mail"
              sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
              size="small"
            />

            <Typography sx={{ mb: '5px', mt: '20px' }}>No. Hp / Whatsapp </Typography>
            <TextField
              type="number"
              value={selectedForm.cellphone}
              onChange={handleNoHpChange}
              placeholder="Masukkan No. Hp / Whatsapp "
              sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
              size="small"
            />

            <Typography sx={{ mb: '5px', mt: '20px' }}>Status Kepegawaian </Typography>

            <Select
              displayEmpty
              placeholder="Pilih Status Kepegawaian"
              value={selectedForm.employeeStatusId}
              onChange={(event) => setSelectedForm({ ...selectedForm, employeeStatusId: event.target.value })}
              sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
              size="small"
            >
              <MenuItem value="" disabled>
                Pilih Status Kepegawaian
              </MenuItem>
              {employeeStatusOptions.map((statusOption) => (
                <MenuItem key={statusOption.employeeStatusId} value={statusOption.employeeStatusId}>
                  {statusOption.employeeStatusName}
                </MenuItem>
              ))}
            </Select>

            <Typography sx={{ mb: '5px', mt: '20px' }}>Biografi Video (Opsional) </Typography>
            <TextField
              value={selectedForm.videoUrl}
              onChange={(event) => setSelectedForm({ ...selectedForm, videoUrl: event.target.value })}
              placeholder="Masukkan URL Biografi Video "
              sx={{ background: '#F2F6FA', width: '100%', borderRadius: '6px', borderWidth: '0px' }}
              size="small"
            />

            <Box sx={{ mb: '20px', mt: '20px', display: 'flex', justifyContent: 'end' }}>
              <Button variant="contained" sx={{ mr: 2, background: '#C4C4C4', color: '#FFFFFF', '&:hover': { backgroundColor: '#C4C4C4' } }}>
                Batal
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Simpan
              </Button>
            </Box>
          </Box>
        </Grid>
        {/* <AppBar position="absolute" open={open} sx={{ top: 'auto', bottom: 0, height: 40 }} style={{ backgroundColor: 'white', boxShadow: 'none' }}>
          <Typography
            variant="caption"
            align="center"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#586A84',
              fontFamily: 'Inter',
              fontWeight: '500',
              height: '100%',
            }}
          >
            {' © '}
            2022 - Talent Management 79
          </Typography>
        </AppBar> */}
      </Box>
    </ThemeProvider>
  );
}
