import { ArrowBack } from '@mui/icons-material';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

function TambahTalent() {
  const [selectedFile, setSelectedFile] = useState('');
  const [talentName, setTalentName] = useState('');
  const [nip, setNip] = useState('');
  const [sex, setSex] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [descTalent, setDescTalent] = useState('');
  const [selectedCv, setSelectedCv] = useState('');
  const [experience, setExperience] = useState('');
  const [talentLevels, setTalentLevels] = useState([]);
  const [selectedTalentLevel, setSelectedTalentLevel] = useState('');
  const [skillSetOptions, setSkillSetOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [email, setEmail] = useState('');
  const [noHp, setNoHp] = useState('');
  const [employeeStatuses, setEmployeeStatuses] = useState([]);
  const [selectedEmpStatus, setSelectedEmpStatus] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  // console.log(selectedCv);
  

  useEffect(() => {
    const apiUrlLevel = 'http://localhost:8080/api/master-management/talent-level-option-lists';

    axios
      .get(apiUrlLevel)
      .then((response) => {
        setTalentLevels(response.data);
      })
      .catch((error) => {
        console.error('Error fetching talent levels:', error);
      });

    const apiUrlStatus = 'http://localhost:8080/api/master-management/employee-status-option-lists';

    axios
      .get(apiUrlStatus)
      .then((response) => {
        setEmployeeStatuses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee statuses:', error);
      });

    const apiUrlSkill = 'http://localhost:8080/api/master-management/skill-set-option-lists';

    axios
      .get(apiUrlSkill)
      .then((response) => {
        setSkillSetOptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching skill set options:', error);
      });
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
     console.log('Selected file:', event.target.files[0]);
  };

  const handleCVFileChange = async (event) => {
    setSelectedCv(event.target.files[0]);
    console.log('handleCVFileChange : ', event.target.files[0].name);
  };

  const handleSkillChange = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('talentPhoto', selectedFile);
      formData.append('cv', selectedCv);
      formData.append('talentName', talentName);
      formData.append('nip', nip);
      formData.append('sex', sex);
      formData.append('dob', birthdate);
      formData.append('talentDescription', descTalent);
      formData.append('experience', experience);
      formData.append('statusId', 1);
      formData.append('levelId', selectedTalentLevel);
      formData.append('skillIds', selectedSkills);
      formData.append('email', email);
      formData.append('cellphone', noHp);
      formData.append('employeeStatusId', selectedEmpStatus);
      formData.append('videoUrl', videoUrl);
      formData.append('positionIds', 1);

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

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item>
        <ArrowBack />
      </Grid>
      <Grid item>
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontWeight: '100',
            fontSize: '20px',
            marginLeft: '10px',
            verticalAlign: 'middle',
          }}
        >
          Kembali
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ marginTop: '20px' }}>
        <Card sx={{ backgroundColor: '#fff', padding: '20px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: '100',
              fontSize: '20px',
              marginLeft: '10px',
              verticalAlign: 'middle',
            }}
          >
            Tambah Talent
          </Typography>
        </Card>
        <form action="POST" encType="multipart/form-data">
          <Card sx={{ backgroundColor: '#fff', padding: '20px', marginTop: '5px' }}>
            <Grid item xs={3} sm={3}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: '500',
                  fontSize: '18px',
                  marginBottom: '10px',
                }}
              >
                Talent Photo's
              </Typography>
              <Box
                component="span"
                sx={{
                  p: 2,
                  border: '1px dashed blue',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'lightgrey',
                  borderRadius: '5px',
                }}
              >
                <label htmlFor="photo-input">
                  <IconButton color="primary" aria-label="upload photo" component="span">
                    <AddPhotoIcon sx={{ fontSize: 48 }} />
                  </IconButton>
                </label>
                <input type="file" id="photo-input" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Roboto',
                  fontWeight: '500',
                  fontSize: '18px',
                  marginBottom: '10px',
                  marginTop: '15px',
                }}
              >
                Nama Talent
              </Typography>
              <TextField
                id="filled"
                fullWidth
                placeholder="Masukkan Nama Talent"
                onChange={(e) => setTalentName(e.target.value)}
                value={talentName}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Roboto',
                  fontWeight: '500',
                  fontSize: '18px',
                  marginBottom: '10px',
                  marginTop: '15px',
                }}
              >
                Nomor Induk Pegawai
              </Typography>
              <TextField id="filled" fullWidth placeholder="Masukkan Nomor Induk Pegawai" onChange={(e) => setNip(e.target.value)} value={nip} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      fontSize: '18px',
                      marginBottom: '10px',
                      marginTop: '15px',
                    }}
                  >
                    Jenis Kelamin
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      onChange={(e) => setSex(e.target.value)}
                      value={sex}
                    >
                      <FormControlLabel value="L" control={<Radio />} label="Laki-laki" />
                      <FormControlLabel value="P" control={<Radio />} label="Perempuan" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      fontSize: '18px',
                      marginBottom: '10px',
                      marginTop: '15px',
                    }}
                  >
                    Tanggal Lahir
                  </Typography>
                  <TextField
                    fullWidth
                    id="birthDate"
                    // label="Birth Date"
                    name="birthDate"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setBirthdate(e.target.value)}
                    value={birthdate}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  {/* Deskripsi Talent */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      fontSize: '18px',
                      marginBottom: '10px',
                      marginTop: '15px',
                    }}
                  >
                    Deskripsi Talent
                  </Typography>
                  <TextField
                    id="deskripsi"
                    fullWidth
                    multiline
                    placeholder="Masukkan Deskripsi Talent"
                    rows={4} // Adjust the number of rows as needed
                    inputProps={{
                      maxLength: 255,
                    }}
                    onChange={(e) => setDescTalent(e.target.value)}
                    value={descTalent}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  {/* Upload CV */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      fontSize: '18px',
                      marginBottom: '10px',
                      marginTop: '15px',
                    }}
                  >
                    Upload CV
                  </Typography>
                  <Box
                    component="span"
                    sx={{
                      p: 2,
                      border: '1px dashed blue',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: 'lightgrey',
                      borderRadius: '5px',
                    }}
                  >
                    <label htmlFor="cv">
                      <IconButton color="primary" aria-label="upload CV" component="span">
                        {/* <AddPhotoIcon sx={{ fontSize: 48 }} /> */}
                      </IconButton>
                    </label>
                    <Input type="file" id="cv" name="cv" onChange={handleCVFileChange} inputProps={{ accept: '.pdf', style: { display: 'none' } }} />
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6}>
                  {/* Total Pengalaman */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      fontSize: '18px',
                      marginBottom: '10px',
                      marginTop: '15px',
                    }}
                  >
                    Total Pengalaman
                  </Typography>
                  <TextField
                    id="total-pengalaman"
                    fullWidth
                    type="number"
                    placeholder="Masukkan Total Pengalaman"
                    inputProps={{
                      min: 1,
                      max: 10,
                    }}
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                  />
                </Grid>
                {/* Level */}
                <Grid item xs={6} sm={6}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      fontSize: '18px',
                      marginBottom: '10px',
                      marginTop: '15px',
                    }}
                  >
                    Level
                  </Typography>
                  <Select
                    id="level"
                    fullWidth
                    native // Use the native select element
                    onChange={(e) => setSelectedTalentLevel(e.target.value)}
                    value={selectedTalentLevel}
                  >
                    {talentLevels.map((talentLevel) => (
                      <option key={talentLevel.talentLevelId} value={talentLevel.talentLevelId}>
                        {talentLevel.talentLevelName}
                      </option>
                    ))}
                  </Select>
                </Grid>
                {/* Skill Set */}
                <Grid item xs={12} sm={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      fontSize: '18px',
                      marginBottom: '10px',
                      marginTop: '15px',
                    }}
                  >
                    Skill Set
                  </Typography>
                  <FormControl component="fieldset">
                    <FormGroup row>
                      {skillSetOptions.map((option) => (
                        <FormControlLabel
                          key={option.skillsetId}
                          control={
                            <Checkbox checked={selectedSkills.includes(option.skillsetId)} onChange={(e) => handleSkillChange(option.skillsetId)} />
                          }
                          label={option.skillsetName}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>
                {/* Email */}
                <Grid item xs={12} sm={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      fontSize: '18px',
                      marginBottom: '10px',
                      marginTop: '15px',
                    }}
                  >
                    Email
                  </Typography>
                  <TextField
                    id="email"
                    fullWidth
                    type="email"
                    placeholder="Masukkan Email"
                    inputProps={{
                      maxLength: 100,
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Grid>
                {/* No Handphone */}
                <Grid item xs={12} sm={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      fontSize: '18px',
                      marginBottom: '10px',
                      marginTop: '15px',
                    }}
                  >
                    No Handphone
                  </Typography>
                  <TextField
                    id="no-handphone"
                    fullWidth
                    placeholder="Masukkan No Handphone"
                    inputProps={{
                      maxLength: 13,
                    }}
                    onChange={(e) => setNoHp(e.target.value)}
                    value={noHp}
                  />
                </Grid>
                {/* Status Kepegawaian */}
                <Grid item xs={12} sm={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      fontSize: '18px',
                      marginBottom: '10px',
                      marginTop: '15px',
                    }}
                  >
                    Status Kepegawaian
                  </Typography>
                  <Select
                    id="status-kepegawaian"
                    fullWidth
                    native // Use the native select element
                    onChange={(e) => setSelectedEmpStatus(e.target.value)}
                    value={selectedEmpStatus}
                  >
                    {employeeStatuses.map((employeeStatus) => (
                      <option key={employeeStatus.employeeStatusId} value={employeeStatus.employeeStatusId}>
                        {employeeStatus.employeeStatusName}
                      </option>
                    ))}
                  </Select>
                </Grid>
                {/* Biografi Video */}
                <Grid item xs={12} sm={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      fontSize: '18px',
                      marginBottom: '10px',
                      marginTop: '15px',
                    }}
                  >
                    Biografi Video
                  </Typography>
                  <TextField
                    id="biografi-video"
                    fullWidth
                    placeholder="Masukkan Biografi Video"
                    inputProps={{
                      maxLength: 255,
                    }}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    value={videoUrl}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Card>
          <Button onClick={handleSubmit} >Simpan</Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default TambahTalent;