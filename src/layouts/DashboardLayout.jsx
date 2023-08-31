import { AccountCircle, Assignment, BusinessCenter, Dashboard, ExpandLess, ExpandMore, Notifications, PeopleAlt } from '@mui/icons-material';
import { Avatar, Card, Collapse, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import BoxContainer from '@astarx-studio/mui/components/BoxContainer';
import GenericLayout, { Bar, Content } from '@astarx-studio/mui/layouts/GenericLayout';
import { useIdentity } from '@astarx-studio/react-core/auth';

const DashboardLayout = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [subAvatarOpen, setAvatarOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleSubMenuToggle = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const handleSubMenuAvatar = () => {
    setAvatarOpen(!subAvatarOpen);
  };

  const menuItems = [
    {
      icon: Dashboard,
      text: 'Dashboard',
      path: '../pages/Dashboard',
    },
    {
      icon: PeopleAlt,
      text: 'Daftar Talent',
      path: '../pages/DaftarTalent',
    },
    {
      icon: BusinessCenter,
      text: 'Daftar Client',
    },
    {
      icon: Assignment,
      text: 'Daftar Persetujuan Talent',
    },
    {
      icon: AccountCircle,
      text: 'Kelola User',
    },
  ];

  const { isLoggedIn } = useIdentity();

  if (!isLoggedIn) return <Navigate to="/admin/login" />;
  return (
    <BoxContainer fit="stretch-to-view">
      <GenericLayout barPosition="left">
        <Bar component={Card} sx={(theme) => ({ width: 250, borderRadius: 0, pt: `calc(60px + ${theme.spacing(2)})`, pb: 2 })}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={`${process.env.PUBLIC_URL}/resource/image/logoberwarna.png`}
              alt="logo"
              style={{ width: 165, height: 90, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            />
          </div>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={0.5}
            sx={(theme) => ({ height: `calc(50% + ${theme.spacing(1)})` })}
          >
            {menuItems.map(({ icon: Icon, text }, i) => (
              <Grid key={i} item sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemButton onClick={text === 'Kelola User' ? handleSubMenuToggle : handleMenuOpen}>
                  <IconButton
                    sx={{
                      height: 50,
                      width: 180,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'blue',
                      },
                      '&:hover > *': {
                        color: 'white',
                      },
                    }}
                  >
                    <Icon sx={{ marginRight: '15px' }} />
                    <ListItemText primary={text} sx={{ textAlign: 'Left' }} />
                    {text === 'Kelola User' && (subMenuOpen ? <ExpandLess /> : <ExpandMore />)}
                  </IconButton>
                </ListItemButton>
              </Grid>
            ))}
            <Collapse in={subMenuOpen}>
              <List>
                <ListItem
                  sx={{
                    marginLeft: '20px',
                    borderRadius: 2,
                    backgroundColor: 'lightblue',
                    width: '100%',
                  }}
                >
                  <ListItemText
                    primary="Daftar User"
                    sx={{
                      '&:hover': {
                        color: 'blue',
                      },
                    }}
                  />
                </ListItem>
                <br />
                <ListItem
                  sx={{
                    marginLeft: '20px',
                    borderRadius: 2,
                    backgroundColor: 'lightblue',
                    width: '100%',
                  }}
                >
                  <ListItemText
                    primary="Daftar Role"
                    sx={{
                      '&:hover': {
                        color: 'blue',
                      },
                    }}
                  />
                </ListItem>
              </List>
            </Collapse>
            <Grid
              item
              sx={{
                // marginTop: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Center horizontally
                width: '100%', // Set a consistent width
              }}
            >
              <ArrowDropDownCircleIcon
                sx={{
                  transform: 'rotate(90deg)',
                  marginRight: '10px',
                  alignItems: 'center',
                  color: 'blue',
                }}
              />
              <Typography>Collapse</Typography>
            </Grid>
          </Grid>
        </Bar>
        <GenericLayout barPosition="top">
          <Bar component={Card} sx={{ height: 60, borderRadius: 0, pr: 5, pl: 5 }}>
            <Grid
              container
              direction="row-reverse"
              alignItems="center"
              justifyContent="flex-start"
              spacing={1}
              sx={(theme) => ({ height: `calc(100% + ${theme.spacing(1)})` })}
            >
              <Grid item>
                <ListItemButton onClick={handleSubMenuAvatar}>
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                  {subAvatarOpen ? <ExpandLess /> : <ExpandMore />}
                  <Collapse in={subAvatarOpen}>
                    <List>
                      <ListItem>
                        <ListItemText primary="Profil" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Log Out" />
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItemButton>
              </Grid>
              <Grid item ml={1} mr={1} />
              {[
                {
                  icon: Notifications,
                },
              ].map(({ icon: Icon }, i) => (
                <Grid key={i} item>
                  <IconButton sx={{ height: 48, width: 48, borderRadius: 2 }}>
                    <Icon />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Bar>
          <Content sx={{ bgcolor: '#F5F5FF', p: 3 }}>
            <Outlet />
          </Content>
        </GenericLayout>
      </GenericLayout>
    </BoxContainer>
  );
};

export default DashboardLayout;
