import React from "react";
import { Heart } from "lucide-react";

const Hobbies = () => {
  const hobbies = [
    "Exploring nature trails and hiking",
    "Reading science fiction novels",
    "Experimenting with new cooking recipes",
    "Playing strategy board games with friends",
  ];

  return (
    <section id="hobbies" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Hobbies
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <p className="text-lg text-gray-600 mb-4">
            When I'm not coding, you can find me:
          </p>
          <ul className="space-y-2">
            {hobbies.map((hobby, index) => (
              <li key={index} className="flex items-center">
                <Heart className="flex-shrink-0 mr-3 h-5 w-5 text-indigo-500" />
                <span className="text-sm text-gray-600">{hobby}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
