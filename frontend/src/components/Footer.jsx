import React from "react";
import { Copyright, Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-[#51259b] text-gray-300 mt-8">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding Section */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            jobJunction <span className="text-[#F83002]">.com</span>
          </h1>
          <p className="mt-4 text-sm text-white">
            Your ultimate platform for connecting job seekers and recruiters.
            Discover your dream job or find the best talent effortlessly.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-lg font-semibold text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/jobs" className="hover:text-white">
                Browse Jobs
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-semibold text-white">Contact Us</h2>
          <ul className="mt-4 space-y-2">
            <li>
              Email:{" "}
              <a href="mailto:support@jobportal.com" className="hover:text-[#F83002]">
                support@jobportal.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+1234567890" className="hover:text-[#F83002]">
                +123-456-7890
              </a>
            </li>
            <li>Address: 123 Job Street, Tech City, TC 98765</li>
          </ul>
        </div>
      </div>

      {/* Social Media & Copyright Section */}
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
