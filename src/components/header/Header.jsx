import React from "react";
import { Container, Logoutbtn } from "../index";
import Logo from "../logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

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
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="w-full py-4">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="mr-4">
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </div>
            <div>
              <ul className="flex space-x-4">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="inline-block px-6 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-full transition duration-200"
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && <Logoutbtn />}
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
