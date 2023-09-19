import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { ListItemIcon } from '@mui/material';
import { Flag } from '@mui/icons-material';

export default function ComboBoxLang() {
  const [sortBy, setsortBy] = React.useState('newest');

  const handleChange = (event) => {
    setsortBy(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
        <Select
          disableUnderline={true}
          variant="standard"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#586A84',
            fontSize: 14,
            fontFamily: 'Roboto',
            fontWeight: '400',
            wordWrap: 'break-word',
          }}
          value={sortBy}
          onChange={handleChange}
          IconComponent={KeyboardArrowDownRoundedIcon}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
        >
          <MenuItem value={'newest'} style={{ color: '#586A84', fontSize: 14, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
            <img
              src="https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg"
              alt="Indonesia Flag"
              style={{ width: 24, height: 16, marginRight: 8 }}
            />
            English
          </MenuItem>
          <MenuItem value={'latest'} style={{ color: '#586A84', fontSize: 14, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
            <img
              src="https://cdn.countryflags.com/thumbs/indonesia/flag-400.png"
              alt="English Flag"
              style={{ width: 24, height: 16, marginRight: 8 }}
            />
            Indonesian
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
