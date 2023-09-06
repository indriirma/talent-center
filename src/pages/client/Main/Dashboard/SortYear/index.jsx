import { useState } from 'react';
import { Autocomplete, Typography, Stack, TextField } from '@mui/material';

const SortTalent = ({ currentPage, talentsPerPage, totalTalents, onSortOptionChange }) => {
  const [selectedSortOption, setSelectedSortOption] = useState({
    value: 'experience',
    label: window.innerWidth < 600 ? 'Sort by' : 'Years of Experience',
  });
  const sortingOptions = [
    { value: 'experience', label: 'Years of Experience' },
    { value: 'ascending', label: 'A - Z' },
    { value: 'descending', label: 'Z - A' },
  ];

  const startIndex = (currentPage - 1) * talentsPerPage + 1;
  const endIndex = Math.min(startIndex + talentsPerPage - 1, totalTalents);

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography sx={{ display: { xs: 'none', sm: 'flex' }, color: '#212121', fontFamily: 'Inter', lineHeight: 'normal' }} variant="body1">
        Showing you {startIndex} - {endIndex} talents out of {totalTalents} total for matched talents
      </Typography>

      <Stack direction="row" spacing={2}>
        <Typography
          sx={{ display: { xs: 'none', sm: 'flex' }, color: '#212121', fontFamily: 'Inter', lineHeight: 'normal', alignSelf: 'center' }}
          variant="body1"
        >
          Sort by
        </Typography>
        <Autocomplete
          id="sort-by-autocomplete"
          value={selectedSortOption}
          onChange={(event, newValue) => {
            setSelectedSortOption(newValue);
            onSortOptionChange(newValue.value);
        }}
          options={sortingOptions}
          disableClearable
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                readOnly: true,
                style: {
                  fontFamily: 'Inter',
                  fontSize: '14px',
                },
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'stretch',
                borderRadius: '8px',
                border: '1px solid var(--grey, #848484)',
                width: { xs: '170px', sm: '300px' },
              }}
            />
          )}
          isOptionEqualToValue={(option, value) => option.value === value}
        />
      </Stack>
    </Stack>
  );
};

export default SortTalent;
