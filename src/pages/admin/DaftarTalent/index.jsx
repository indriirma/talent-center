import { Edit, Search, Visibility as VisibilityIcon } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

function DaftarTalent() {
  const rows = [
    { name: 'John Doe', avatar: '/path/to/avatar1.jpg', level: 'Intermediate', pengalaman: '5 years', status: 'Active', kepegawaian: 'Full-time' },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/talent-management/talents')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <Grid container direction="column" spacing={2}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Poppins',
          fontSize: '30px',
          fontWeight: '500',
          marginBottom: '10px',
          textAlign: 'left',
          marginLeft: '15px',
          marginTop: '10px',
        }}
      >
        Daftar Talent
      </Typography>
      <Grid container item xs={12} sm={12} spacing={2}>
        <Grid item xs={4} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            sx={{ backgroundColor: 'white' }}
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={4} sm={4}>
          <FormControl sx={{ width: '200px', height: '40px' }} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Select</InputLabel>
            <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" label="Select" sx={{ backgroundColor: 'white' }}>
              <MenuItem value={1}>L</MenuItem>
              <MenuItem value={2}>P</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={4} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
            Tambah Talent
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Talent</TableCell>
                <TableCell align="right">Level</TableCell>
                <TableCell align="right">Pengalaman</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Kepegawaian</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt={row.name} src={row.avatar} sx={{ marginRight: '10px' }} />
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.level}</TableCell>
                  <TableCell align="right">{row.pengalaman}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.kepegawaian}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Talent</TableCell>
                <TableCell align="right">Level</TableCell>
                <TableCell align="right">Pengalaman</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Kepegawaian</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.talentId}>
                  <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt={row.talentName} src={row.talentPhotoUrl} sx={{ marginRight: '10px' }} />
                    {row.talentName}
                  </TableCell>
                  <TableCell align="right">{row.talentLevel}</TableCell>
                  <TableCell align="right">{row.talentExperience}</TableCell>
                  <TableCell align="right">{row.talentStatus}</TableCell>
                  <TableCell align="right">{row.employeeStatus}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Grid>
    </Grid>
  );
}

export default DaftarTalent;
