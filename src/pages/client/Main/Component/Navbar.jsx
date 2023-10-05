import { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, List, ListItem, ListItemText, ListItemButton, Drawer, Badge } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InboxIcon from '@mui/icons-material/Inbox';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Close, Person } from '@mui/icons-material';
import { SearchBox } from './SearchBox';

function Navbar({ onSearchClick, options, skillId, window, countWishlist }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggle = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const dataArray = Cookies.get('loginRequirement');
  const cookieData = JSON.parse(dataArray || '[]');
  const username = cookieData.username;

  const container = window !== undefined ? () => window().document.body : undefined;

  const navigate = useNavigate();

  const navigateToWishlist = () => {
    navigate('/client/main/wishlist');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    Cookies.remove('loginRequirement');
    navigate('/client');
  };

  const navigateToMyRequest = () => {
    navigate('/client/main/request');
  };

  useEffect(() => {
    console.log(anchorEl);
  }, [anchorEl]);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#081E43' }}>
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
          <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <SearchBox
              onSearchClick={onSearchClick}
              options={options}
              skillId={skillId}
              searchWidth="700px"
              textWidth="600px"
              marginSize={4}
              paperMl={10}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box container sx={{ display: 'flex' }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={countWishlist} color="error">
                <BookmarkIcon onClick={navigateToWishlist} />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <NotificationsIcon />
            </IconButton>
            {/* <Divider sx={{ color: 'white', display: { xs: 'none', md: 'flex' } }} orientation="vertical" /> */}

            {/* profile */}
            <IconButton
              aria-controls="dropdown-menu"
              aria-haspopup="true"
              onClick={handleClick}
              size="large"
              color="inherit"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Person />
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '9px',
                  ml: '6px',
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                {username}
              </Typography>
              <ArrowDropDownIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
            </IconButton>
            <IconButton onClick={handleToggle} size="large" color="inherit" sx={{ display: { xs: 'flex', md: 'none' } }}>
              <Person />
            </IconButton>
            <Menu id="dropdown-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem
                sx={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '17px',
                  textAlign: 'left',
                }}
                onClick={() => {
                  handleClose();
                  navigateToMyRequest();
                }}
              >
                <ListItemIcon>
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
                onClick={() => {
                  handleClose();
                  handleSignOut();
                }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={isDrawerOpen}
          onClose={handleToggle}
          anchor="right"
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { md: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
            },
          }}
        >
          <Box
            onClick={handleToggle}
            sx={{
              height: '100%',
              bgcolor: '#2C8AD3',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
              }}
            >
              <Close sx={{ alignSelf: 'flex-end' }} />
            </div>
            <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={navigateToMyRequest}
                  sx={{ textAlign: 'center', color: 'white', textTransform: 'none', borderRadius: '25px' }}
                >
                  <ListItemIcon>
                    <InboxIcon sx={{ color: 'white' }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText sx={{ fontFamily: 'Inter' }} primary={'My Request'} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleSignOut}
                  sx={{
                    textAlign: 'center',
                    color: 'white',
                    textTransform: 'none',
                    borderRadius: '25px',
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: 'white' }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText sx={{ fontFamily: 'Poppins' }} primary={'Sign In'} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </AppBar>
  );
}

export default Navbar;
