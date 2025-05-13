import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-6 mt-auto">
      <p>
        &copy; {new Date().getFullYear()} ConnectVerse. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
