import './index.css'

import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/root'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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

const ExploreMorePage = lazy(() => import('./pages/explore-more'))
const ForBusinessPage = lazy(() => import('./pages/for-business'))

const queryClient = new QueryClient()

const router = createBrowserRouter([
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
                    element: <DashboardProjectsPage />,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
