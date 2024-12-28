import React from 'react';

const Contact = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8 bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Contact Us</h2>
        <p className="text-sm sm:text-lg mb-4">Feel free to reach out to us via email.</p>
        <a
          href="mailto:support.jobJunction@gmail.com"
          className="text-indigo-600 hover:text-indigo-800 text-lg sm:text-xl font-semibold"
        >
          support.jobJunction@gmail.com
        </a>
        <p className="text-xs sm:text-sm mt-4 text-gray-500">Click the email address to send a message.</p>
      </div>
    </div>
  );
};

export default Contact;
