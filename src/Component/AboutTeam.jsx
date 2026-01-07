import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Leslie Alexander",
      role: "Lead Strategist",
      img: "https://i.pravatar.cc/600?img=11",
    },
    {
      name: "Mehedi Hasan",
      role: "Visionary Designer",
      img: "https://i.pravatar.cc/600?img=12",
    },
    {
      name: "Robiul Hasan",
      role: "Tech Architect",
      img: "https://i.pravatar.cc/600?img=13",
    },
    {
      name: "Riad Hasan",
      role: "Backend Expert",
      img: "https://i.pravatar.cc/600?img=14",
    },
    {
      name: "Arjun Singh",
      role: "Logistics Head",
      img: "https://i.pravatar.cc/600?img=15",
    },
  ];

  return (
    <section className="bg-white py-32 px-6 relative overflow-hidden">
      {/* Cinematic Background Text */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
        <h1 className="text-[25vw] font-black uppercase italic leading-none">
          Localmate
        </h1>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* --- Header --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-10">
          <div className="max-w-3xl">
            {/* Subtle Top Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-[2px] bg-red-600"></div>
              <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px] italic">
                Our Elite Force
              </span>
            </motion.div>

            {/* Balanced Headline */}
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight uppercase italic">
              Behind the scenes <br />
              <span className="text-red-600">Driving Excellence</span>
            </h2>
          </div>

          {/* Right Side: Description & Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-start lg:items-end space-y-6"
          >
            <p className="text-slate-500 text-sm font-medium max-w-[320px] lg:text-right leading-relaxed">
              Industry experts ki aisi team jo global logistics ko naye tareeke
              se define kar rahi hai.
            </p>

            <button className="group relative flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-black uppercase italic tracking-widest text-[11px] hover:bg-red-600 transition-all duration-300 shadow-xl overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Meet the squad
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </span>
            </button>
          </motion.div>
        </div>

        {/* --- Team Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "circOut" }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-[2rem] bg-slate-50 aspect-[3/4] transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
                {/* Overlay on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-10" />

                {/* The Photo */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />

                {/* Floating Action Icon */}
                <div className="absolute top-6 right-6 z-20 overflow-hidden">
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300"
                  >
                    <Plus size={24} strokeWidth={3} />
                  </motion.div>
                </div>

                {/* Info Inside Card (Hover Only) */}
                <div className="absolute bottom-10 left-8 z-20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-red-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-2 italic">
                    Official Profile
                  </p>
                  <div className="h-1 w-10 bg-white mb-4"></div>
                </div>
              </div>

              {/* Text Label (Below Card - Normal Font Style) */}
              <div className="mt-8 px-4 transition-transform duration-500 group-hover:translate-x-2">
                <h4 className="text-2xl font-black italic uppercase text-slate-900 leading-tight tracking-tight">
                  {member.name.split(" ")[0]} <br />
                  <span className="text-red-600">
                    {member.name.split(" ")[1]}
                  </span>
                </h4>
                <div className="flex items-center gap-3 mt-3">
                  <span className="w-4 h-[1px] bg-slate-300"></span>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side Decorative Badge */}
      <div className="absolute -right-20 top-1/2 -rotate-90 origin-center hidden xl:block">
        <span className="text-[10rem] font-black text-slate-50 uppercase tracking-tighter">
          Experts.
        </span>
      </div>
    </section>
  );
};

export default TeamSection;
