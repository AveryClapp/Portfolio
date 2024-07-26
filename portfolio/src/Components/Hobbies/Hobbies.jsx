import React from "react";
import { Music, Users } from "lucide-react";
import { FaSwimmer } from "react-icons/fa";

const HobbyCard = ({ icon: Icon, title, description }) => (
  <div className="bg-black border border-green-500 p-4 rounded-md">
    <div className="flex items-center mb-4">
      <Icon className="text-green-500 mr-3" size={24} />
      <h3 className="text-xl font-semibold text-green-400 font-mono">
        {title}
      </h3>
    </div>
    <p className="text-green-300 font-mono">{description}</p>
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
    <section id="hobbies" className="font-mono">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-500">
          Hobbies & Interests
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {hobbies.map((hobby, index) => (
          <HobbyCard key={index} {...hobby} />
        ))}
      </div>
    </section>
  );
};

export default Hobbies;
