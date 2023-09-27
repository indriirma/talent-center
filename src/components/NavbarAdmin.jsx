import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import { Box, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

export default function NavbarAdmin() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white',
      }}
    >
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
