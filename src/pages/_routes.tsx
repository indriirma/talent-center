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
import Main from './client/Main/Dashboard';
import DetailTalent from './admin/DetailTalent';
import EditTalent from './admin/EditTalent';
import TalentApproval from './admin/TalentApproval.jsx';
import Wishlist from './client/Main/My-wishlist';
import MyRequest from './client/Main/My-request';
import Detail from './client/Main/Detail';

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
        children: [
          {
            index: true,
            element: <Main />,
          },
          {
            path: 'wishlist',
            element:<Wishlist/>
          },
          {
            path: 'request',
            element:<MyRequest/>
          },
          {
            path: 'detail/:id',
            element:<Detail/>
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
        //element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DaftarTalent />,
          },
        ],
      },
      {
        path: 'tambah-talent',
        // element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <TambahTalent />,
          },
        ],
      },
      {
        path: 'detail-talent/:talentId',
        // element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DetailTalent />,
          },
        ],
      },
      {
        path: 'edit-talent/:talentId',
        // element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <EditTalent />,
          },
        ],
      },
      {
        path: 'talent-approval',
        // element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <TalentApproval />,
          },
        ],
      },
      {
        path: 'talent',
        children: [
          {
            index: true,
            // element: <Talent />,
            // element: <TambahT />,
          },
        ],
      },
    ],
  },
];

export default routes;
