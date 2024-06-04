import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiYoutube } from "react-icons/si";

import { FaSquareXTwitter } from "react-icons/fa6";
import { Container } from "../index";
import Logo from "../logo/Logo";
const footerLinks = [
  {
    header: "Blog",
    links: [
      { id: 1, link: "/", name: "Home" },
      { id: 2, link: "/all-posts", name: "All Post" },
      { id: 3, link: "/add-post", name: "Add Post" },
    ],
  },
  {
    header: "Auth",
    links: [
      { id: 4, link: "/login", name: "Login" },
      { id: 5, link: "/signup", name: "Sign Up" },
    ],
  },
  {
    header: "Resources",
    links: [
      { id: 7, link: "/", name: "Support" },
      { id: 8, link: "/", name: "FAQs" },
      { id: 9, link: "/", name: "Guides" },
    ],
  },
];

const Footer = () => {
  return (
    <div className="border-mywhite mt-3 space-y-8 border-t py-5 mx-auto ">
      <Container className="bg-myprimary ">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-mywhite">
              <a href="/" className="link-underline link-underline-black">
                <Logo className="h-[65px] " />
              </a>
            </div>
            <p className="mt-1 max-w-xs text-mywhite">
              Inspiration Corner: Stories of Success and Resilience.
            </p>
            <ul className="mt-6 flex gap-6">
              <a
                href="https://www.linkedin.com/in/ahmad-tahir-developer/"
                className="icon facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://x.com/ahmadtahir1399"
                className="icon twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="https://www.instagram.com/xyz_ahmadd/"
                className="icon instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>{" "}
              <a
                href="https://www.youtube.com/channel/UCR5cz9UQnH-foYTpnxOdR3g/videos"
                className="icon youtube hover:text-red-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiYoutube />
              </a>
            </ul>
          </div>
          <div className="col-span-2 flex flex-wrap justify-start gap-10 md:justify-between lg:mr-10 md:mr-10 mr-0">
            {footerLinks.map((group) => (
              <div key={group.header}>
                <p className="mb-6 font-medium text-white">{group.header}</p>
                <ul className="mt-6 space-y-4 text-[15px]">
                  {group.links.map(({ id, link, name }) => (
                    <li
                      key={id}
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      <a href={link}>{name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500">
          &copy; Binary Nexus {new Date().getFullYear()}. All rights reserved.
        </p>
      </Container>
    </div>
  );
};

export default Footer;
