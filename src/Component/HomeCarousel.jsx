import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      category: "Domestic & Transportation",
      title: "The latest delivery management industry tips trends & hot takes",
      image:
        "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=800", // Ship image
    },
    {
      id: 2,
      category: "Domestic & Transportation",
      title: "The latest delivery management industry tips trends & hot takes",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800", // Port image
    },
    {
      id: 3,
      category: "Domestic & Transportation",
      title: "Taking a new pragmatic approach to flight capacity limits",
      image:
        "https://images.unsplash.com/photo-1544015759-111811443be8?q=80&w=800", // Plane image
    },
    {
      id: 1,
      category: "Domestic & Transportation",
      title: "The latest delivery management industry tips trends & hot takes",
      image:
        "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=800", // Ship image
    },
    {
      id: 2,
      category: "Domestic & Transportation",
      title: "The latest delivery management industry tips trends & hot takes",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800", // Port image
    },
    {
      id: 3,
      category: "Domestic & Transportation",
      title: "Taking a new pragmatic approach to flight capacity limits",
      image:
        "https://images.unsplash.com/photo-1544015759-111811443be8?q=80&w=800", // Plane image
    },
  ];

  return (
    <section className="bg-white py-20 font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-red-600 text-xs font-bold uppercase tracking-widest mb-3 border-l-2 border-red-600 pl-3">
              Safe Transportation & Logistics
            </p>
            <h2 className="text-[#001524] text-4xl md:text-6xl font-black leading-none">
              Transport & Logistics <br />
              projects that we have
            </h2>
          </div>

          <button className="bg-[#001524] text-white px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors duration-300">
            View services
          </button>
        </div>

        {/* --- PROJECTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Floating Arrow Icon on Hover */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-600 p-3 text-white rounded-full shadow-xl">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  {project.category}
                </p>
                <h3 className="text-[#001524] text-lg font-bold leading-snug group-hover:text-red-600 transition-colors">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
