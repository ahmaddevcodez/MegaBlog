import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import PropTypes from "prop-types";
import Logo from "../logo/Logo";
const footerLinks = [
  {
    header: "Discover",
    links: [
      { id: 1, link: "/", name: "Home" },
      { id: 2, link: "/blog", name: "Blog" },
      { id: 3, link: "/categories", name: "Categories" },
    ],
  },
  {
    header: "About",
    links: [
      { id: 4, link: "/about-us", name: "Our Story" },
      { id: 5, link: "/team", name: "Meet the Team" },
      { id: 6, link: "/contact", name: "Get in Touch" },
    ],
  },
  {
    header: "Resources",
    links: [
      { id: 7, link: "/contact", name: "Support" },
      { id: 8, link: "/faq", name: "FAQs" },
      { id: 9, link: "/guides", name: "Guides" },
    ],
  },
  {
    header: "Connect with Us",
    links: [
      {
        id: 10,
        link: "https://play.google.com/store/apps/details?id=com.connect.bashbop&hl=en&gl=US",
        name: "Google Play",
      },
      {
        id: 11,
        link: "https://apps.apple.com/gb/app/bashbop/id1618069055",
        name: "App Store",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="border-footerupperdivider mx-auto mt-3 space-y-8 border-t py-5">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-teal-600">
              <a href="/" className="link-underline link-underline-black">
                <Logo width />
              </a>
            </div>
            <p className="mt-4 max-w-xs text-gray-500">
              Streamlining event experiences for a seamless journey. Your
              trusted event partner.
            </p>
            <ul className="mt-6 flex gap-6">
              <a
                href="https://www.facebook.com"
                className="icon facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.twitter.com"
                className="icon twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="https://www.instagram.com/bashbop/"
                className="icon instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </ul>
          </div>
          <div className="col-span-2 flex flex-wrap justify-start gap-10 md:justify-between">
            {footerLinks.map((group) => (
              <div key={group.header}>
                <p className="mb-6 font-medium text-gray-900">{group.header}</p>
                <ul className="mt-6 space-y-4 text-[15px]">
                  {group.links.map(({ id, link, name }) => (
                    <li
                      key={id}
                      className="text-gray-700 transition hover:opacity-75"
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
          &copy; BASHBOP {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      targetSegment: PropTypes.string,
    })
  ),
};

export default Footer;
