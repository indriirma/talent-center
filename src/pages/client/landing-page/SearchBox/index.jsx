import { useState, useEffect } from 'react';
import { TextField, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchSearchTags } from 'apis';
import { useNavigate } from 'react-router-dom';

const SearchBox = ({ selectedTag }) => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    const skillsetIdArr = selectedOptions.map((item) => item.skillsetId);
    navigate('main', { state: { skillsetIdArr, selectedOptions } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSearchTags(inputValue);
        setList(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [inputValue]);

  useEffect(() => {
    if (selectedTag.skillsetName !== undefined) {
      console.log(selectedTag);
      setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, selectedTag]);
      setInputValue(selectedTag.skillsetName);
    }
  }, [selectedTag]);

  useEffect(() => {
    console.log('selectedOptions has changed:', selectedOptions);
    console.log('inputValue has changed:', inputValue);
    console.log(list);
  }, [selectedOptions, inputValue]);

  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '884px',
        height: '64px',
        backgroundColor: 'white',
        borderRadius: '50px',
        '@media (max-width: 888px)': {
          width: '500px',
          height: '48px',
          borderRadius: '36px',
        },
        '@media (max-width: 600px)': {
          width: '328px',
          height: '48px',
          borderRadius: '36px',
        },
      }}
    >
      <Autocomplete
        multiple
        inputValue={inputValue}
        data-testid="search-bar-element"
        id="tags-standard"
        options={list}
        getOptionLabel={(option) => option.skillsetName}
        onChange={(event, newValue) => {
          setSelectedOptions(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          if (newInputValue) {
            console.log('new input ', newInputValue);
            setInputValue(newInputValue);
            setSelectedOptions([]);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{ ...params.InputProps, disableUnderline: true }}
            variant="standard"
            placeholder={selectedOptions.length === 0 ? 'Try "JavaScript"' : ''}
            sx={{
              width: '790px',
              ml: 4,
              flex: 1,
              color: 'black',
              '& .MuiAutocomplete-endAdornment': {
                display: 'none', // Hide the dropdown icon
              },
              '@media (max-width: 888px)': {
                width: '400px',
              },
              '@media (max-width: 600px)': {
                width: '245px',
              },
            }}
          />
        )}
        PaperComponent={({ children }) => (
          <Paper elevation={3} sx={{ backgroundColor: 'white', color: 'black' }}>
            {children}
          </Paper>
        )}
      />
      <IconButton type="button" onClick={handleSearchClick} sx={{ mr: 3, color: '#C4C4C4' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
