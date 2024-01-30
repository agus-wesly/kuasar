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

const ExploreMorePage = lazy(() => import('./pages/explore-more'))
const ForBusinessPage = lazy(() => import('./pages/for-business'))

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/protected',
            element: <ProtectedPage />,
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

function ProtectedPage() {
  return <div>Protectd page</div>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
