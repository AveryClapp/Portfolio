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
        "Swimming has been one of the biggest parts of my life for over 4 years now, I train daily during the school year as a part of the varsity team at Johns Hopkins. I specialize in Butterfly and Backstroke races.",
    },
    {
      icon: Music,
      filename: "hobby_guitar.txt",
      title: "Playing Guitar",
      description:
        "After a rough relationship with band for most of my life, I picked up the guitar over a year ago and have really enjoyed learning how to play.",
    },
    {
      icon: Users,
      filename: "hobby_friends.txt",
      title: "Hanging Out with Friends",
      description:
        "I really enjoy spending time with friends as a way to destress and have a good time.",
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
