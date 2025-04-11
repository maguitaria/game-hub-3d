import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import logo from '../assets/FH_Joanneum_Logo.png';
import brand_logo from '../assets/game_hub_logo.png'
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Relax', href: '/meditation-scene' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Explore game', href: '/explore-game' },
  { name: 'Ghost adventure', href: '/ghost-adventure' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <img className="h-10 w-auto" src={logo} alt="Logo" />
                <img className="h-10 w-auto" src={brand_logo} alt="Logo" />
                <h1 className="text-white text-2xl font-bold ml-3">🎮 Game Hub</h1>
      
              </div>

              <div className="hidden md:flex md:items-center md:space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center md:hidden">
                <DisclosureButton className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block  rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
