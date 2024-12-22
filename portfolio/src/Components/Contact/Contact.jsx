import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Integrate EmailJS or another service
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white border border-neutral-200 rounded-md shadow-sm">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Contact</h2>

      {/* Contact Info */}
      <div className="mb-6 space-y-2 text-sm text-neutral-700">
        <p className="flex items-center gap-2">
          <Mail size={16} className="text-neutral-500" />
          <span className="font-medium">Email:</span> aclapp1@jh.edu
        </p>
        <p className="flex items-center gap-2">
          <Phone size={16} className="text-neutral-500" />
          <span className="font-medium">Phone:</span> +1 (513) 212-8500
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={16} className="text-neutral-500" />
          <span className="font-medium">Location:</span> Baltimore, MD
        </p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-800 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full rounded-md border border-neutral-200 px-3 py-2 
                       text-neutral-900 focus:outline-none focus:ring-1 
                       focus:ring-neutral-300 focus:border-neutral-300"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-800 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full rounded-md border border-neutral-200 px-3 py-2 
                       text-neutral-900 focus:outline-none focus:ring-1 
                       focus:ring-neutral-300 focus:border-neutral-300"
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-neutral-800 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message here..."
            className="w-full rounded-md border border-neutral-200 px-3 py-2 
                       text-neutral-900 focus:outline-none focus:ring-1 
                       focus:ring-neutral-300 focus:border-neutral-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="inline-flex items-center justify-center w-full 
                     bg-neutral-900 text-white font-medium py-2 px-4 rounded-md 
                     hover:bg-neutral-800 transition-colors duration-200"
        >
          <Send size={16} className="mr-2" />
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
