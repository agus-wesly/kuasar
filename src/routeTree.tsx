import { createBrowserRouter } from 'react-router-dom'
import RootLayout, { ErrorBoundary } from './pages/root'
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
import Dashboard from './pages/dashboard/layout'
import DashboardIndexPage from './pages/dashboard'
import DashboardProjectsPage from './pages/dashboard/projects'
import DashboardProjectCreatePage from './pages/dashboard/projects/create'
import DashboardProjectUpdatePage from './pages/dashboard/projects/update'
import DashboardProjectDetailPage from './pages/dashboard/projects/detail'
import DashboardApplicationsPage from './pages/dashboard/applications'
import DashboardApplicationCreate from './pages/dashboard/applications/create'
import DashboardApplicationUpdatePage from './pages/dashboard/applications/update'
import DashboardApplicationDetailPage from './pages/dashboard/applications/detail'
import DashboardJobsPage from './pages/dashboard/jobs'
import DashboardJobCreatePage from './pages/dashboard/jobs/create'
import DashboardJobUpdatePage from './pages/dashboard/jobs/update'
import DashboardJobDetailPage from './pages/dashboard/jobs/detail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
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
                element: <Dashboard />,
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
                      {
                        index: true,
                        element: <DashboardApplicationsPage />,
                      },
                      {
                        path: 'create',
                        element: <DashboardApplicationCreate />,
                      },
                      {
                        path: ':id/update',
                        element: <DashboardApplicationUpdatePage />,
                      },
                      {
                        path: ':id',
                        element: <DashboardApplicationDetailPage />,
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
