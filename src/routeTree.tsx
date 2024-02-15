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
import { Suspense, lazy } from 'react'
import DashboardJobDetailPage from './pages/dashboard/dashboard-admin/jobs/[id]'
import DashboardProjectUpdatePage from './pages/dashboard/dashboard-admin/projects/update'
import DashboardProjectCreatePage from './pages/dashboard/dashboard-admin/projects/create'

const ExploreMorePage = lazy(() => import('./pages/explore-more'))
const ForBusinessPage = lazy(() => import('./pages/for-business'))

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
            element: (
              <Suspense fallback={null}>
                <ForBusinessPage />
              </Suspense>
            ),
          },
          {
            path: '/explore-more',
            element: (
              <Suspense fallback={null}>
                <ExploreMorePage />
              </Suspense>
            ),
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
                        path: 'update/:id',
                        element: <DashboardProjectUpdatePage />,
                      },
                      {
                        path: 'create',
                        element: <DashboardProjectCreatePage />,
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
