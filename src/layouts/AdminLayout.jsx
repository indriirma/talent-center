import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/SidebarAdmin';
import Navbar from '../components/NavbarAdmin';
import Footer from '../components/FooterAdmin';
const AdminLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 3, marginTop: '64px', backgroundColor: '#F1F6FF' }}>{children}</Box>
      </Box>
      <Box>
        <Footer />
      </Box>
    </React.Fragment>
  );
};

export default AdminLayout;
