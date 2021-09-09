import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import Lock from './pages/Lock';
import Unlock from './pages/Unlock';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Outlet />,
      children: [
        { path: 'lock', element: <Lock /> },
        { path: 'unlock/:link', element: <Unlock /> },
        { path: '/', element: <Navigate to="/lock" /> }
      ]
    },
    { path: '*', element: <Navigate to="/" replace /> }
  ]);
}
