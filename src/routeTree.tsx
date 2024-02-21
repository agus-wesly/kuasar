import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import HomePage from './pages/home'
import RequireUnAuth from './layouts/require-unauth'
import RequireAuth from './layouts/require-auth'
import VerifyAccount, {
  loader as VerifyAccountLoader,
} from './pages/verify-account'
import NotFoundPage from './pages/not-found'
import DashboardPageLayout from './layouts/dashboard-layout'
import LandingPageLayout from './layouts/landing-page-layout'

import DashboardPage, {
  DashboardApplicationsPage,
  DashboardIndexPage,
  DashboardJobsPage,
  DashboardProjectsPage,
} from './pages/dashboard'
import DashboardAdminApplicationCreate from './pages/dashboard/dashboard-admin/applications/create'
import DashboardJobCreatePage from './pages/dashboard/dashboard-admin/jobs/create'
import DashboardJobUpdatePage from './pages/dashboard/dashboard-admin/jobs/update'

import RootLayout from './pages/root'
import { createBrowserRouter } from 'react-router-dom'
import DashboardJobDetailPage from './pages/dashboard/dashboard-admin/jobs/[id]'
import DashboardProjectUpdatePage from './pages/dashboard/dashboard-admin/projects/update'
import DashboardProjectCreatePage from './pages/dashboard/dashboard-admin/projects/create'
import DashboardProjectDetailPage from './pages/dashboard/dashboard-admin/projects/detail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <LandingPageLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: '/for-business',
            lazy: () => import('./pages/for-business'),
          },
          {
            path: '/explore-more',
            lazy: () => import('./pages/explore-more'),
          },
          {
            element: <RequireUnAuth />,
            children: [
              {
                path: '/login',
                element: <LoginPage />,
              },
              {
                path: '/register',
                element: <RegisterPage />,
              },
              {
                path: '/verify-account',
                element: <VerifyAccount />,
                loader: VerifyAccountLoader,
              },
            ],
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <DashboardPageLayout />,
            children: [
              {
                path: '/dashboard',
                element: <DashboardPage />,
                children: [
                  {
                    index: true,
                    element: <DashboardIndexPage />,
                  },
                  {
                    path: 'projects',
                    children: [
                      {
                        index: true,
                        element: <DashboardProjectsPage />,
                      },
                      {
                        path: 'create',
                        element: <DashboardProjectCreatePage />,
                      },
                      {
                        path: ':id/update',
                        element: <DashboardProjectUpdatePage />,
                      },
                      {
                        path: ':id',
                        element: <DashboardProjectDetailPage />,
                      },
                    ],
                  },
                  {
                    path: 'applications',
                    children: [
                      { index: true, element: <DashboardApplicationsPage /> },
                      {
                        path: 'create',
                        element: <DashboardAdminApplicationCreate />,
                      },
                    ],
                  },
                  {
                    path: 'jobs',
                    children: [
                      {
                        index: true,
                        element: <DashboardJobsPage />,
                      },
                      {
                        path: 'create',
                        element: <DashboardJobCreatePage />,
                      },
                      {
                        path: 'update/:id',
                        element: <DashboardJobUpdatePage />,
                      },
                      {
                        path: ':id',
                        element: <DashboardJobDetailPage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
