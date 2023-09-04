import { Navigate, Outlet } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import { SecurableRoute } from '@astarx-studio/react-core/router';

import DashboardLayout from 'layouts/DashboardLayout';
import LoginLayout from 'layouts/LoginLayout';

import Customer from './customer';
// import Client from './client';

import { LightTheme } from 'resource/themes';
import DaftarTalent from './admin/DaftarTalent';
import Dashboard from './admin/Dashboard';
import TambahTalent from './admin/TambahTalent';
import LandingPage from './client/landing-page';
import Main from './client/Main/Dashboard'

const routes: SecurableRoute[] = [
  {
    index: true,
    element: <Navigate to="/customer" />,
  },
  {
    path: 'customer',
    element: <Customer />,
  },
  {
    path: 'client',
    element: (
      <ThemeProvider theme={LightTheme}>
        <Outlet />
      </ThemeProvider>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'main',
        element: (
          <ThemeProvider theme={LightTheme}>
            <Outlet />
          </ThemeProvider>
        ),
        children:[
          {
            index: true,
            element: <Main/>,
          },
          {
            path: 'wishlist',
            element:<Main/>
          },
          {
            path: 'request',
            element:<Main/>
          },
          {
            path: 'detail/:id',
            element:<Main/>
          }
        ],
      },
    ],
  },
  {
    path: 'admin',
    element: (
      <ThemeProvider theme={LightTheme}>
        <Outlet />
      </ThemeProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="login" />,
      },
      {
        path: 'login',
        element: <LoginLayout />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
      {
        path: 'daftar-talent',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DaftarTalent />,
          },
        ],
      },
      {
        path: 'tambah-talent',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <TambahTalent />,
          },
        ],
      },
    ],
  },
];

export default routes;
