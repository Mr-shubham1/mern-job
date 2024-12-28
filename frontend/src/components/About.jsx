import React from "react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">
            About Us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Welcome to <span className="text-purple-800 font-semibold">jobJunction</span>
                <span className="font-semibold text-[#F83002]">.com </span>! We are committed to
                connecting talented individuals with the best opportunities in
                their fields. Whether you're a student looking for internships
                or a recruiter seeking the perfect candidate, we've got you
                covered.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mt-4">
                Our mission is to create an ecosystem where talent meets
                opportunity seamlessly. We believe in empowering individuals and
                organizations through innovative tools and personalized
                experiences.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <img
                src="/myProfilephoto.jpg"
                alt="About Us"
                className="rounded-lg shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out h-[400px] w-auto object-cover  border-4 border-gray-200"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="bg-purple-800 text-white py-2 px-6 rounded-md shadow hover:bg-purple-700">
              Learn More
            </button>
            <button className="bg-white border border-purple-800 text-purple-800 py-2 px-6 rounded-md shadow hover:bg-purple-100">
              <Link to={"/contact"}>Contact Us</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
