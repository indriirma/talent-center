import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { InputAdornment, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import axios from 'axios';

const filter = createFilterOptions();

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: 'The Shawshank Redemption', year: 1994 },
//   { title: 'The Godfather', year: 1972 },
//   { title: 'The Godfather: Part II', year: 1974 },
//   { title: 'The Dark Knight', year: 2008 },
// ];

export default function ComboBoxTalentApproval(props) {
  const [value, setValue] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { onDataSelected, onSearch } = props;

  React.useEffect(() => {
    setLoading(true); // Set loading saat mengambil data
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/talent-management/talent-approvals')
      .then((response) => {
        console.log('API Response:', response.data.content);
        const data = response.data.content;
        setOptions(
          data.map((item) => ({
            talentRequestId: item.talentRequestId,
            talentName: item.talentName,
          }))
        );
        setLoading(false); // Matikan loading setelah data diterima
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Matikan loading saat ada kesalahan
      });
  }, []);

  return (
    <Autocomplete
      sx={{ minWidth: 100 }}
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            talentName: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            talentName: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, state) => {
        const inputValue = state.inputValue.toLowerCase();
        return options.filter((option) => option.talentName.toLowerCase().includes(inputValue));
      }}
      openOnFocus
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={loading ? [] : options}
      loading={loading}
      getOptionLabel={(option) => (option && option.talentName) || ''}
      renderOption={(props, option) => (
        <li key={option.talentRequestId} {...props}>
          {option.talentName}
        </li>
      )}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params.inputProps}
          placeholder="Search ..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="end">
                <IconButton edge="start" onClick={() => console.log('masuk')}>
                  <SearchOutlined sx={{ color: '#2C8AD3' }} />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              width: { xs: '30vw', sm: '20vw' },
              backgroundColor: 'white',
              borderRadius: '5px',
            },
          }}
          inputProps={{ ...params.inputProps, fontFamily: 'Inter', maxLength: 255, autoFocus: true }}
          sx={{
            input: { width: '0%', color: 'black', ':focus': { width: '90%' } },
          }}
        />
      )}
    />
  );
}
