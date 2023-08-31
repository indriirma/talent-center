import { Navigate, Outlet } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import { SecurableRoute } from '@astarx-studio/react-core/router';

import LoginLayout from 'layouts/LoginLayout';
import DashboardLayout from 'layouts/DashboardLayout';

import Customer from './customer';
// import Client from './client';

import { LightTheme } from 'resource/themes';
import LandingPage from './client/landing-page';

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
        <Outlet/>
      </ThemeProvider>
    ),
    children:[
      {
        index: true,
        element:<LandingPage/>,
      }, 
    ]
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
            element: <>This... Is... DASHBOARD!!!</>,
          },
        ],
      },
    ],
  },
];

export default routes;
