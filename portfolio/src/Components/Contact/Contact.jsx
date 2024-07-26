import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

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
    <section id="contact" className="font-mono">
      <div className="mb-8">
        <p className="text-green-500 text-sm mb-2">$ ./contact.sh</p>
        <h2 className="text-3xl font-bold text-green-500">Get in Touch</h2>
      </div>
      <div className="max-w-4xl mx-auto bg-black border border-green-500 rounded-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              <p className="flex items-center text-green-300">
                <Mail className="h-5 w-5 mr-2 text-green-500" />
                aclapp1@jh.edu
              </p>
              <p className="flex items-center text-green-300">
                <Phone className="h-5 w-5 mr-2 text-green-500" />
                +1 (513) 212-8500
              </p>
              <p className="flex items-center text-green-300">
                <MapPin className="h-5 w-5 mr-2 text-green-500" />
                Baltimore, MD
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-green-300 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-black border border-green-500 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-green-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-green-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-black border border-green-500 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-green-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-green-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-black border border-green-500 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-green-300"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-black py-2 px-4 rounded-md hover:bg-green-500 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
