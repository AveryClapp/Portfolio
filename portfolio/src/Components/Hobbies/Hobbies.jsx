import React from "react";
import { Music, Users } from "lucide-react";
import { FaSwimmer } from "react-icons/fa";

const HobbyCard = ({ icon: Icon, title, description }) => (
  <div className="card">
    <div className="flex items-center mb-4">
      <Icon className="text-indigo-500 mr-3" size={24} />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Hobbies = () => {
  const hobbies = [
    {
      icon: FaSwimmer,
      title: "Swimming",
      description:
        "I am on the varsity swim team at Johns Hopkins specializing in short to mid-distance backstroke and butterfly events.",
    },
    {
      icon: Music,
      title: "Playing Guitar",
      description:
        "Music is my passion, and I enjoy playing guitar in my free time. It's a creative outlet that balances my technical work.",
    },
    {
      icon: Users,
      title: "Hanging Out with Friends",
      description:
        "I value my social connections and enjoy spending time with friends, whether it's game nights, outdoor activities, or just casual hangouts.",
    },
  ];

  return (
    <section id="hobbies" className="py-20">
      <h2 className="section-title">Hobbies & Interests</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {hobbies.map((hobby, index) => (
          <HobbyCard key={index} {...hobby} />
        ))}
      </div>
    </section>
  );
};

export default Hobbies;
