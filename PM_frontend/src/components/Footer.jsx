import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">
            This Predictive Maintenance WebApp leverages AI and contextual data to help industries
            monitor equipment health and prevent failures.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Predictor</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Reports</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Settings</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm mb-2">Email: <span className="text-blue-400">support@pmapp.com</span></p>
          <p className="text-sm mb-2">Phone: +91 9876543210</p>
          <p className="text-sm">Address: IIIT Dharwad, Hubli, India</p>
        </div>
      </div>

      <div className="mt-10 pb-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Predictive Maintenance WebApp — Built with 💙 using React & Tailwind CSS
      </div>
    </footer>
  );
};

export default Footer;
