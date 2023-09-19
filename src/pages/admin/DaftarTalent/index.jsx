import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
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
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { getAllTalent } from 'apis';
import { useNavigate } from 'react-router-dom';

const buttonEntriesStyle = {
  marginRight: '4px',
  borderRadius: '4px',
  width: '28px',
  minWidth: '0px',
  height: '27px',
  paddingLeft: 'auto',
  paddingRight: 'auto',
};

const colorHitamStyle = { color: '#3B4758' };

const headerStyle = { padding: 0, paddingLeft: 2, color: '#7D8FA9', py: '2px' };

const greyChipStyle = { background: '#586A84', color: '#FFF', paddingLeft: '5px', paddingRight: '5px' };

const greenChipStyle = { backgroundColor: '#30A952', color: '#FFF', paddingLeft: '5px', paddingRight: '5px' };

const redChipStyle = { backgroundColor: '#CF1D1D', color: '#FFF', paddingLeft: '5px', paddingRight: '5px' };

const silverChipStyle = { background: '#DBDBDB', color: '#586A84', paddingLeft: '5px', paddingRight: '5px' };

const DebounceDelay = 1000;

const DaftarTalents = () => {
  const [selectValue, setSelectValue] = useState('');
  const [entries, setEntries] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(9);
  const [dataTalents, setDataTalents] = useState([]);
  const [request, setRequest] = useState({
    name: '',
    sortBy: '',
  });
  const [typingTimeout, setTypingTimeout] = useState(null);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const getDataTalents = (name, sortBy) => {
    getAllTalent(name, sortBy)
      .then((res) => {
        console.log(res);
        setDataTalents(res.data.content);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const handleChangeEntries = (value) => {
    setEntries(value);
    setPage(0);
    setStartIndex(0);
    setEndIndex(value - 1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    setStartIndex(value * entries - 10);
    setEndIndex(value * entries + (entries - 1) - 10);
  };

  const handleChangeSelect = (event) => {
    setSelectValue(event.target.value);
  };

  const handleChangeSearch = (value) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const newTypingTimeout = setTimeout(() => {
      setRequest({ ...request, name: value });
      getDataTalents(value, request.sortBy);
    }, DebounceDelay);

    setTypingTimeout(newTypingTimeout);
  };

  const handleTambahTalentClick = () => {
    navigate('/admin/tambah-talent');
    window.location.reload();
  };

  const handleDetail = (talentId) => {
    // Assuming you have a route for talent detail page, navigate to it
    navigate(`/admin/detail-talent/${talentId}`);
  };

  const handleEdit = (talentId) => {
    // Assuming you have a route for talent detail page, navigate to it
    navigate(`/admin/edit-talent/${talentId}`);
  };

  useEffect(() => {
    console.log('startIndex', startIndex);
    console.log('endIndex', endIndex);
    console.log('request', request);
  }, [startIndex, endIndex, request]);

  useEffect(() => {
    getDataTalents(request.name, request.sortBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography
        sx={{ color: '#3B4758', fontFamily: 'Poppins', fontSize: '22px', fontStyle: 'normal', fontWeight: 700, lineHeight: 'normal', mb: '24px' }}
      >
        Daftar Talent
      </Typography>
      <Box sx={{ gap: '4px', width: '100%' }}>
        <TextField
          id="search"
          placeholder="Search..."
          variant="outlined"
          size="small"
          onChange={(event) => handleChangeSearch(event.target.value)}
          sx={{
            borderRadius: '6px',
            border: '1px solid #2C8AD3',
            background: '#FFF',
            width: '260px',
            padding: '0px',
            mr: '8px',
          }}
          InputProps={{
            startAdornment: <SearchIcon style={{ color: '#2C8AD3', marginLeft: '-7px', marginRight: '2px' }} />,
          }}
        />
        <FormControl sx={{ border: '1.5px solid #2C8AD3', borderRadius: '6px' }}>
          <Select
            size="small"
            value={selectValue}
            onChange={handleChangeSelect}
            displayEmpty
            // inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              width: '200px',
              background: '#FFF',
              '& .MuiOutlinedInput-root': {
                borderColor: '#2C8AD3', // Ubah warna tepi di sini
              },
            }}
          >
            <MenuItem sx={{ color: 'grey' }} value={''}>
              Select ...
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleTambahTalentClick} sx={{ float: 'right', background: '#2C8AD3', color: '#FFF', textTransform: 'none', width: '17%' }}>
          <AddCircleOutlineIcon sx={{ fontSize: 'medium' }} /> Tambah Talent
        </Button>
      </Box>
      <Box sx={{ background: '#FFF', borderRadius: '4px', mt: '21px' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={headerStyle}>Talent</TableCell>
                <TableCell sx={headerStyle}>Level</TableCell>
                <TableCell sx={headerStyle}>Pengalaman</TableCell>
                <TableCell sx={headerStyle}>Status</TableCell>
                <TableCell sx={headerStyle}>Kepegawaian</TableCell>
                <TableCell sx={headerStyle}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTalents.slice(startIndex, endIndex + 1).map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={colorHitamStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        //src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
                        src={row.talentPhotoUrl}
                        variant="rounded"
                        sx={{ width: '50px', height: '50px', borderRadius: '50px' }}
                      />
                      <Typography style={{ marginLeft: '10px' }}>{row.talentName}</Typography>
                    </div>
                  </TableCell>
                  <TableCell sx={colorHitamStyle}>{row.talentLevel}</TableCell>
                  <TableCell sx={colorHitamStyle}>{row.talentExperience} Tahun</TableCell>
                  <TableCell>
                    <Chip
                      label={row.talentStatus}
                      variant="outlined"
                      size="small"
                      sx={row.talentStatus === 'Onsite' ? greyChipStyle : silverChipStyle}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.employeeStatus}
                      variant="outlined"
                      size="small"
                      sx={row.employeeStatus === 'Active' ? greenChipStyle : redChipStyle}
                    />
                  </TableCell>
                  <TableCell sx={colorHitamStyle}>
                    <IconButton>
                      <VisibilityIcon onClick={() => handleDetail(row.talentId)} />
                    </IconButton>
                    <IconButton>
                      <BorderColorIcon onClick={() => handleEdit(row.talentId)} sx={{ color: '#2C8AD3' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            padding: '4px',
            paddingBottom: '10px',
            paddingTop: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ padding: '4px' }}>Entries :</span>
            <Button
              size="small"
              variant={entries === 10 ? 'contained' : 'outlined'}
              onClick={() => handleChangeEntries(10)}
              style={buttonEntriesStyle}
            >
              10
            </Button>
            <Button
              size="small"
              variant={entries === 20 ? 'contained' : 'outlined'}
              onClick={() => handleChangeEntries(20)}
              style={buttonEntriesStyle}
            >
              20
            </Button>
            <Button
              size="small"
              variant={entries === 50 ? 'contained' : 'outlined'}
              onClick={() => handleChangeEntries(50)}
              style={buttonEntriesStyle}
            >
              50
            </Button>
          </div>
          <Pagination count={Math.ceil(dataTalents.length / entries)} page={page} onChange={handleChangePage} />
        </div>
      </Box>
    </>
  );
};

export default DaftarTalents;

