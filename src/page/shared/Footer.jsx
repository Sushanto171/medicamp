import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-primary text-white p-8">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
          <img src={logo} alt="MediCamp Logo" className="w-36" />
          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 opacity-80">
            <li>
              <Link
                to="/career"
                className="font-normal text-white hover:text-accent focus:text-accent"
              >
                Career
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="font-normal text-white hover:text-accent focus:text-accent"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="font-normal text-white hover:text-accent focus:text-accent"
              >
                Services
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-8 border-blue-gray-50" />

        {/* Social Media and Email */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-accent"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-accent"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-accent"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-accent"
            >
              <FaInstagram />
            </a>
          </div>

          {/* Email Subscription */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 w-64 rounded-lg text-primary focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Bottom Text */}
        <p className="text-center mt-8 opacity-70 font-normal">
          Copyright &copy; {new Date().getFullYear()} - All rights reserved by
          MediCamp
        </p>
      </div>
    </footer>
  );
};

export default Footer;
