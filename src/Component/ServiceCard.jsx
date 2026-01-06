import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Warehouse, Banknote, PlaneTakeoff, Container, MoveRight } from "lucide-react";

const ServicesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const services = [
    {
      id: "01",
      title: "Warehouse Facility",
      icon: <Warehouse size={40} />,
      desc: "Temperate ocean-bass sea chub unicorn treefish eulachon tidewater goby.",
    },
    {
      id: "02",
      title: "Cost Effective Pricing",
      icon: <Banknote size={40} />,
      desc: "Temperate ocean-bass sea chub unicorn treefish eulachon tidewater goby.",
    },
    {
      id: "03",
      title: "Air Freight Facility",
      icon: <PlaneTakeoff size={40} />,
      desc: "Temperate ocean-bass sea chub unicorn treefish eulachon tidewater goby.",
    },
    {
      id: "04",
      title: "Container Delivery",
      icon: <Container size={40} />,
      desc: "Temperate ocean-bass sea chub unicorn treefish eulachon tidewater goby.",
      active: true, // Matching the screenshot's active state
    },
  ];

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div data-aos="fade-right">
            <h4 className="text-red-600 font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-red-600"></span> Special Solutions
            </h4>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic uppercase">
              Our Core <span className="text-red-600">Services</span>
            </h2>
          </div>
          <p data-aos="fade-left" className="text-gray-500 max-w-md border-l-2 border-gray-200 pl-6 leading-relaxed">
            We provide strategic logistics planning to optimize your supply chain and reduce costs effectively.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-gray-100">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className={`relative group p-10 border-r border-b border-gray-100 transition-all duration-500 cursor-pointer overflow-hidden ${
                service.active ? "bg-slate-900 text-white" : "hover:bg-slate-900 hover:text-white"
              }`}
            >
              {/* Animated Background Overlay */}
              <div className="absolute top-0 left-0 w-full h-0 bg-red-600 transition-all duration-500 group-hover:h-1 z-0"></div>
              
              <div className="relative z-10">
                {/* ID Number */}
                <span className={`absolute top-0 right-0 font-black text-2xl italic opacity-20 transition-colors ${
                  service.active ? "text-white" : "text-slate-400 group-hover:text-white"
                }`}>
                  {service.id}
                </span>

                {/* Icon */}
                <div className={`mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${
                  service.active ? "text-red-500" : "text-red-600 group-hover:text-red-500"
                }`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-black uppercase italic mb-4 tracking-tighter">
                  {service.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-8 transition-colors ${
                  service.active ? "text-gray-300" : "text-gray-500 group-hover:text-gray-300"
                }`}>
                  {service.desc}
                </p>

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  Read More <MoveRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;