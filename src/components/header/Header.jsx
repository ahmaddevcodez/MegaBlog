import React, { useEffect, useState } from "react";
import { Container, Logoutbtn } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <Disclosure
      as="nav"
      className={`bg-gray-800 sticky top-0 z-50 transition backdrop-filter ${
        isScrolled ? "backdrop-blur-md bg-opacity-50" : "bg-opacity-100"
      }`}
    >
      {({ open }) => (
        <>
          <Container>
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <Link
                to={"/"}
                className="flex flex-shrink-0 items-center lg:ml-0 md:ml-0 ml-[30px]"
              >
                <img
                  className="h-[65px] inline"
                  src="../../../assets/images/tab-images/logo-2.png"
                  alt="Your Company"
                />
              </Link>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <ul className="flex space-x-4">
                      {navItems.map((item) =>
                        item.active ? (
                          <li key={item.name}>
                            <button
                              onClick={() => navigate(item.slug)}
                              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium w-max"
                            >
                              {item.name}
                            </button>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div>{authStatus && <Logoutbtn className="pl-2 pr-2" />}</div>
              </div>
            </div>
          </Container>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <ul className="pb-1 space-y-2">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="block px-3 rounded-md text-xl font-normal hover:text-white text-white"
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
