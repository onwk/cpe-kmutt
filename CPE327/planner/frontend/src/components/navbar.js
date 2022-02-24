import React, { useState, useContext } from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import "./base.css";
import { AuthContext } from '../context/auth'

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  // console.log("URL" + user.img);

  const menuBar = !user ? (
    <div>
      <nav className="bg-white ">
        <div className="max-w-full mx-auto shadow-sm pdbase">
          <div className="flex items-center justify-between h-full my-0.5">
            <div className="w-full justify-between flex items-center">
              <div className="flex-shrink-0">
                <a href="/">
                  <img
                    className="h-10/12 w-10/12"
                    src="img/logo.png"
                    alt="Home"
                  />
                </a>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4 font-base font-bold">
                  <a
                    href="/regis"
                    className="text-base hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base "
                  >
                    Sign Up
                  </a>

                  <a
                    href="/login"
                    className="text-base hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base "
                  >
                    Log In
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-base hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div
                ref={ref}
                className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-bold"
              >
                <a
                  href="/regis"
                  className="text-base hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base"
                >
                  Sign Up
                </a>

                <a
                  href="/login"
                  className="text-base hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base"
                >
                  Log In
                </a>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  ) : (
    <div>
      <nav className="bg-white ">
        <div className="max-w-full mx-auto shadow-sm pdbase">
          <div className="flex items-center justify-between h-full my-0.5">
            <div className="w-full justify-between flex items-center">
              <div className="flex-shrink-0">
                <a href="/">
                  <img
                    className="h-10/12 w-10/12"
                    src="img/logo.png"
                    alt="Home"
                  />
                </a>
              </div>
              <div className="hidden md:block z-10">
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="object-cover h-11 w-11 rounded-full "
                        src="https://i.pinimg.com/736x/d9/76/50/d9765063d67573ad5877bffe56a1e68f.jpg" alt=""
                      />
                    </Menu.Button >
                  </div >
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/manage_account"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Manage Account
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={logout}
                          >
                            Log out
                          </p>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu >
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );

  
  return menuBar;
}

export default Navbar;
