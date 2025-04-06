import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#010B1D] text-white py-20 px-4">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">ABOUT US</h3>
          <p className="text-sm text-gray-400">
            Heaven fruitful doesn&apos;t cover lesser days appear creeping seasons so
            behold.
          </p>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONTACT INFO</h3>
          <p className="text-sm text-gray-400 pb-1">Address: Delhi , India</p>
          <p className="text-sm text-gray-400 pb-1">
            Email: ua1226925@gmail.com
          </p>
        </div>

        {/* Important Link Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">IMPORTANT LINK</h3>
          <p className="text-sm text-gray-400 pb-1">Contact Us</p>
          <p className="text-sm text-gray-400 pb-1">Testimonial</p>
          <p className="text-sm text-gray-400 pb-1">Properties</p>
          <p className="text-sm text-gray-400 pb-1">Support</p>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">NEWSLETTER</h3>
          <p className="text-sm text-gray-400 pb-1">
            Heaven fruitful doesn’t cover lesser in days. Appear creeping.
          </p>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 rounded-l-md text-black focus:outline-none"
            />{" "}
          </div>
        </div>
      </div>

      {/* Bottom Footer Content */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col justify-between items-center border-t border-gray-700 pt-4">
        {/* Logo and Stats */}
        <div className="flex items-center mb-10">
          <div className="mr-4">
            {/* <Image
              src="/logo.png" // Replace with your logo path
              alt="JobFinder Logo"
              className="w-10 h-10"
            /> */}
          </div>
          <div className="flex justify-between items-center gap-4 px-4 py-2">
            <p className="text-base">5000+ Talented Hunter</p>
            <p className="text-base">451+ Talented Hunter</p>
            <p className="text-base">5668+ Talented Hunter</p>
          </div>
        </div>

        {/* Copyright and Social Media */}
        <div className="flex  items-center">
          <p className="text-sm text-gray-400 mb-2 md:mb-0">
            Copyright ©2025 All rights reserved | This template is made with{" "}
            <span className="text-blue-600">♥</span> by 0xDevUsman
          </p>
          <div className="flex space-x-4 ml-0 md:ml-4">
            <a href="#" className="text-gray-400 hover:text-blue-600">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.324V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.26.793-.577v-2.234c-3.338.724-4.042-1.611-4.042-1.611-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.808 1.305 3.495.998.108-.776.418-1.305.762-1.604-2.665-.303-5.466-1.332-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
