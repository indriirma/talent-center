import { useEffect, useState } from 'react';
import { Paper, Autocomplete, TextField, IconButton } from '@mui/material';
import { fetchSearchTags } from 'apis';
import { Search } from '@mui/icons-material';

export const SearchBox = ({ onSearchClick, options, skillId, searchWidth, textWidth, marginSize, paperMl }) => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [selectedOptions, setSelectedOptions] = useState(skillId ? skillId : []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSearchTags(inputValue);
        setList(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (inputValue) {
      fetchData();
    } else {
      setList([]);
    }
  }, [inputValue]);

  const handleSearchClick = () => {
    const skillsetId = selectedOptions.map((option) => option.skillsetId);
    onSearchClick(skillsetId, selectedOptions);
  };

  return (
    <Paper
      component="form"
      sx={{
        ml: paperMl,
        width: searchWidth,
        height: '50px',
        backgroundColor: 'white',
        borderRadius: '10px',
        display: 'flex',
        // boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.10)',
      }}
    >
      <Autocomplete
        multiple
        inputValue={inputValue}
        data-testid="search-bar-element"
        id="tags-standard"
        options={list}
        defaultValue={options}
        getOptionLabel={(option) => option.skillsetName}
        onChange={(event, newValue) => {
          setSelectedOptions(newValue); // Mengatur nilai terpilih saat opsi dipilih atau dihapus
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          setSelectedOptions([]); // Mengatur nilai terpilih menjadi kosong saat input berubah
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{ ...params.InputProps, disableUnderline: true }}
            variant="standard"
            placeholder={selectedOptions.length === 0 ? 'Try "JavaScript"' : ''}
            sx={{
              width: textWidth,
              ml: marginSize,
              flex: 1,
              color: 'black',
              '& .MuiAutocomplete-endAdornment': {
                display: 'none', // Hide the dropdown icon
              },
              '@media (max-width: 400px)': {
                width: '205px',
              },
              // Vertically center the Autocomplete
              position: 'relative',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        )}
      />
      <IconButton onClick={handleSearchClick} type="button" sx={{ mr: 3, color: '#C4C4C4' }} aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  );
};
