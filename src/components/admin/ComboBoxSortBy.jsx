import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function ComboBoxSortBy() {
  const [sortBy, setsortBy] = React.useState('newest');

  const handleChange = (event) => {
    setsortBy(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
        <Select value={sortBy} onChange={handleChange} IconComponent={KeyboardArrowDownRoundedIcon}>
          <MenuItem value={'newest'}>Newest</MenuItem>
          <MenuItem value={'latest'}>Latest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
