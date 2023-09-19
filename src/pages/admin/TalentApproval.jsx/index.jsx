import React, { Suspense } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar as MuiAppBar, Drawer as MuiDrawer } from '@mui/material';
import { Box, Container, Grid, Toolbar, List, Typography, IconButton, Badge, Avatar, ListItemButton, ListItemIcon } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { mainListItems } from 'components/admin/Sidebar';
import ComboBoxSortBy from 'components/admin/ComboBoxSortBy';
import ComboBoxLang from 'components/admin/ComboBoxLang';
import AutocompleteTalentApproval from 'components/admin/AutocompleteTalentApproval';

const TalentApprovalTable = React.lazy(() => import('components/admin/TableApprovalTable'));

const drawerWidth = 240;

const listItemStyle = {
  color: '#586A84',
  fontFamily: 'Poppins',
  fontSize: '12px',
};

const circleButtonStyle = {
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: '#2C8AD3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
};

const collapseIconStyle = {
  width: 16,
  height: 16,
  position: 'absolute',
};

const sortByLabel = [
  { label: 'Newest', year: 1994 },
  { label: 'Latest', year: 1972 },
];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function TalentApproval() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="absolute" open={open} style={{ backgroundColor: 'white', boxShadow: 'none', color: 'black' }}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              display: 'flex-end', // Set to flex-end to align items to the right
              alignItems: 'center',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Stack direction="row-reverse" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ marginLeft: 'auto' }}>
              <KeyboardArrowDownIcon />
              <Avatar
                alt="Cindy Baker"
                style={{ width: 40, height: 40, borderRadius: 200, marginRight: 20 }}
                src="https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk0OTczNTgyNDA3NzcxNjcy/kim-kardashian-net-worth-kardashian-family-net-worth.jpg"
              />
              <IconButton color="inherit" style={{ marginRight: 20 }}>
                <Badge overlap="circular" badgeContent=" " color="secondary" variant="dot">
                  <NotificationsIcon style={{ color: '#586A84' }} />
                </Badge>
              </IconButton>
              <ComboBoxLang style={{ marginRight: 20 }}></ComboBoxLang>
              <IconButton />
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <List component="nav">{mainListItems({ open })}</List>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: [1],
            }}
          >
            <ListItemButton
              onClick={toggleDrawer}
              style={{
                alignItems: 'center',
                justifyContent: open ? 'center' : 'flex-start', // Adjusted styling
              }}
            >
              <ListItemIcon style={listItemStyle}>
                <IconButton style={circleButtonStyle}>
                  {open ? <ArrowBackIosNewRoundedIcon style={collapseIconStyle} /> : <ArrowForwardIosRoundedIcon style={collapseIconStyle} />}
                </IconButton>
              </ListItemIcon>

              {open && (
                <div>
                  <Typography variant="body1" style={listItemStyle}>
                    Collapse
                  </Typography>
                </div>
              )}
            </ListItemButton>
          </Toolbar>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: '#F1F6FF',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Title */}
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  align="left"
                  style={{ color: '#3B4758', fontSize: 22, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word' }}
                >
                  Daftar Persetujuan Talent
                </Typography>
              </Grid>

              {/* Autocomplete Search */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <AutocompleteTalentApproval key="autocomplete-talent-approval" style={{ width: '100%' }} />{' '}
                {/* Set width to 100% for mobile layout */}
              </Grid>

              {/* Autocomplete Select */}
              <Grid item xs={12} sm={6} md={2} lg={2}>
                <ComboBoxSortBy style={{ width: '100%' }} /> {/* Set width to 100% for mobile layout */}
              </Grid>

              <Grid item xs={12}>
                <Suspense fallback={<div>Loading...</div>}>
                  <TalentApprovalTable />
                </Suspense>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <AppBar position="absolute" open={open} sx={{ top: 'auto', bottom: 0, height: 40 }} style={{ backgroundColor: 'white', boxShadow: 'none' }}>
          <Typography
            variant="caption"
            align="center"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#586A84',
              fontFamily: 'Inter',
              fontWeight: '500',
              height: '100%',
            }}
          >
            {' © '}
            2022 - Talent Management 79
          </Typography>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
