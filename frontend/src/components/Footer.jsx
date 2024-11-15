import { Copyright, Facebook, FacebookIcon, Linkedin, LucideFacebook, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between px-12 py-5 bg-white border border-gray-200">
        <div>
          <h1 className="font-medium text-lg">Job <span className="text-[#F83002]">Portal</span> </h1>
          <p className="text-sm text-gray-600"><span ><Copyright className="inline h-4" /></span>  2024 Job Hunt . All right reserved</p>
        </div>
        <div className="flex gap-8">
         <a href=""><i class="fa-brands fa-square-facebook"></i></a>
         <a href=""><i class="fa-brands fa-twitter"></i></a>   
         <a href=""><i class="fa-brands fa-linkedin"></i></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
