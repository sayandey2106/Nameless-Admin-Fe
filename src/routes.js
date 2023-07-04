import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import CastPage from './pages/CastPage';
import CastForm from './sections/@dashboard/cast/CastForm';
import ShortFilmPage from './pages/ShortFilmPage';
import CastDetailsPage from './pages/CastDetailsPage';
import ShortFilmForm from './sections/@dashboard/shortfilm/ShortFilmForm';
import AssignCastCard from './sections/@dashboard/cast/AssignCastCard';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'shortfilm', element: <ShortFilmPage /> },
        { path: 'shortfilm/castdetail', element: <CastDetailsPage /> },
        { path: 'shortfilm/edit', element: <ShortFilmForm /> },
        { path: 'shortfilm/assigncast', element: <AssignCastCard /> },
        { path: 'cast&crew', element: <CastPage /> },
        { path: 'castForm', element: <CastForm /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
