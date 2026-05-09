import { NavLink } from 'react-router-dom';

import {
  Home,
  Map,
  Plus,
} from 'lucide-react';

const navItems = [
  {
    to: '/',
    label: 'Home',
    icon: Home,
  },

  {
    to: '/map',
    label: 'Map',
    icon: Map,
  },

  {
    to: '/add',
    label: 'Add',
    icon: Plus,
  },
];

export default function Navbar() {
  return (
    <>
      {/* Top Branding */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-orange-100 dark:border-gray-800">

        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-3"
          >

            <div className="relative">

              <div className="w-11 h-11 rounded-3xl bg-gradient-to-br from-saffron-500 to-turmeric-500 flex items-center justify-center shadow-lg shadow-orange-300/30">

                <span className="text-white text-xl">
                  🍛
                </span>

              </div>

              <div className="absolute inset-0 rounded-3xl bg-orange-300/30 blur-xl" />

            </div>

            <div>

              <h1 className="font-display font-extrabold text-xl text-gray-800 dark:text-gray-100 leading-none">
                Bhandara
              </h1>

              <p className="text-[11px] text-gray-400 leading-none mt-1">
                Community Food Locator
              </p>

            </div>

          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-saffron-500 text-white shadow-lg shadow-orange-300/30'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-gray-800'
                    }`
                  }
                >

                  <Icon size={18} />

                  {item.label}

                </NavLink>
              );
            })}

          </nav>

        </div>

      </header>

      {/* Mobile floating navbar */}
      <div className="md:hidden fixed bottom-4 inset-x-0 z-50 px-4">

        <div className="max-w-sm mx-auto">

          <nav className="relative flex items-center justify-around backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 border border-orange-100 dark:border-gray-700 rounded-3xl px-2 py-2 shadow-2xl shadow-black/10">

            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-100/40 to-yellow-100/40 dark:from-orange-900/10 dark:to-yellow-900/10 pointer-events-none" />

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `relative flex flex-col items-center justify-center gap-1 px-5 py-2 rounded-2xl transition-all ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`
                  }
                >

                  {({ isActive }) => (
                    <>
                      {/* Active bg */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-saffron-500 to-turmeric-500 shadow-lg shadow-orange-300/30" />
                      )}

                      {/* Icon */}
                      <div className="relative z-10">

                        <Icon size={20} />

                      </div>

                      {/* Label */}
                      <span className="relative z-10 text-[11px] font-semibold">
                        {item.label}
                      </span>
                    </>
                  )}

                </NavLink>
              );
            })}

          </nav>

        </div>

      </div>
    </>
  );
}