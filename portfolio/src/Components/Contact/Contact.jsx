import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to a server
  };

  return (
    <div className="mt-4 font-mono text-green-300 bg-black border border-green-500 rounded-lg p-6 shadow-lg shadow-green-500/20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-500 mb-2">
          contact.config
        </h2>
        <div className="border-b border-green-500 pb-2">
          <p className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-green-500" />
            <span className="text-green-400">EMAIL=</span>aclapp1@jh.edu
          </p>
          <p className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-green-500" />
            <span className="text-green-400">PHONE=</span>+1 (513) 212-8500
          </p>
          <p className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-green-500" />
            <span className="text-green-400">LOCATION=</span>Baltimore, MD
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-green-400 mb-1"
          >
            NAME=
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-green-500 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-green-300"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-green-400 mb-1"
          >
            EMAIL=
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-green-500 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-green-300"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-green-400 mb-1"
          >
            MESSAGE=
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-green-500 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-green-300"
            placeholder="Your message here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-black py-2 px-4 rounded-md hover:bg-green-500 transition duration-300 flex items-center justify-center"
        >
          <Send className="h-4 w-4 mr-2" />
          Execute contact.sh
        </button>
      </form>
    </div>
  );
};

export default Contact;
