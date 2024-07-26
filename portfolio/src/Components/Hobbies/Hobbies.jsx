import React from "react";
import { Music, Users, File } from "lucide-react";
import { FaSwimmer } from "react-icons/fa";

const HobbyItem = ({ icon: Icon, filename, title, description }) => (
  <div className="mb-4 font-mono">
    <div className="flex items-center">
      <File size={18} className="mr-2 text-green-500" />
      <span className="text-green-400 mr-2">{filename}</span>
      <Icon className="text-green-500 mr-2" size={18} />
    </div>
    <div className="ml-6 mt-2 text-green-300">
      <p className="mb-1">Title: {title}</p>
      <p className="whitespace-pre-wrap">Description: {description}</p>
    </div>
  </div>
);

const Hobbies = () => {
  const hobbies = [
    {
      icon: FaSwimmer,
      filename: "hobby_swimming.txt",
      title: "Swimming",
      description:
        "I am on the varsity swim team at Johns Hopkins specializing in short to mid-distance backstroke and butterfly events.",
    },
    {
      icon: Music,
      filename: "hobby_guitar.txt",
      title: "Playing Guitar",
      description:
        "Music is my passion, and I enjoy playing guitar in my free time. It's a creative outlet that balances my technical work.",
    },
    {
      icon: Users,
      filename: "hobby_friends.txt",
      title: "Hanging Out with Friends",
      description:
        "I value my social connections and enjoy spending time with friends, whether it's game nights, outdoor activities, or just casual hangouts.",
    },
  ];

  return (
    <div className="mt-4 font-mono text-green-300 bg-black border border-green-500 rounded-lg p-6">
      {hobbies.map((hobby, index) => (
        <HobbyItem key={index} {...hobby} />
      ))}
    </div>
  );
};

export default Hobbies;
