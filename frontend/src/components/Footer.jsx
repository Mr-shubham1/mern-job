import React from "react";
import { Copyright, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#51259b] text-gray-300 mt-8">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h1 className="text-2xl font-bold text-white">
            jobJunction <span className="text-[#F83002]">.com</span>
          </h1>
          <p className="mt-4 text-sm text-white">
            Your ultimate platform for connecting job seekers and recruiters.
            Discover your dream job or find the best talent effortlessly.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link className="hover:text-white" to={"/about"}>About Us</Link>
            </li>
            <li>
            <Link className="hover:text-white" to={"/browse"}>Browse Jobs</Link>
            </li>
            <li>
            <Link className="hover:text-white" to={"/contact"}>Contact Us</Link>
            </li>
            <li>
            <Link className="hover:text-white" to={"/"}>Privacy policy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Contact Us</h2>
          <ul className="mt-4 space-y-2">
            <li>
              Email:
              <a href="mailto:support.jobJunction@gmail.com" className="hover:text-[#F83002]">
                support.jobJunction@gmail.com
              </a>
            </li>
            <li>
              Phone:
              <a href="tel:+9336812575" className="hover:text-[#F83002]">
                +9336812575
              </a>
            </li>
            <li>Address: Bewada , Torawan , Dhanapur , chandauli , Varanasi U.P. , INDIA </li>
          </ul>
        </div>
      </div>

      
      <div className="border-t border-white py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-white">
            <span>
              <Copyright className="inline h-4 w-4" />
            </span>
            2024 jobJunction.com All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-white hover:text-[#F83002]">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-[#F83002]">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-[#F83002]">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
