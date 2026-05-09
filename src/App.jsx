import { useEffect, useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar.jsx';
import DevFooter from './components/DevFooter.jsx';
import SplashScreen from './components/SplashScreen.jsx';

import HomePage from './pages/HomePage.jsx';
import AddBhandaraPage from './pages/AddBhandaraPage.jsx';
import MapPage from './pages/MapPage.jsx';
import BhandaraDetailPage from './pages/BhandaraDetailPage.jsx';
import EditBhandaraPage from './pages/EditBhandaraPage.jsx';

export default function App() {

  // ─────────────────────────────────────────
  // Splash screen
  // ─────────────────────────────────────────

  const [showSplash, setShowSplash] =
    useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSplash(false);

    }, 1800);

    return () =>
      clearTimeout(timer);

  }, []);

  return (
    <>
      {/* Splash */}
      {showSplash && (
        <SplashScreen />
      )}

      {/* Toasts */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,

          style: {
            borderRadius: '18px',
            padding: '14px 16px',
            fontSize: '14px',
            background: '#fff',
            color: '#222',
            boxShadow:
              '0 10px 30px rgba(0,0,0,0.08)',
          },

          success: {
            iconTheme: {
              primary: '#ff7d0f',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <main className="relative min-h-screen overflow-hidden bg-pattern">

        {/* Animated background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">

          {/* Blob 1 */}
          <div className="absolute top-[-120px] left-[-80px] w-[340px] h-[340px] bg-orange-300/20 dark:bg-orange-900/10 rounded-full blur-3xl animate-pulse" />

          {/* Blob 2 */}
          <div
            className="absolute bottom-[-140px] right-[-80px] w-[360px] h-[360px] bg-yellow-300/20 dark:bg-yellow-900/10 rounded-full blur-3xl animate-pulse"
            style={{
              animationDelay: '1.5s',
            }}
          />

          {/* Blob 3 */}
          <div
            className="absolute top-[40%] left-[45%] w-[240px] h-[240px] bg-orange-200/10 dark:bg-orange-800/10 rounded-full blur-3xl animate-pulse"
            style={{
              animationDelay: '0.7s',
            }}
          />

        </div>

        {/* Content */}
        <div className="relative z-10">

          <Routes>

            {/* Home */}
            <Route
              path="/"
              element={<HomePage />}
            />

            {/* Add */}
            <Route
              path="/add"
              element={
                <AddBhandaraPage />
              }
            />

            {/* Map */}
            <Route
              path="/map"
              element={<MapPage />}
            />

            {/* Details */}
            <Route
              path="/bhandara/:id"
              element={
                <BhandaraDetailPage />
              }
            />

            {/* Edit */}
            <Route
              path="/edit/:id"
              element={
                <EditBhandaraPage />
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center py-32 px-4 text-center">

                  <div className="text-8xl mb-6 animate-bounce">
                    🍛
                  </div>

                  <h1 className="font-display font-extrabold text-4xl text-gray-800 dark:text-gray-100 mb-4">

                    Page Not Found

                  </h1>

                  <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">

                    The page you are looking
                    for does not exist or
                    has been moved.

                  </p>

                  <a
                    href="/"
                    className="btn-primary"
                  >

                    Go Back Home

                  </a>

                </div>
              }
            />

          </Routes>

          {/* Footer */}
          <DevFooter />

        </div>

      </main>
    </>
  );
}