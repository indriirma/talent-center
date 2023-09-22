import { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Autocomplete, TextField, Divider, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InboxIcon from '@mui/icons-material/Inbox';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSearchTags } from 'apis';

function Navbar() {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const navigateToWishlist = () => {
    navigate('/client/main/wishlist');
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

    if (inputValue) {
      fetchData();
    } else {
      setList([]);
    }
  }, [inputValue]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToMyRequest = () => {
    //navigate('/my-request');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#081E43', width: '100%' }}>
      <Container maxWidth="">
        <Toolbar disableGutters sx={{ height: { md: '100px', xs: '66px' } }}>
          <Link to="/client/main">
            <Avatar
              src={process.env.PUBLIC_URL + '/resource/image/logotujuhsembilan-without-text.svg'}
              alt="Talent Center 79 Logo"
              sx={{
                width: { xs: '38px', md: '60px' },
                height: 'auto',
                borderRadius: 0,
                marginRight: '10px',
                '@media (max-width: 600px)': {
                  marginRight: '10px',
                },
              }}
            />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/client/main"
            sx={{
              mr: 2,
              fontFamily: 'Inter',
              fontWeight: 700,
              letterSpacing: '0.1rem',
              color: 'inherit',
              lineHeight: '80px',
              textDecoration: 'none',
              '@media (max-width: 600px)': {
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '.0rem',
              },
            }}
          >
            Talent Center 79
          </Typography>

          {/* search box */}

          <Paper
            component="form"
            sx={{
              ml: 10,
              width: '700px',
              height: '40px',
              backgroundColor: 'white',
              borderRadius: '10px',
              posision: 'absolute',
              display: { xs: 'none', md: 'flex' },
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
                    width: '600px',
                    ml: 4,
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
              // PaperComponent={({ children }) => (
              //   <Paper elevation={3} sx={{ backgroundColor: 'white', color: 'black' }}>
              //     {children}
              //   </Paper>
              // )}
            />
            <IconButton type="button" sx={{ mr: 3, color: '#C4C4C4' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          <IconButton
            sx={{
              width: '50px',
              position: 'absolute',
              right: 170,
              color: 'white',
              '@media (max-width: 600px)': {
                right: 106,
              },
            }}
          >
            <BookmarkIcon onClick={navigateToWishlist} />
          </IconButton>

          <NotificationsIcon
            sx={{
              position: 'absolute',
              right: 150,
              '@media (max-width: 600px)': {
                right: 65,
              },
            }}
          />
          <Divider
            sx={{ color: 'white', height: 28, m: 0.5, position: 'absolute', right: 120, display: { xs: 'none', md: 'block' } }}
            orientation="vertical"
          />

          {/* profile */}
          <Box
            sx={{
              flexGrow: 0,
              position: 'absolute',
              right: 110,
              '@media (max-width: 600px)': {
                right: 10,
              },
            }}
          >
            <AccountCircleIcon sx={{ fontSize: '2rem' }} />
          </Box>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              position: 'absolute',
              right: 50,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            User
          </Typography>
          <ArrowDropDownIcon
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ position: 'absolute', right: 90, display: { xs: 'none', md: 'flex' } }}
          />
          <Menu id="dropdown-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem
              sx={{
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '17px',
                textAlign: 'left',
              }}
              onClick={handleClose}
            >
              <ListItemIcon onClick={navigateToMyRequest}>
                <InboxIcon fontSize="small" />
              </ListItemIcon>
              My Request
            </MenuItem>
            <MenuItem
              sx={{
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '17px',
                textAlign: 'left',
              }}
              onClick={handleClose}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Sign Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
