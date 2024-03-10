import { createBrowserRouter } from 'react-router-dom'
import RootLayout, { ErrorBoundary } from './pages/root'
import HomePage from './pages/home'
import RequireUnAuth from './layouts/require-unauth'
import RequireAuth from './layouts/require-auth'
import NotFoundPage from './pages/not-found'
import LandingPageLayout from './layouts/landing-page-layout'
import DashboardIndexPage from './pages/dashboard'
import ApplicationLayout from './pages/dashboard/applications/layout'

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
                lazy: () => import('./pages/login'),
              },
              {
                path: '/register',
                lazy: () => import('./pages/register'),
              },
              {
                path: '/verify-account',
                lazy: () => import('./pages/verify-account'),
              },
            ],
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/dashboard',
            lazy: () => import('./pages/dashboard/layout'),
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
                    lazy: () => import('./pages/dashboard/projects'),
                  },
                  {
                    path: 'create',
                    lazy: () => import('./pages/dashboard/projects/create'),
                  },
                  {
                    path: ':id/update',
                    lazy: () => import('./pages/dashboard/projects/update'),
                  },
                  {
                    path: ':id',
                    lazy: () => import('./pages/dashboard/projects/detail'),
                  },
                ],
              },
              {
                path: 'applications',
                element: <ApplicationLayout />,
                children: [
                  {
                    index: true,
                    lazy: () => import('./pages/dashboard/applications'),
                  },
                  {
                    path: 'create',
                    lazy: () => import('./pages/dashboard/applications/create'),
                  },
                  {
                    path: ':id/update',
                    lazy: () => import('./pages/dashboard/applications/update'),
                  },
                  {
                    path: ':id',
                    lazy: () => import('./pages/dashboard/applications/detail'),
                  },
                ],
              },
              {
                path: 'jobs',
                children: [
                  {
                    index: true,
                    lazy: () => import('./pages/dashboard/jobs'),
                  },
                  {
                    path: 'create',
                    lazy: () => import('./pages/dashboard/jobs/create'),
                  },
                  {
                    path: 'update/:id',
                    lazy: () => import('./pages/dashboard/jobs/update'),
                  },
                  {
                    path: ':id',
                    lazy: () => import('./pages/dashboard/jobs/detail'),
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
