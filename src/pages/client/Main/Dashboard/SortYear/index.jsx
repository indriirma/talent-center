import { Autocomplete, Typography, Stack, TextField, Box } from '@mui/material';
import { useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ArrowUpward } from '@mui/icons-material';

const SortTalent = ({ currentPage, talentsPerPage, totalTalents, onSortOptionChange, setSorting }) => {
  const [selectedSortOption, setSelectedSortOption] = useState({
    value: 'experience',
    label: window.innerWidth < 600 ? 'Sort by' : 'Years of Experience',
  });
  const sortingOptions = [
    { value: 'talentName', label: 'A - Z', sort: false },
    { value: 'talentName', label: 'Z - A', sort: true },
    { value: 'experience', label: 'Years of Experience', sort: false },
    { value: 'experience', label: 'Years of Experience', sort: true },
    { value: 'talentLevel', label: 'Level', sort: false },
    { value: 'talentLevel', label: 'Level', sort: true },
    { value: 'talentAvailability', label: 'Available', sort: true },
  ];

  // const handle

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
            onSortOptionChange(newValue.value);
            setSelectedSortOption(newValue);
            setSorting(newValue.sort);
            console.log('sorting : ', selectedSortOption);
          }}
          options={sortingOptions}
          disableClearable
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <Typography fontFamily="Inter" fontSize="10pt">
                {option.label}
              </Typography>
              {option.value === 'talentLevel' || option.value === 'experience' ? (
                option.sort ? (
                  <ArrowDownwardIcon sx={{ width: '15px' }} />
                ) : (
                  <ArrowUpward sx={{ width: '15px' }} />
                )
              ) : (
                ''
              )}
            </Box>
          )}
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
